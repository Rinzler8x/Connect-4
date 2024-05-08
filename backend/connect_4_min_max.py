from fastapi import FastAPI # type: ignore
from pydantic import BaseModel # type: ignore
import numpy as np # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import random
import math

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

ROW_COUNT = 6
COLUMN_COUNT = 7
PLAYER = 0
AI = 1
PLAYER_PIECE = 1
AI_PIECE = 2
WINDOW_LENGTH = 4
EMPTY = 0

def create_board():
	board = np.zeros((ROW_COUNT,COLUMN_COUNT))
	return board

def drop_piece(board, row, col, piece):
	board[row][col] = piece

def is_valid_location(board, col):
	return board[ROW_COUNT-1][col] == 0

def get_next_open_row(board, col):
	for r in range(ROW_COUNT):
		if board[r][col] == 0:
			return r

def winning_move(board, piece):
	# Check horizontal locations for win
	for c in range(COLUMN_COUNT-3):
		for r in range(ROW_COUNT):
			if board[r][c] == piece and board[r][c+1] == piece and board[r][c+2] == piece and board[r][c+3] == piece:
				return True

	# Check vertical locations for win
	for c in range(COLUMN_COUNT):
		for r in range(ROW_COUNT-3):
			if board[r][c] == piece and board[r+1][c] == piece and board[r+2][c] == piece and board[r+3][c] == piece:
				return True

	# Check positively sloped diaganols
	for c in range(COLUMN_COUNT-3):
		for r in range(ROW_COUNT-3):
			if board[r][c] == piece and board[r+1][c+1] == piece and board[r+2][c+2] == piece and board[r+3][c+3] == piece:
				return True

	# Check negatively sloped diaganols
	for c in range(COLUMN_COUNT-3):
		for r in range(3, ROW_COUNT):
			if board[r][c] == piece and board[r-1][c+1] == piece and board[r-2][c+2] == piece and board[r-3][c+3] == piece:
				return True

def evaluate_window(window, piece):
    score = 0
    opp_piece = PLAYER_PIECE
    if piece == PLAYER_PIECE:
        opp_piece = AI_PIECE
    
    if window.count(piece) == 4:
        score += 100
    elif window.count(piece) == 3 and window.count(EMPTY) == 1:
        score += 5
    elif window.count(piece) == 2 and window.count(EMPTY) == 2:
        score += 2
    
    if window.count(opp_piece) == 3 and window.count(EMPTY) == 1:
        score -= 4
        
    return score
        

def score_position(board, piece):
    score = 0
    
    # Score center column
    center_array = [int(i) for i in list(board[:, COLUMN_COUNT//2])]
    center_count = center_array.count(piece)
    score += center_count * 3
    
    # Score horizontal
    for r in range(ROW_COUNT):
        row_array = [int(i) for i in list(board[r,:])]
        for c in range(COLUMN_COUNT-3):
            window = row_array[c:c+WINDOW_LENGTH]
            score += evaluate_window(window, piece)
                
    # Score vertical
    for c in range(COLUMN_COUNT):
        col_array = [int(i) for i in list(board[:,c])]
        for r in range(ROW_COUNT-3):
            window = col_array[r:r+WINDOW_LENGTH]
            score += evaluate_window(window, piece)
                
    # Score positive sloped diagonal
    for r in range(ROW_COUNT-3):
        for c in range(COLUMN_COUNT-3):
            window = [board[r+1][r+1] for i in range(WINDOW_LENGTH)]   
            score += evaluate_window(window, piece)
    
    #Score negative sloped diagonal
    for r in range(ROW_COUNT-3):
        for c in range(COLUMN_COUNT-3):
            window = [board[r+3-i][c+i] for i in range(WINDOW_LENGTH)]
            score += evaluate_window(window, piece)
    return score

def is_terminal_node(board):
    return winning_move(board, PLAYER_PIECE) or winning_move(board, AI_PIECE) or len(get_valid_locations(board)) == 0

def minimax(board, depth, maximizingPlayer):
    valid_locations = get_valid_locations(board)
    is_terminal = is_terminal_node(board)
    if depth == 0 or is_terminal:
        if is_terminal:
            if winning_move(board, AI_PIECE):
                return (None, 100000000)
            elif winning_move(board, PLAYER_PIECE):
                return (None, -100000000)
            else: # Game over, no more valid moves
                return (None, 0)
        else: # Deth is zero
            return (None, score_position(board, AI_PIECE))
        
    if maximizingPlayer: #Maximizing AI
        value = -math.inf
        column = random.choice(valid_locations)
        for col in valid_locations:
            row = get_next_open_row(board, col)
            b_copy = board.copy()
            drop_piece(b_copy, row, col, AI_PIECE)
            new_score = minimax(b_copy, depth-1, False)[1]
            if new_score > value:
                value = new_score
                column = col
        return column, value
        
    else: #Minizing player
        value = math.inf
        column = random.choice(valid_locations)
        for col in valid_locations:
            row = get_next_open_row(board, col)
            b_copy = board.copy()
            drop_piece(b_copy, row, col, PLAYER_PIECE)
            new_score = minimax(b_copy, depth-1, True)[1]
            if new_score < value:
                value = new_score
                column = col
        return column, value
        
def get_valid_locations(board):
    valid_locations = []
    for col in range(COLUMN_COUNT):
        if is_valid_location(board, col):
            valid_locations.append(col)
    return valid_locations

def check_draw(board):
  return len(get_valid_locations(board)) == 0
         
class ButtonClick(BaseModel):
    value: str

board = create_board()
turn = 0

def reset_board():
    global board, turn
    board = create_board()
    turn = random.randint(PLAYER, AI)

@app.post("/api/connect-4/min-max/reset-click")
async def reset_click():
    global board, turn
    board = create_board()
    turn = random.randint(PLAYER, AI)
    if(turn == PLAYER):
        mes = "Turn: Player"
    else:
        mes = "Turn: AI"
    board_flipped = np.flip(board, 0)
    np_board = board_flipped.tolist()
    return {"message": mes, "board": np_board, "turn": turn}

@app.post("/api/connect-4/min-max/player-turn")
async def player_turn(button_click: ButtonClick):
    col = int(button_click.value)
    global turn
    
    if not is_valid_location(board, col):
        # Column is full, return an appropriate response
        board_flipped = np.flip(board, 0)
        np_board = board_flipped.tolist()
        return {"message": "Column is full, choose another column.", "board": np_board, "turn": turn, "game_over": 0}
    
    if turn == PLAYER:
        row = get_next_open_row(board, col)
        drop_piece(board, row, col, PLAYER_PIECE)
        board_flipped = np.flip(board, 0)
        np_board = board_flipped.tolist()
        
        if winning_move(board, PLAYER_PIECE):
            reset_board() 
            game_over = True
            return {"message":"Player 1 Wins!", "board": np_board, "game_over": 1}
        
        if check_draw(board):
            reset_board()
            return{"message":"Draw Game!", "board": np_board, "game_over": 1}
        
        turn = AI
        return {"message": "Turn: AI", "board": np_board, "turn": turn, "game_over": 0}

@app.get("/api/connect-4/min-max/ai-turn")
async def ai_turn():
    global turn
    col, minimax_score = minimax(board, 5, True)
    if turn == AI:
        if col is not None:
            row = get_next_open_row(board, col)
            drop_piece(board, row, col, AI_PIECE)
            board_flipped = np.flip(board, 0)
            np_board = board_flipped.tolist()
            if winning_move(board, AI_PIECE):
                reset_board()
                return {"message":"Player 2 Wins!", "board": np_board, "game_over": 1}
            turn = PLAYER
            return {"message": "Turn: Player", "board": np_board, "turn": turn, "game_over": 0}
        else:
            board_flipped = np.flip(board, 0)
            np_board = board_flipped.tolist()
            return{"message":"Draw Game!", "board": np_board, "game_over": 1}
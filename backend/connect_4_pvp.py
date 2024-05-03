import numpy as np # type: ignore
from fastapi import FastAPI # type: ignore
from pydantic import BaseModel # type: ignore
from fastapi.middleware.cors import CORSMiddleware # type: ignore
import random

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Change this to your frontend URL in production
    allow_credentials=True,
    allow_methods=["POST"],
    allow_headers=["Content-Type"],
)

ROW_COUNT = 6
COLUMN_COUNT = 7
PLAYER1 = 0
PLAYER2 = 1
PLAYER1_PIECE = 1
PLAYER2_PIECE = 2

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

board = create_board()
turn = 0

class ButtonClick(BaseModel):
    value: str

def reset_board():
    global board, turn
    board = create_board()
    turn = random.randint(PLAYER1, PLAYER2)
    
@app.post("/api/connect-4/pvp/reset-click")
async def reset_click():
    global board, turn
    board = create_board()
    turn = random.randint(PLAYER1, PLAYER2)
    board_flipped = np.flip(board, 0)
    np_board = board_flipped.tolist()
    return {"board": np_board}

@app.post("/api/connect-4/pvp/player-turn")
async def button_click(button_click: ButtonClick):
  col = int(button_click.value)
  global turn
  
  if not is_valid_location(board, col):
        # Column is full, return an appropriate response
        board_flipped = np.flip(board, 0)
        np_board = board_flipped.tolist()
        return {"message": "Column is full, choose another column.", "board": np_board, "turn": turn}
  
  if turn == PLAYER1:
    row = get_next_open_row(board, col)
    drop_piece(board, row, col, PLAYER1_PIECE)
    board_flipped = np.flip(board, 0)
    np_board = board_flipped.tolist()
    if winning_move(board, PLAYER1_PIECE):
      reset_board()
      return {"message":"Player 1 Wins!", "board": np_board}
    
    turn = PLAYER2
    return {"received_value": col, "board": np_board, "turn": turn}
        
  else:
    row = get_next_open_row(board, col)
    drop_piece(board, row, col, PLAYER2_PIECE)
    board_flipped = np.flip(board, 0)
    np_board = board_flipped.tolist()
    if winning_move(board, PLAYER2_PIECE):
      reset_board() 
      return {"message":"Player 2 Wins!", "board": np_board}
    
    turn = PLAYER1
    return {"received_value": col, "board": np_board, "turn": turn}
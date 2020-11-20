# Minesweeper

## Gameplay
- The goal is to locate and "flag" all mines on the board
- You can flag a mine by right-clicking on the cell you believe holds a mine
- Left-clicking on a cell will reveal its contents. If the cell is a mine, the game is over. Otherwise, the cell will show the number of mines adjacent to itself. 
- The game is won when either all mines are flagged, or when all non-mine cells are revealed.
- The user can restart the game, or change the game level as desired. 

## Working Locally on Project

- Clone github repository
- Download / run Docker Desktop
- In terminal, run `docker-compose up`. The game should be accessible on `localhost:8080`.
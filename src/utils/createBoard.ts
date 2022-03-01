import { CellShape } from '../types/types';

export const createBoard = (rows: number, cols: number, mines: number) => {
  let board = [] as CellShape[][];
  let mineLocation = [] as [number, number][];

  for (let i = 0; i < rows; i++) {
    board.push([]);
    for (let j = 0; j < cols; j++) {
      board[i][j] = {
        x: i,
        y: j,
        isOpened: false,
        isFlagged: false,
        value: 0,
      };
    }
  }

  // place bombs
  let minesCount = 0;
  while (minesCount < mines) {
    let x = random(0, rows - 1);
    let y = random(0, cols - 1);

    if (board[x][y].value === 0) {
      board[x][y].value = 9;
      mineLocation.push([x, y]);
      minesCount++;
    }
  }

  // Increasing the value of specific cell
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (board[i][j].value === 9) {
        continue;
      }

      // Top
      if (i > 0 && board[i - 1][j].value === 9) {
        board[i][j].value++;
      }

      // Top Right
      if (i > 0 && j < cols - 1 && board[i - 1][j + 1].value === 9) {
        board[i][j].value++;
      }

      // Right
      if (j < cols - 1 && board[i][j + 1].value === 9) {
        board[i][j].value++;
      }

      // Botoom Right
      if (i < rows - 1 && j < cols - 1 && board[i + 1][j + 1].value === 9) {
        board[i][j].value++;
      }

      // Bottom
      if (i < rows - 1 && board[i + 1][j].value === 9) {
        board[i][j].value++;
      }

      // Bottom Left
      if (i < rows - 1 && j > 0 && board[i + 1][j - 1].value === 9) {
        board[i][j].value++;
      }

      // Left
      if (j > 0 && board[i][j - 1].value === 9) {
        board[i][j].value++;
      }

      // Top Left
      if (i > 0 && j > 0 && board[i - 1][j - 1].value === 9) {
        board[i][j].value++;
      }
    }
  }
  return { board, mineLocation };
};

const random = (min = 0, max: number) =>
  Math.floor(Math.random() * (max - min + 1) + min);

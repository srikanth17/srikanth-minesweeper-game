import { CellShape } from '../types/types';

export const revealed = (
  board: CellShape[][],
  x: number,
  y: number,
  newNonMines: number
) => {
  let show = [] as CellShape[];
  show.push(board[x][y]);
  while (show.length !== 0) {
    let one = show.pop()!;
    let i = one.x;
    let j = one.y;
    if (!one.isOpened) {
      newNonMines--;
      one.isOpened = true;
    }
    if (one.value !== 0) {
      break;
    }

    // top left

    if (
      i > 0 &&
      j > 0 &&
      board[i - 1][j - 1].value === 0 &&
      !board[i - 1][j - 1].isOpened
    ) {
      show.push(board[i - 1][j - 1]);
    }

    // bottom right

    if (
      i < board.length - 1 &&
      j < board[0].length - 1 &&
      board[i + 1][j + 1].value === 0 &&
      !board[i + 1][j + 1].isOpened
    ) {
      show.push(board[i + 1][j + 1]);
    }

    // top right

    if (
      i > 0 &&
      j < board[0].length - 1 &&
      board[i - 1][j + 1].value === 0 &&
      !board[i - 1][j + 1].isOpened
    ) {
      show.push(board[i - 1][j + 1]);
    }

    // bottom left

    if (
      i < board.length - 1 &&
      j > 0 &&
      board[i + 1][j - 1].value === 0 &&
      !board[i + 1][j - 1].isOpened
    ) {
      show.push(board[i + 1][j - 1]);
    }

    // top
    if (i > 0 && board[i - 1][j].value === 0 && !board[i - 1][j].isOpened) {
      show.push(board[i - 1][j]);
    }

    // right

    if (
      j < board[0].length - 1 &&
      board[i][j + 1].value === 0 &&
      !board[i][j + 1].isOpened
    ) {
      show.push(board[i][j + 1]);
    }

    // bottom

    if (
      i < board.length - 1 &&
      board[i + 1][j].value === 0 &&
      !board[i + 1][j].isOpened
    ) {
      show.push(board[i + 1][j]);
    }

    // left

    if (j > 0 && board[i][j - 1].value === 0 && !board[i][j - 1].isOpened) {
      show.push(board[i][j - 1]);
    }

    // start revealing the item

    if (i > 0 && j > 0 && !board[i - 1][j - 1].isOpened) {
      //Top Left Reveal

      board[i - 1][j - 1].isOpened = true;
      newNonMines--;
    }

    if (j > 0 && !board[i][j - 1].isOpened) {
      // Left Reveal
      board[i][j - 1].isOpened = true;
      newNonMines--;
    }

    if (i < board.length - 1 && j > 0 && !board[i + 1][j - 1].isOpened) {
      //Bottom Left Reveal
      board[i + 1][j - 1].isOpened = true;
      newNonMines--;
    }

    if (i > 0 && !board[i - 1][j].isOpened) {
      //Top Reveal
      board[i - 1][j].isOpened = true;
      newNonMines--;
    }

    if (i < board.length - 1 && !board[i + 1][j].isOpened) {
      // Bottom Reveal
      board[i + 1][j].isOpened = true;
      newNonMines--;
    }

    if (i > 0 && j < board[0].length - 1 && !board[i - 1][j + 1].isOpened) {
      // Top Right Reveal
      board[i - 1][j + 1].isOpened = true;
      newNonMines--;
    }

    if (j < board[0].length - 1 && !board[i][j + 1].isOpened) {
      //Right Reveal
      board[i][j + 1].isOpened = true;
      newNonMines--;
    }

    if (
      i < board.length - 1 &&
      j < board[0].length - 1 &&
      !board[i + 1][j + 1].isOpened
    ) {
      // Bottom Right Reveal
      board[i + 1][j + 1].isOpened = true;
      newNonMines--;
    }
  }

  return { board, newNonMines };
};

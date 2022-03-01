import { useState, useEffect } from 'react';
import { CellShape } from '../types/types';
import { createBoard } from '../utils/createBoard';
import { revealed } from '../utils/revealBoard';
import Cell from './Cell';
import { Button, Grid, styled, Typography } from '@mui/material';

const Container = styled(Grid)({
  maxWidth: 600,
  marginLeft: 'auto',
  marginRight: 'auto',
});

const MinesLabel = styled(Typography)({
  textAlign: 'center',
  fontSize: '30px',
  margin: '20px',
});

const CellWrapper = styled('div')({
  flexDirection: 'row',
  width: 'fit-content',
  color: 'white',
});

const StyledButton = styled(Button)({
  height: '50px',
  marginTop: '15px',
});

interface BoardProps {
  rows: number;
  cols: number;
  mines: number;
}

const Board = (props: BoardProps) => {
  const { rows, cols, mines } = props;
  const [gameState, setGameState] = useState(true);
  const [board, setBoard] = useState<CellShape[][]>([]);
  const [nonMines, setNonMines] = useState(0);
  const [mineLocation, setMineLocation] = useState<[number, number][]>([]);

  useEffect(() => {
    newBoard();
  }, []);

  // Making freshboard atstart
  const newBoard = () => {
    const { board, mineLocation } = createBoard(rows, cols, mines);
    setNonMines(rows * cols - mines);
    setMineLocation(mineLocation);
    setBoard(board);
  };

  const handleRightClick = (
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number
  ) => {
    if (!gameState) {
      return;
    }
    e.preventDefault();
    let newBoard = JSON.parse(JSON.stringify(board)) as CellShape[][];
    newBoard[x][y].isFlagged = true;
    setBoard(newBoard);
  };

  const handleClick = (x: number, y: number) => {
    if (!gameState) {
      return;
    }
    let newBoard = JSON.parse(JSON.stringify(board)) as CellShape[][];
    if (newBoard[x][y].value === 9) {
      for (let i = 0; i < mineLocation.length; i++) {
        newBoard[mineLocation[i][0]][mineLocation[i][1]].isOpened = true;
      }
      setBoard(newBoard);
      setGameState(false);
    }
    if (nonMines === 0) {
      console.log('Won');
      setGameState(false);
    } else {
      const { board, newNonMines } = revealed(newBoard, x, y, nonMines);
      setBoard(board);
      setNonMines(newNonMines);
    }
  };

  return (
    <Container container justifyContent="center" spacing={1}>
      <MinesLabel variant="h3">Mines - {mines}</MinesLabel>
      <StyledButton
        onClick={() => {
          setGameState(true);
          newBoard();
        }}
        variant="contained"
      >
        New Game
      </StyledButton>
      <Grid container justifyContent="center">
        {board.map((row, index) => {
          return (
            <CellWrapper key={index}>
              {row.map((cell, index) => {
                return (
                  <Cell
                    key={index}
                    cellInfo={cell}
                    onClick={handleClick}
                    onRightClick={handleRightClick}
                  />
                );
              })}
            </CellWrapper>
          );
        })}
      </Grid>
    </Container>
  );
};
export default Board;

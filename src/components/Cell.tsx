import { styled } from '@mui/material';
import FireExtinguisherIcon from '@mui/icons-material/FireExtinguisher';
import FlagIcon from '@mui/icons-material/Flag';
import { CellShape } from '../types/types';

const Wrapper = styled('div')({
  width: 40,
  height: 40,
  opacity: '0.8',
  border: '2px solid white',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '20px',
  cursor: 'pointer',
  color: 'cyan',
  fontWeight: '1000',
});

interface CellProps {
  cellInfo: CellShape;
  onRightClick: (
    e: React.MouseEvent<HTMLDivElement>,
    x: number,
    y: number
  ) => void;
  onClick: (x: number, y: number) => void;
}

const Cell = (props: CellProps) => {
  const { cellInfo, onClick, onRightClick } = props;

  const click = () => {
    onClick(cellInfo.x, cellInfo.y);
  };

  const rightclick = (e: React.MouseEvent<HTMLDivElement>) => {
    onRightClick(e, cellInfo.x, cellInfo.y);
  };

  const getValue = () => {
    if (!cellInfo.isOpened && cellInfo.isFlagged) {
      return <FlagIcon color="error" />;
    } else if (cellInfo.isOpened && cellInfo.value !== 0) {
      if (cellInfo.value === 9) {
        return <FireExtinguisherIcon />;
      } else {
        return cellInfo.value;
      }
    } else {
      return '';
    }
  };

  return (
    <Wrapper
      sx={{
        backgroundColor:
          cellInfo.isOpened && cellInfo.value !== 0
            ? cellInfo.value === 9
              ? 'red'
              : ' #00226d'
            : cellInfo.isOpened && cellInfo.value === 0
            ? '#00226f'
            : 'gray',
      }}
      onClick={click}
      onContextMenu={rightclick}
    >
      {getValue()}
    </Wrapper>
  );
};

export default Cell;

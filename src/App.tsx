import { Grid, Typography } from '@mui/material';
import Game from './components/Game';

const App = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h2" textAlign="center">
          Minesweeper
        </Typography>
        <Game />
      </Grid>
    </Grid>
  );
};

export default App;

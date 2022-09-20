import { Button, ButtonGroup } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  increaseByExtra,
  incrementByRun,
  undo,
  wicketTaken,
} from '../redux/scoreSlice';
import UndoIcon from '@mui/icons-material/Undo';

export const ScoreCounter = () => {
  const dispatch = useDispatch();
  const [extra, setExtra] = useState<string>('');

  const increaseScore = (value: number) => {
    extra ?increaseOnlyRun(value,extra) : dispatch(incrementByRun(value));
  };

  const increaseOnlyRun = (value: number,type:string) => {
    dispatch(increaseByExtra({value,type}));
    setExtra('');
  };


  return (
    <Grid
      xs={12}
      margin={3}
      container
      spacing={2}
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      
    >
      <Grid xs={4}>
        <ButtonGroup
          fullWidth
          variant="outlined"
          aria-label="outlined button group"
         
        >
          <Button  sx={{fontWeight:'bold'}} onClick={() => increaseScore(1)}>1</Button>
          <Button sx={{fontWeight:'bold'}} onClick={() => increaseScore(2)}>2</Button>
          <Button sx={{fontWeight:'bold'}} onClick={() => increaseScore(3)}>3</Button>
        </ButtonGroup>
      </Grid>
      <Grid xs={4}>
        <ButtonGroup
          fullWidth
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button sx={{fontWeight:'bold'}} onClick={() => increaseScore(5)}>5</Button>
          <Button sx={{fontWeight:'bold'}} onClick={() => increaseScore(4)}>4</Button>
          <Button sx={{fontWeight:'bold'}} onClick={() => increaseScore(6)}>6</Button>
        </ButtonGroup>
      </Grid>
      <Grid xs={4}>
        <ButtonGroup
          fullWidth
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button disabled={!!extra} sx={{fontWeight:'bold'}} onClick={() => increaseScore(0)}>0</Button>
          <Button disabled={!!extra} sx={{fontWeight:'bold'}} onClick={() => setExtra('WD')}>Wide</Button>
          <Button disabled={!!extra} sx={{fontWeight:'bold'}} onClick={() => setExtra('NB')}>No Ball</Button>
        </ButtonGroup>
      </Grid>
      <Grid xs={4}>
        <ButtonGroup
          fullWidth
          variant="outlined"
          aria-label="outlined button group"
        >
          <Button disabled={!!extra} sx={{fontWeight:'bold'}} onClick={() => dispatch(wicketTaken())} color="error">
            Out
          </Button>
          <Button disabled={!!extra} sx={{fontWeight:'bold'}} onClick={() => dispatch(undo())} color="inherit">
           <UndoIcon/>
          </Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
};

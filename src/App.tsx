import React, { Fragment } from 'react';
import './App.css';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { ScoreCounter } from './components/scoreCounter';
import { Button, Container } from '@mui/material';
import { resetScore } from './redux/scoreSlice';
import { NewMatch } from './components/NewMatch';
import { TeamCard } from './components/TeamCard';
import OverStats from './components/OverStats';

function App() {
  const { isMatchOver, isMatchStarted } = useSelector(
    (state: RootState) => state.score
  );
  const dispatch = useDispatch();

  return (
    <Container maxWidth="lg">
      <div className="App">
        {!isMatchStarted ? (
          <NewMatch />
        ) : (
          <Fragment>
            <TeamCard />
            <OverStats/>
            {isMatchOver ? (
              <Fragment>
                <h4>Match ended</h4>{' '}
                <Button
                  variant="outlined"
                  onClick={() => dispatch(resetScore())}
                  color="info"
                >
                  Reset Score
                </Button>
              </Fragment>
            ) : (
              <ScoreCounter />
            )}
          </Fragment>
        )}
      </div>
    </Container>
  );
}

export default App;

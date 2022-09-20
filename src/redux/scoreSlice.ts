import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store';

export type Team = {
  teamId: number;
  name: string;
  totalScore: number;
  balls: number;
  wickets: number;
  status: 'ALLOUT' | 'OVERSREACHED' | 'PENDING' | 'BATTING' | 'BOWLING';
  overs: Array<Array<string>>;
};

export type ScoreState = {
  isMatchStarted: boolean;
  isMatchOver: boolean;
  totalOvers: number;
  teams: Array<Team>;
};

const initialState: ScoreState = {
  isMatchStarted: false,
  isMatchOver: false,
  totalOvers: 0,
  teams: [
    {
      teamId: 1,
      name: '',
      totalScore: 0,
      balls: 0,
      wickets: 0,
      status: 'PENDING',
      overs: [],
    },
    {
      teamId: 2,
      name: '',
      totalScore: 0,
      balls: 0,
      wickets: 0,
      status: 'PENDING',
      overs: [],
    },
  ],
};

export const scoreSlice = createSlice({
  name: 'score',
  initialState,
  reducers: {
    increment: state => {
      const battingTeam = state.teams.find(team => team.status === 'BATTING');
      if (battingTeam) battingTeam.totalScore += 1;
    },
    decrement: state => {
      const battingTeam = state.teams.find(team => team.status === 'BATTING');
      if (battingTeam) battingTeam.totalScore -= 1;
    },
    addBalls: (
      state,
      action: PayloadAction<{
        value: number;
        type?: string;
      }>
    ) => {
      const battingTeam = state.teams.find(team => team.status === 'BATTING');
      if (battingTeam) {
        const isOverCompleted = battingTeam.balls % 1 === 0;
        const score = action.payload.type
          ? action.payload.type == 'W'
            ? action.payload.type
            : action.payload.value.toString().concat(action.payload.type)
          : action.payload.value.toString();
        if (isOverCompleted && !['1NB', '1WD'].includes(battingTeam.overs[0]?.[0]))
          battingTeam.overs.unshift([score]);
        else {
          const currentOver = battingTeam.overs[0];
          currentOver ? currentOver.unshift(score) : battingTeam.overs.push([score]);
        }

        if (action.payload.type == 'NB' || action.payload.type == 'WD') return;

        const isLastBall = (battingTeam.balls % 1).toPrecision(1) === '0.5';
        battingTeam.balls += isLastBall ? 0.5 : 0.1;
        battingTeam.balls = Math.round(battingTeam.balls * 10) / 10;
      }
    },
    incrementByRun: (state, action: PayloadAction<number>) => {
      const battingTeam = state.teams.find(team => team.status === 'BATTING');
      const bowlingTeam = state.teams.find(team => ['ALLOUT', 'OVERSREACHED', 'BOWLING'].includes(team.status));
      state.isMatchOver = state.teams.every(team => ['ALLOUT', 'OVERSREACHED'].includes(team.status));

      if (!battingTeam || !bowlingTeam) return;

      if (!state.isMatchOver) {
        if (state.totalOvers - battingTeam.balls == 0) {
          battingTeam.status = 'OVERSREACHED';
          if (!['ALLOUT', 'OVERSREACHED'].includes(bowlingTeam.status)) {
            bowlingTeam.status = 'BATTING';
          }
        } else {
          battingTeam.totalScore += action.payload;
          scoreSlice.caseReducers.addBalls(
            state,
            scoreSlice.actions.addBalls({
              value: action.payload,
            })
          );
        }
      }
    },
    increaseByExtra: (state, action: PayloadAction<{ value: number; type: string }>) => {
      const battingTeam = state.teams.find(team => team.status === 'BATTING');
      if (battingTeam) {
        battingTeam.totalScore += action.payload.value;
        scoreSlice.caseReducers.addBalls(
          state,
          scoreSlice.actions.addBalls({
            value: action.payload.value,
            type: action.payload.type,
          })
        );
      }
    },
    wicketTaken: state => {
      const battingTeam = state.teams.find(team => team.status === 'BATTING');
      const bowlingTeam = state.teams.find(team => ['ALLOUT', 'OVERSREACHED', 'BOWLING'].includes(team.status));
      state.isMatchOver = state.teams.every(team => ['ALLOUT', 'OVERSREACHED'].includes(team.status));

      if (!battingTeam || !bowlingTeam) return;

      if (!state.isMatchOver) {
        const isAllout = battingTeam.wickets == 9;
        if (isAllout) {
          battingTeam.status = 'ALLOUT';
          if (!['ALLOUT', 'OVERSREACHED'].includes(bowlingTeam.status)) {
            bowlingTeam.status = 'BATTING';
            battingTeam.wickets += 1;
          }
        } else {
          battingTeam.wickets += 1;
          scoreSlice.caseReducers.addBalls(
            state,
            scoreSlice.actions.addBalls({
              value: 0,
              type: 'W',
            })
          );
        }
      }
    },
    undo: state => {
      const battingTeam = state.teams.find(team => team.status === 'BATTING');
      if (!battingTeam || (battingTeam.balls === 0 && battingTeam.totalScore === 0)) return;
      const lastover = battingTeam.overs[0];
      const lastValue = lastover?.[0];
      lastover?.shift();
      lastover?.length == 0 && battingTeam?.overs.shift();

      const isOver = battingTeam.balls % 1 === 0;
      console.log('lastValue', lastValue);
      if(lastValue ==='W'|| lastValue ==='0'){
        battingTeam.balls -= isOver ? 0.5 : 0.1;
        battingTeam.balls = Math.round(battingTeam.balls * 10) / 10;
      }
      else if(lastValue.includes('NB')|| lastValue.includes('WD')){
        battingTeam.totalScore -= +lastValue.slice(0, -2);
      }else{
        battingTeam.balls -= isOver ? 0.5 : 0.1;
        battingTeam.balls = Math.round(battingTeam.balls * 10) / 10;
        battingTeam.totalScore -= +lastValue;
      }
    },
    startMatch: (state, action) => {
      const team1 = state.teams[0];
      const team2 = state.teams[1];

      state.totalOvers = +action.payload.totalOvers;
      team1.name = action.payload.team1Name;
      team1.status = action.payload.team1Status;
      team2.name = action.payload.team2Name;
      team2.status = action.payload.team2Status;

      state.isMatchStarted = true;
      state.isMatchOver = false;
    },
    resetScore: () => initialState,
  },
});

export const selectOvers = createSelector(
  (state: RootState) => state.score.teams,
  (teams: Team[]) => teams.find(team => team.status === 'BATTING')?.overs || []
);

export const { increment, decrement, incrementByRun, increaseByExtra, wicketTaken, resetScore, startMatch, undo } =
  scoreSlice.actions;

export default scoreSlice.reducer;

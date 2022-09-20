import { Paper, Stack, styled } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { Team } from '../redux/scoreSlice';
import { RootState } from '../redux/store';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  display:'flex',
  justifyContent:'space-between',
  width: '80%',
  textAlign: 'center',
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  alignItems:'center',
  color: theme.palette.text.secondary,
}));

export const TeamCard = () => {
  const { teams } = useSelector((state: RootState) => state.score);

  return (
    <Stack
      direction="column"
      alignItems="center"
      marginX='auto'
      paddingY={3}
      spacing={2}
    >
      {teams.map((team:Team,i:number) => (
        <Item sx={{color:team.status =='BATTING' ?'black':'grey',borderBottom:team.status =='BATTING' ?'5px solid royalbLue':'' }} elevation={2} key={i}>
          <h2>{team.name}</h2>
          <h2>
            <span style={{fontWeight:'400',color:'gray'}}>({team.balls})  </span>
            {team.totalScore} / {team.wickets}
          </h2>
         
        </Item>
      ))}
    </Stack>
  );
};

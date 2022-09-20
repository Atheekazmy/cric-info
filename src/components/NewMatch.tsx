import { Button, Stack } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { startMatch } from '../redux/scoreSlice';
import CustomizedDialog from './Dialog';
import { MatchForm } from './MatchForm';

type TeamStatus ='PENDING' | 'BATTING' | 'BOWLING';

export type MatchFormData = {
  team1Name: string;
  team2Name: string;
  totalOvers: number;
  team1Status:TeamStatus
  team2Status: TeamStatus;
};

export const NewMatch = () => {
  const [formData, setFormData] = useState<MatchFormData>({
    team1Name: '',
    team2Name: '',
    totalOvers: 0,
    team1Status: 'PENDING',
    team2Status: 'PENDING',
  });
  const [showbattingSelection, setShowbattingSelection] = useState(false);
  const dispatch = useDispatch();

  const tossTeams = (team1Status: TeamStatus, team2Status: TeamStatus) => {
    dispatch(startMatch({ ...formData, team1Status, team2Status }));
    setOpen(false);
  };

  const onChange = (values: any) => {
    setFormData({ ...formData, ...values });
  };

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = (isSave = false) => {
    !isSave ? setOpen(false) : setShowbattingSelection(true);
  };
  const dialogTitle =showbattingSelection?'Choose Batting Team':'Start New Match';

  return (
    <Stack spacing={2} paddingTop={2}>
      <Button variant="outlined" onClick={handleClickOpen}>
        {dialogTitle}
      </Button>

      <CustomizedDialog open={open} handleClose={handleClose} title={dialogTitle}>
        {showbattingSelection ? (
          <Stack spacing={2}>
            <Button
              fullWidth
              variant="outlined"
              onClick={() => tossTeams('BATTING', 'BOWLING')}
            >
              {formData.team1Name}
            </Button>
            
            <Button
              fullWidth
              variant="outlined"
              onClick={() => tossTeams('BOWLING', 'BATTING')}
            >
              {formData.team2Name}
            </Button>
          </Stack>
        ) : (
          <MatchForm formData={formData} onChange={onChange} />
        )}
      </CustomizedDialog>
    </Stack>
  );
};

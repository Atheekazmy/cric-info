import { Stack, TextField } from '@mui/material';
import React from 'react';
import { MatchFormData } from './NewMatch';

export const MatchForm = ({
  formData,
  onChange,
}: {
  formData: MatchFormData;
  onChange: (values: any) => any;
}) => {
  return (
    <Stack component="form" spacing={2} noValidate autoComplete="off">
      <TextField
        label="Team 1"
        id="filled-hidden-label-small"
        fullWidth
        size="small"
        value={formData.team1Name}
        onChange={e => onChange({ team1Name: e.target.value })}
      />
      <TextField
        label="Team 2"
        id="filled-hidden-label-small"
        fullWidth
        size="small"
        value={formData.team2Name}
        onChange={e => onChange({ team2Name: e.target.value })}
      />
      <TextField
        label="Overs"
        id="filled-hidden-label-small"
        type="number"
        size="small"
        value={formData.totalOvers}
        onChange={e => onChange({ totalOvers: e.target.value })}
      />
    </Stack>
  );
};

import * as React from 'react';
// import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import { selectOvers } from '../redux/scoreSlice';
import { RootState } from '../redux/store';
import { Avatar, Box, Tabs } from '@mui/material';
import { green, grey, purple, red } from '@mui/material/colors';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  margin: 5,
}));

export default function OverStats() {
  const overs = useSelector((state: RootState) => selectOvers(state));
  return (
    <Box sx={{ borderBottom: 1,borderTop:1, borderColor: 'divider' }}>
      <Tabs variant="scrollable" scrollButtons="auto" aria-label="scrollable auto tabs example" value={0}>
        {overs.map((over: Array<string>, i: number) => (
          <Item key={i}>
            <Stack direction="row" spacing={1}>
              {over.map((ball, index) => {
                let bgcolor: string = grey[300];
                let color = 'black';
                switch (ball) {
                  case '6':
                    bgcolor = purple[600];
                    color = 'white';
                    break;
                  case '4':
                    bgcolor = green[600];
                    color = 'white';
                    break;
                  case 'W':
                    bgcolor = red[600];
                    color = 'white';
                    break;
                }
                return (
                  <Avatar
                    variant="rounded"
                    key={index}
                    sx={{
                      fontWeight: 'bold',
                      height: 32,
                      width: 32,
                      textTransform: 'capitalize',
                      fontSize: 12,
                      bgcolor,
                      color,
                    }}
                  >
                    {ball == '0' ? <FiberManualRecordIcon sx={{ fontSize: '8px' }} /> : ball}
                  </Avatar>
                );
              })}
            </Stack>
          </Item>
        ))}
      </Tabs>
    </Box>
  );
}

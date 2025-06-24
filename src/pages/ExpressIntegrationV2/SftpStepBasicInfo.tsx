import { Box, Button, Grid, MenuItem, TextField, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

const environments = ['Development', 'Staging', 'Production'];
const timeZones = ['Eastern Time Zone (UTC-5)', 'Central Time Zone (UTC-6)', 'Pacific Time Zone (UTC-8)'];

const SftpStepBasicInfo = ({ onNext, onBack }: { onNext: () => void; onBack?: () => void }) => {
  const [integrationName, setIntegrationName] = useState('');
  const [environment, setEnvironment] = useState(environments[0]);
  const [timeZone, setTimeZone] = useState(timeZones[0]);

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(6px)',
          border: '1px solid #e0e0e0',
          // maxWidth: 600,
          mx: 'auto',
          mt: 4,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={3}>
          Basic Info
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontWeight={500} mb={1}>
              Integration Name*
            </Typography>
            <TextField
              fullWidth
              required
              placeholder="Enter name"
              value={integrationName}
              onChange={e => setIntegrationName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={500} mb={1}>
              Environment
            </Typography>
            <TextField
              select
              fullWidth
              value={environment}
              onChange={e => setEnvironment(e.target.value)}
            >
              {environments.map(env => (
                <MenuItem key={env} value={env}>{env}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={500} mb={1}>
              Time Zone
            </Typography>
            <TextField
              select
              fullWidth
              value={timeZone}
              onChange={e => setTimeZone(e.target.value)}
            >
              {timeZones.map(tz => (
                <MenuItem key={tz} value={tz}>{tz}</MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
      </Paper>
      <Paper
        elevation={0}
        sx={{
          p: 2,
          borderRadius: 3,
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(6px)',
          border: '1px solid #e0e0e0',
          // maxWidth: 600,
          mx: 'auto',
          mt: 4,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <Button variant="outlined" sx={{ minWidth: 120 }} onClick={onBack}>Back</Button>
        <Button variant="contained" sx={{ minWidth: 180 }} onClick={onNext} disabled={!integrationName}>
          Save & Continue
        </Button>
      </Paper>
    </>
  );
};

export default SftpStepBasicInfo; 
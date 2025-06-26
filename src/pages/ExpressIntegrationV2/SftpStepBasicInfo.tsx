import { Box, Button, Grid, MenuItem, TextField, Paper, Typography } from '@mui/material';
import { useState } from 'react';

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
          width: 1,
          p: 3,
          borderRadius: 1,
          background: 'rgba(255,255,255,0.9)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          backdropFilter: 'blur(6px)',
          border: '1px solid #e0e0e0',
          mt: 4,
        }}
      >
        <Typography variant="h6" fontWeight={600} mb={3}>
          Basic Info
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography fontWeight={500} mb={1}>
              Integration Name<span style={{ color: '#FF4D4F' }}>*</span>
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
      <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
        <Button variant="outlined" sx={{ minWidth: 1 / 2 }} onClick={onBack}>Back</Button>
        <Button variant="contained" sx={{ minWidth: 1 / 2 }} onClick={onNext} disabled={!integrationName}>
          Save & Continue
        </Button>
      </Box>
    </>
  );
};

export default SftpStepBasicInfo; 
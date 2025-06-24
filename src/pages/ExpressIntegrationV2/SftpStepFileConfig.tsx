import { Box, Button, Grid, MenuItem, Switch, TextField, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';

const fileTypes = ['Json', 'CSV', 'XLSX'];

const SftpStepFileConfig = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [fileType, setFileType] = useState(fileTypes[0]);
  const [fileNamePattern, setFileNamePattern] = useState('');
  const [maxFileSize, setMaxFileSize] = useState(30);
  const [hasHeader, setHasHeader] = useState(true);

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
          File Configuration
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={500} mb={1}>
              File Type
            </Typography>
            <TextField
              select
              fullWidth
              value={fileType}
              onChange={e => setFileType(e.target.value)}
            >
              {fileTypes.map(type => (
                <MenuItem key={type} value={type}>{type}</MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={500} mb={1}>
              File Name Pattern
            </Typography>
            <TextField
              fullWidth
              placeholder="eg. [YYYYMMDD]_[Name].[extension]"
              value={fileNamePattern}
              onChange={e => setFileNamePattern(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={500} mb={1}>
              Max File Size
            </Typography>
            <TextField
              fullWidth
              type="number"
              placeholder="30"
              InputProps={{ endAdornment: <Typography>Mb</Typography> }}
              value={maxFileSize}
              onChange={e => setMaxFileSize(Number(e.target.value))}
            />
          </Grid>
          <Grid item xs={12} md={6} display="flex" alignItems="center">
            <Typography fontWeight={500} mb={1} mr={2}>
              File Contains Header Row
            </Typography>
            <Switch checked={hasHeader} onChange={e => setHasHeader(e.target.checked)} />
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
        <Button variant="contained" sx={{ minWidth: 180 }} onClick={onNext}>
          Save & Continue
        </Button>
      </Paper>
    </>
  );
};

export default SftpStepFileConfig; 
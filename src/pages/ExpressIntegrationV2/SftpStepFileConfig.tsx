import { Box, Button, Grid, MenuItem, TextField, Typography, Paper, Select, InputBase } from '@mui/material';
import { useState } from 'react';
import TableChartIcon from '@mui/icons-material/TableChart';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import GridOnIcon from '@mui/icons-material/GridOn';
import SegmentedToggle from '@/components/SegmentedToggle';

const fileTypes = [
  { value: 'Json', label: 'Json', icon: <TableChartIcon fontSize="small" /> },
  { value: 'CSV', label: 'CSV', icon: <InsertDriveFileIcon fontSize="small" /> },
  { value: 'XLSX', label: 'XLSX', icon: <GridOnIcon fontSize="small" /> },
];

const SftpStepFileConfig = ({ onNext, onBack, initialValues }: { onNext: (data: any) => void; onBack: () => void; initialValues?: any }) => {
  const [fileType, setFileType] = useState(initialValues?.fileType || fileTypes[0].value);
  const [fileNamePattern, setFileNamePattern] = useState(initialValues?.fileNamePattern || '');
  const [maxFileSize, setMaxFileSize] = useState(initialValues?.maxFileSize ?? 30);
  const [fileSizeUnit, setFileSizeUnit] = useState(initialValues?.fileSizeUnit || 'Mb');
  const [hasHeader, setHasHeader] = useState(initialValues?.hasHeader ?? true);

  const handleNext = () => {
    onNext({ fileType, fileNamePattern, maxFileSize, fileSizeUnit, hasHeader });
  };

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
              slotProps={{
                select: {
                  renderValue: (selected: unknown) => {
                    const selectedValue = selected as string;
                    const type = fileTypes.find(f => f.value === selectedValue);
                    return (
                      <Box display="flex" alignItems="center" gap={1}>
                        {type?.icon}
                        <span>{type?.label}</span>
                      </Box>
                    );
                  }
                }
              }}
            >
              {fileTypes.map(type => (
                <MenuItem key={type.value} value={type.value}>
                  {type.label}
                </MenuItem>
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
            <Box
              display="flex"
              alignItems="center"
              sx={{
                border: '1.5px solid #E6E7E8',
                borderRadius: '8px',
                overflow: 'hidden',
                background: '#fff',
                width: 1,
                height: 58,
              }}
            >
              <Select
                value={fileSizeUnit}
                onChange={e => setFileSizeUnit(e.target.value)}
                sx={{
                  minWidth: 70,
                  height: '100%',
                  border: 'none',
                  borderRadius: 0,
                  background: 'transparent',
                  borderRight: '1.5px solid #E6E7E8',
                  '.MuiSelect-select': { color: '#AEB0B4', fontWeight: 500, pl: 1, height: '100%', display: 'flex', alignItems: 'center' },
                  '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                  display: 'flex',
                  alignItems: 'center',
                }}
                input={<InputBase sx={{ height: '100%' }} />}
                variant="standard"
                disableUnderline
              >
                <MenuItem value="Mb">Mb</MenuItem>
                <MenuItem value="Gb">Gb</MenuItem>
              </Select>
              <TextField
                type="number"
                value={maxFileSize}
                onChange={e => setMaxFileSize(Number(e.target.value))}
                variant="standard"
                sx={{
                  flex: 1,
                  border: 'none',
                  background: 'transparent',
                  height: '100%',
                  '& .MuiInputBase-root': {
                    border: 'none',
                    background: 'transparent',
                    pl: 1,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  },
                  '& .MuiInputBase-input': {
                    p: 1,
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                  },
                }}
                inputProps={{ min: 0, style: { textAlign: 'left', height: '100%' } }}
                InputProps={{ disableUnderline: true }}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <SegmentedToggle
              label="File Contains Header Row"
              info
              options={[
                { label: 'Yes', value: true },
                { label: 'No', value: false },
              ]}
              value={hasHeader}
              onChange={setHasHeader}
            />
          </Grid>
        </Grid>
      </Paper>
      <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
        <Button variant="outlined" sx={{ minWidth: 1 / 2 }} onClick={onBack}>Back</Button>
        <Button variant="contained" sx={{ minWidth: 1 / 2 }} onClick={handleNext}>
          Save & Continue
        </Button>
      </Box>
    </>
  );
};

export default SftpStepFileConfig; 
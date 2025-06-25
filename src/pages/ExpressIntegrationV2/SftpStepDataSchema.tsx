import { Box, Button, Grid, IconButton, MenuItem, Switch, TextField, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const fieldTypes = ['String', 'Number', 'Date'];
const mappings = ['CUSIP No.', 'Account No.', 'Holder Name'];

const SftpStepDataSchema = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [fields, setFields] = useState([
    { mapping: 'CUSIP No.', fieldName: 'CUSIP', type: fieldTypes[0], required: false },
    { mapping: '', fieldName: '', type: '', required: false },
  ]);

  const handleFieldChange = (idx: number, key: string, value: any) => {
    setFields(fields => fields.map((f, i) => i === idx ? { ...f, [key]: value } : f));
  };

  const handleAddField = () => {
    setFields([...fields, { mapping: '', fieldName: '', type: fieldTypes[0], required: false }]);
  };

  const handleDeleteField = (idx: number) => {
    setFields(fields => fields.filter((_, i) => i !== idx));
  };

  return (
    <>
      <Paper
        elevation={0}
        sx={{
          width: 1,
          p: 0,
          borderRadius: 1,
          background: '#fff',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid #e0e0e0',
          mt: 4,
        }}
      >
        <Box px={3} pt={3}>
          <Typography variant="h5" fontWeight={700} mb={0.5}>
            Data Fields
          </Typography>
          <Typography variant="body2" color="#AEB0B4" mb={2}>
            Duis consectetur labore qui ullamco. Nisi sunt do culpa magna nisi.
          </Typography>
        </Box>
        <Box mt={1} mb={2} mx={0} sx={{ borderBottom: '1px solid #E6E7E8' }} />
        <Grid container spacing={2} alignItems="center" px={3} pb={2}>
          <Grid item xs={12} md={3}>
            <Typography color="#AEB0B4" fontWeight={500} mb={1}>Mapping</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color="#AEB0B4" fontWeight={500} mb={1}>Field Name</Typography>
          </Grid>
          <Grid item xs={12} md={3}>
            <Typography color="#AEB0B4" fontWeight={500} mb={1}>Type</Typography>
          </Grid>
          <Grid item xs={6} md={2}>
            <Typography color="#AEB0B4" fontWeight={500} mb={1}>Required</Typography>
          </Grid>
          <Grid item xs={6} md={1}></Grid>
        </Grid>
        {fields.map((field, idx) => (
          <Grid container spacing={2} alignItems="center" key={idx} mb={1} px={3}>
            <Grid item xs={12} md={3}>
              <TextField
                select
                value={field.mapping}
                onChange={e => handleFieldChange(idx, 'mapping', e.target.value)}
                slotProps={{ select: { displayEmpty: true } }}
                size="small"
                fullWidth
                sx={{
                  background: '#FAFAFB',
                  borderRadius: 2,
                  minHeight: 48,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    minHeight: 48,
                    py: 0,
                  },
                  '& .MuiInputBase-input': {
                    py: 1.5,
                  },
                }}
              >
                <MenuItem value="" disabled>Select Mapping</MenuItem>
                {mappings.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                value={field.fieldName}
                onChange={e => handleFieldChange(idx, 'fieldName', e.target.value)}
                placeholder="Enter Field Name"
                size="small"
                fullWidth
                sx={{
                  background: '#FAFAFB',
                  borderRadius: 2,
                  minHeight: 48,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    minHeight: 48,
                    py: 0,
                  },
                  '& .MuiInputBase-input': {
                    py: 1.5,
                  },
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                select
                value={field.type}
                onChange={e => handleFieldChange(idx, 'type', e.target.value)}
                slotProps={{ select: { displayEmpty: true } }}
                size="small"
                fullWidth
                sx={{
                  background: '#FAFAFB',
                  borderRadius: 2,
                  minHeight: 48,
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                    minHeight: 48,
                    py: 0,
                  },
                  '& .MuiInputBase-input': {
                    py: 1.5,
                  },
                }}
              >
                <MenuItem value="" disabled>Select Type</MenuItem>
                {fieldTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
              </TextField>
            </Grid>
            <Grid item xs={6} md={2} display="flex" alignItems="center">
              <Switch
                checked={field.required}
                onChange={e => handleFieldChange(idx, 'required', e.target.checked)}
              />
            </Grid>
            <Grid item xs={6} md={1} display="flex" alignItems="center">
              <IconButton
                onClick={() => handleDeleteField(idx)}
                // disabled={fields.length === 1}
                sx={{
                  border: `2px solid #E6E7E8`,
                  background: '#F5F5F5',
                  borderRadius: '50%',
                  width: 40,
                  height: 40,
                  color: '#B0B3C7',
                  transition: 'all 0.2s',
                  '&:hover': {
                    border: `2px solid #FF4D4F`,
                    color: '#FF4D4F',
                    background: '#fff',
                  },
                }}
              >
                <DeleteIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
        <Box mt={2} px={3} pb={3}>
          <Button
            variant="text"
            color="primary"
            onClick={handleAddField}
            sx={{ fontWeight: 600, textTransform: 'none', fontSize: 18, pl: 0 }}
            startIcon={<Box component="span" sx={{ color: '#5563F7', fontSize: 28, display: 'flex', alignItems: 'center' }}>+</Box>}
          >
            Add Field
          </Button>
        </Box>
      </Paper>
      <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
        <Button variant="outlined" sx={{ minWidth: 1 / 2 }} onClick={onBack}>Back</Button>
        <Button variant="contained" sx={{ minWidth: 1 / 2 }} onClick={onNext}>
          Save & Continue
        </Button>
      </Box>
    </>
  );
};

export default SftpStepDataSchema; 
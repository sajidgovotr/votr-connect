import { Box, Button, Grid, IconButton, MenuItem, Switch, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography, Paper } from '@mui/material';
import { useState } from 'react';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import Breadcrumbs from '@/components/Breadcrumbs';

const fieldTypes = ['String', 'Number', 'Date'];
const mappings = ['CUSIP No.', 'Account No.', 'Holder Name'];

const SftpStepDataSchema = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [fields, setFields] = useState([
    { mapping: '', fieldName: '', type: fieldTypes[0], required: false },
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
          Data Fields
        </Typography>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><Typography fontWeight={500}>Mapping</Typography></TableCell>
              <TableCell><Typography fontWeight={500}>Field Name</Typography></TableCell>
              <TableCell><Typography fontWeight={500}>Type</Typography></TableCell>
              <TableCell><Typography fontWeight={500}>Required</Typography></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field, idx) => (
              <TableRow key={idx}>
                <TableCell>
                  <TextField
                    select
                    value={field.mapping}
                    onChange={e => handleFieldChange(idx, 'mapping', e.target.value)}
                    size="small"
                    fullWidth
                  >
                    {mappings.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                  </TextField>
                </TableCell>
                <TableCell>
                  <TextField
                    value={field.fieldName}
                    onChange={e => handleFieldChange(idx, 'fieldName', e.target.value)}
                    size="small"
                    fullWidth
                  />
                </TableCell>
                <TableCell>
                  <TextField
                    select
                    value={field.type}
                    onChange={e => handleFieldChange(idx, 'type', e.target.value)}
                    size="small"
                    fullWidth
                  >
                    {fieldTypes.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
                  </TextField>
                </TableCell>
                <TableCell>
                  <Switch
                    checked={field.required}
                    onChange={e => handleFieldChange(idx, 'required', e.target.checked)}
                  />
                </TableCell>
                <TableCell>
                  <IconButton onClick={() => handleDeleteField(idx)} disabled={fields.length === 1}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Button startIcon={<AddIcon />} onClick={handleAddField} sx={{ mt: 2, mb: 2 }}>
          Add Field
        </Button>
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

export default SftpStepDataSchema; 
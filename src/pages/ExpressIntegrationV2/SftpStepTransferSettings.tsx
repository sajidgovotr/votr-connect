import { Box, Button, Grid, MenuItem, TextField, Paper, Typography } from '@mui/material';
import { useState } from 'react';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { useCreateIntegrationWithDetailsMutation, useUpdateIntegrationWithDetailsMutation } from '@/services/express-integration';
import useMessage from '@/hooks/useMessage';
import { EnvironmentEnum } from '@/types/environment';
import { storageService } from '@/utils/storage';
import { useNavigate, useParams } from 'react-router';

const protocols = ['FTP/SFTP'];
const types = ['SFTP'];
const schedules = ['Daily', 'Weekly', 'Monthly'];

interface SftpStepTransferSettingsProps {
  onBack: () => void;
  basicInfo: any;
  fileConfig: any;
  dataSchema: any;
  integrationMethodId?: string | null;
  initialValues?: any;
  editMode?: boolean;
  integrationId?: string;
}

const SftpStepTransferSettings = ({ onBack, basicInfo, fileConfig, dataSchema, integrationMethodId, initialValues, editMode, integrationId }: SftpStepTransferSettingsProps) => {
  const { productId } = useParams();
  const userDetails = storageService.getUserDetails();
  const [protocol, setProtocol] = useState(initialValues?.protocol || protocols[0]);
  const [type, setType] = useState(initialValues?.type || types[0]);
  const [host, setHost] = useState(initialValues?.host || '');
  const [port, setPort] = useState(initialValues?.port || '');
  const [userName, setUserName] = useState(initialValues?.userName || '');
  const [sshKey, setSshKey] = useState(initialValues?.sshKey || '');
  const [passphrase, setPassphrase] = useState(initialValues?.passphrase || '');
  const [schedule, setSchedule] = useState(initialValues?.schedule || schedules[0]);
  const [timeOfDay, setTimeOfDay] = useState(initialValues?.timeOfDay || '');
  const [createIntegrationWithDetails, { isLoading: isCreating }] = useCreateIntegrationWithDetailsMutation();
  const [updateIntegrationWithDetails, { isLoading: isUpdating }] = useUpdateIntegrationWithDetailsMutation();
  const { showSnackbar } = useMessage();
  const navigate = useNavigate();

  const handleSaveAndContinue = async () => {
    // Build the payload from all step data
    const payload = {
      productId: productId ?? '',
      brokerId: userDetails?.brokerId ?? '',
      integrationMethodId: integrationMethodId ?? "",
      environment: basicInfo?.environment === 'Development' ? EnvironmentEnum.DEVELOPMENT : basicInfo?.environment === 'Staging' ? EnvironmentEnum.STAGING : EnvironmentEnum.PRODUCTION,
      name: basicInfo?.integrationName,
      createdBy: userDetails?.userId ?? '',
      configs: [
        ...(protocol ? [{ configKey: 'protocol', configValue: protocol }] : []),
        ...(type ? [{ configKey: 'type', configValue: type }] : []),
        ...(host ? [{ configKey: 'host', configValue: host }] : []),
        ...(port ? [{ configKey: 'port', configValue: port }] : []),
        ...(schedule ? [{ configKey: 'schedule', configValue: schedule }] : []),
        ...(timeOfDay ? [{ configKey: 'timeOfDay', configValue: timeOfDay }] : []),
        ...(fileConfig?.fileType ? [{ configKey: 'fileType', configValue: fileConfig.fileType }] : []),
        ...(fileConfig?.fileNamePattern ? [{ configKey: 'fileNamePattern', configValue: fileConfig.fileNamePattern }] : []),
        ...(fileConfig?.maxFileSize ? [{ configKey: 'maxFileSize', configValue: fileConfig.maxFileSize.toString() }] : []),
        ...(fileConfig?.fileSizeUnit ? [{ configKey: 'fileSizeUnit', configValue: fileConfig.fileSizeUnit }] : []),
        ...(fileConfig?.hasHeader !== undefined ? [{ configKey: 'hasHeader', configValue: fileConfig.hasHeader.toString() }] : []),
        ...(basicInfo?.timeZone ? [{ configKey: 'timeZone', configValue: basicInfo.timeZone }] : []),
        ...(dataSchema?.fields ? [{ configKey: 'dataFields', configValue: JSON.stringify(dataSchema.fields) }] : []),
      ],
      auths: [
        ...(userName ? [{ authKey: 'username', authValue: userName }] : []),
        ...(sshKey ? [{ authKey: 'sshKey', authValue: sshKey }] : []),
        ...(passphrase ? [{ authKey: 'passphrase', authValue: passphrase }] : []),
      ],
    };
    try {
      if (editMode && integrationId) {
        await updateIntegrationWithDetails({ id: integrationId, data: payload }).unwrap();
        showSnackbar('Success', 'Integration updated successfully', 'success', 2000);
      } else {
        await createIntegrationWithDetails(payload).unwrap();
        showSnackbar('Success', 'Integration saved successfully', 'success', 2000);
      }
      setTimeout(() => {
        navigate('/integrations');
      }, 500);
    } catch (error) {
      showSnackbar('Error', 'Failed to save integration', 'error', 5000);
    }
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
          Transfer Settings
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={500} mb={1}>
              Transfer Protocol
            </Typography>
            <TextField
              select
              fullWidth
              value={protocol}
              onChange={e => setProtocol(e.target.value)}
              InputProps={{
                startAdornment: (
                  <CloudUploadIcon sx={{ color: '#AEB0B4', mr: 1 }} />
                ),
              }}
            >
              {protocols.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={500} mb={1}>
              Type
            </Typography>
            <TextField
              select
              fullWidth
              value={type}
              onChange={e => setType(e.target.value)}
            >
              {types.map(t => <MenuItem key={t} value={t}>{t}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} md={8}>
            <Typography fontWeight={500} mb={1}>
              Host
            </Typography>
            <TextField
              fullWidth
              placeholder="eg. sftp.demo-server.com"
              value={host}
              onChange={e => setHost(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <Typography fontWeight={500} mb={1}>
              Port
            </Typography>
            <TextField
              fullWidth
              placeholder="eg. 22, 80"
              value={port}
              onChange={e => setPort(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h6" fontWeight={600} mb={3}>
              Authentication
            </Typography>
            <Typography fontWeight={500} mb={1}>
              User Name
            </Typography>
            <TextField
              fullWidth
              placeholder="eg. Adam White"
              value={userName}
              onChange={e => setUserName(e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={500} mb={1}>
              SSH Key
            </Typography>
            <TextField
              fullWidth
              placeholder="Paste SSH Key here"
              value={sshKey}
              onChange={e => setSshKey(e.target.value)}
              multiline
              minRows={4}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontWeight={500} mb={1}>
              Passphrase
            </Typography>
            <TextField
              fullWidth
              type="password"
              placeholder="eg. P@ssword2024"
              value={passphrase}
              onChange={e => setPassphrase(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={500} mb={1}>
              Schedule
            </Typography>
            <TextField
              select
              fullWidth
              value={schedule}
              onChange={e => setSchedule(e.target.value)}
              InputProps={{
                startAdornment: (
                  <CalendarMonthIcon sx={{ color: '#AEB0B4', mr: 1 }} />
                ),
              }}
            >
              {schedules.map(s => <MenuItem key={s} value={s}>{s}</MenuItem>)}
            </TextField>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography fontWeight={500} mb={1}>
              Time of the Day
            </Typography>
            <TextField
              fullWidth
              placeholder="HH:MM/AM/PM"
              value={timeOfDay}
              onChange={e => setTimeOfDay(e.target.value)}
              InputProps={{
                startAdornment: (
                  <AccessTimeIcon sx={{ color: '#AEB0B4', mr: 1 }} />
                ),
              }}
            />
          </Grid>
        </Grid>
      </Paper>
      <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
        <Button variant="outlined" sx={{ minWidth: 1 / 2 }} onClick={onBack}>Back</Button>
        <Button variant="contained" sx={{ minWidth: 1 / 2 }} onClick={handleSaveAndContinue} disabled={isCreating || isUpdating}>
          Save & Continue
        </Button>
      </Box>
    </>
  );
};

export default SftpStepTransferSettings; 
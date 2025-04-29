import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
    Box,
    Typography,
    Card,
    Grid,
    TextField,
    Button,
    Stepper,
    Step,
    StepLabel,
    CircularProgress,
    Alert,
    Snackbar,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: '10px',
    boxShadow: 'none',
    border: '1px solid #e6e6e9',
}));

const TestSteps = [
    'Configure Test Parameters',
    'Run Test',
    'View Results'
];

interface TestIntegrationProps {
    selectedProduct: string;
    integrationType: string;
    selectedEnvironment?: string;
    onTestComplete: (success: boolean) => void;
}

interface TestConfigForm {
    endpoint: string;
    headers: string;
    payload: string;
}

const schema = yup.object().shape({
    endpoint: yup.string().url('Please enter a valid URL').required('Endpoint is required'),
    headers: yup.string().test('is-valid-json', 'Headers must be valid JSON', (value) => {
        if (!value) return true;
        try {
            JSON.parse(value);
            return true;
        } catch {
            return false;
        }
    }).required(),
    payload: yup.string().test('is-valid-json', 'Payload must be valid JSON', (value) => {
        if (!value) return true;
        try {
            JSON.parse(value);
            return true;
        } catch {
            return false;
        }
    }).required(),
});

const TestIntegration = ({ onTestComplete }: TestIntegrationProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
    const [testResults, setTestResults] = useState<{ status: number, responseTime: string, payload: string } | null>(null);
    const [showSkipMessage, setShowSkipMessage] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<TestConfigForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            endpoint: '',
            headers: '',
            payload: '',
        }
    });

    const onSubmit = async () => {
        if (activeStep === 0) {
            setActiveStep(1);
            return;
        }

        setTestStatus('running');
        // Simulate API test
        setTimeout(() => {
            setTestStatus('success');
            setTestResults({
                status: 200,
                responseTime: '120ms',
                payload: '{"success": true, "message": "Integration test successful"}',
            });
            setActiveStep(2);
        }, 2000);
    };

    const handleSkipTesting = () => {
        setShowSkipMessage(true);
        onTestComplete(true);
    };

    const renderConfigurationStep = () => (
        <Box component="form" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h6" gutterBottom>
                Test Configuration
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Test Endpoint"
                        {...register('endpoint')}
                        error={!!errors.endpoint}
                        helperText={errors.endpoint?.message}
                        placeholder="https://api.example.com/test"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Headers"
                        {...register('headers')}
                        error={!!errors.headers}
                        helperText={errors.headers?.message}
                        multiline
                        rows={4}
                        placeholder='{
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_TOKEN"
}'
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Test Payload"
                        {...register('payload')}
                        error={!!errors.payload}
                        helperText={errors.payload?.message}
                        multiline
                        rows={4}
                        placeholder='{
    "test": "data"
}'
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                    >
                        Next
                    </Button>
                </Grid>
            </Grid>
        </Box>
    );

    const renderRunTestStep = () => (
        <StyledCard>
            <Typography variant="h6" gutterBottom>
                Run Integration Test
            </Typography>
            <Box sx={{ textAlign: 'center', py: 4 }}>
                {testStatus === 'running' ? (
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                        <CircularProgress />
                        <Typography>Running integration test...</Typography>
                    </Box>
                ) : (
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        onClick={handleSubmit(onSubmit)}
                    >
                        Start Test
                    </Button>
                )}
            </Box>
        </StyledCard>
    );

    const renderTestResults = () => (
        <StyledCard>
            <Typography variant="h6" gutterBottom>
                Test Results
            </Typography>
            {testResults && (
                <Box sx={{ mt: 2 }}>
                    <Alert severity={testStatus === 'success' ? 'success' : 'error'} sx={{ mb: 2 }}>
                        {testStatus === 'success' ? 'Integration test completed successfully!' : 'Integration test failed'}
                    </Alert>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">Status Code</Typography>
                            <Typography>{testResults.status}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">Response Time</Typography>
                            <Typography>{testResults.responseTime}</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="subtitle2">Response Payload</Typography>
                            <TextField
                                fullWidth
                                multiline
                                rows={4}
                                value={testResults.payload}
                                InputProps={{ readOnly: true }}
                            />
                        </Grid>
                    </Grid>
                    <Box sx={{ mt: 3 }}>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => onTestComplete(testStatus === 'success')}
                        >
                            Finish
                        </Button>
                        <Button
                            sx={{ ml: 2 }}
                            variant="outlined"
                            onClick={() => {
                                setActiveStep(0);
                                setTestStatus('idle');
                                setTestResults(null);
                            }}
                        >
                            Run Another Test
                        </Button>
                    </Box>
                </Box>
            )}
        </StyledCard>
    );

    return (
        <Box>
            <Typography variant="h5" sx={{ fontSize: '24px', color: '#111827', fontWeight: 600, mb: 3 }}>
                Test Your Integration
            </Typography>

            <Box sx={{ display: 'flex' }}>
                <Box sx={{ width: '240px', mr: 4 }}>
                    <Stepper activeStep={activeStep} orientation="vertical">
                        {TestSteps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box sx={{ flexGrow: 1 }}>
                    {activeStep === 0 && renderConfigurationStep()}
                    {activeStep === 1 && renderRunTestStep()}
                    {activeStep === 2 && renderTestResults()}
                </Box>
            </Box>

            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <Button
                    variant="outlined"
                    onClick={handleSkipTesting}
                    sx={{ mr: 2 }}
                >
                    Skip Testing
                </Button>
            </Box>

            <Snackbar
                open={showSkipMessage}
                autoHideDuration={3000}
                onClose={() => setShowSkipMessage(false)}
                message="Testing has been skipped"
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            />
        </Box>
    );
};

export default TestIntegration; 
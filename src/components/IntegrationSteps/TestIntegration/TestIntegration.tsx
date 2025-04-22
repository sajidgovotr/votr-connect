import { useState } from 'react';
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

const TestIntegration = ({ onTestComplete }: TestIntegrationProps) => {
    const [activeStep, setActiveStep] = useState(0);
    const [testStatus, setTestStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
    const [testResults, setTestResults] = useState<{ status: number, responseTime: string, payload: string } | null>(null);
    const [testConfig, setTestConfig] = useState({
        endpoint: '',
        headers: '',
        payload: '',
    });

    const handleConfigChange = (field: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setTestConfig(prev => ({
            ...prev,
            [field]: event.target.value
        }));
    };

    const handleRunTest = async () => {
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

    const renderConfigurationStep = () => (
        <Box>
            <Typography variant="h6" gutterBottom>
                Test Configuration
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Test Endpoint"
                        value={testConfig.endpoint}
                        onChange={handleConfigChange('endpoint')}
                        placeholder="https://api.example.com/test"
                        helperText="Enter the endpoint URL for testing"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Headers"
                        value={testConfig.headers}
                        onChange={handleConfigChange('headers')}
                        multiline
                        rows={4}
                        placeholder='{
    "Content-Type": "application/json",
    "Authorization": "Bearer YOUR_TOKEN"
}'
                        helperText="Enter request headers in JSON format"
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        fullWidth
                        label="Test Payload"
                        value={testConfig.payload}
                        onChange={handleConfigChange('payload')}
                        multiline
                        rows={4}
                        placeholder='{
    "test": "data"
}'
                        helperText="Enter test payload in JSON format"
                    />
                </Grid>
                <Grid item xs={12}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setActiveStep(1)}
                        disabled={!testConfig.endpoint}
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
                        onClick={handleRunTest}
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
        </Box>
    );
};

export default TestIntegration; 
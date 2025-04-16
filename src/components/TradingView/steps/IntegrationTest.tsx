import React, { useState } from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CircularProgress,
    Alert,
    Stepper,
    Step,
    StepLabel,
    StepContent,
} from '@mui/material';

interface IntegrationTestProps {
    config: {
        apiKey: string;
        apiSecret: string;
        environment: string;
        dataStreams: string[];
        webhookUrl: string;
        webhookEvents: string[];
    };
    testStatus: 'idle' | 'testing' | 'success' | 'error';
    onTestComplete: (success: boolean) => void;
    onBack: () => void;
}

const testSteps = [
    {
        label: 'API Authentication',
        description: 'Verify API key and secret',
    },
    {
        label: 'Data Stream Connection',
        description: 'Test connection to selected data streams',
    },
    {
        label: 'Webhook Verification',
        description: 'Verify webhook endpoint and send test event',
    },
];

const IntegrationTest: React.FC<IntegrationTestProps> = ({
    testStatus,
    onTestComplete,
    onBack
}) => {
    const [activeTestStep, setActiveTestStep] = useState(0);
    const [stepStatus, setStepStatus] = useState<Record<number, 'idle' | 'testing' | 'success' | 'error'>>({
        0: 'idle',
        1: 'idle',
        2: 'idle',
    });

    const runTest = async () => {
        // Simulate API authentication test
        setStepStatus(prev => ({ ...prev, 0: 'testing' }));
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStepStatus(prev => ({ ...prev, 0: 'success' }));
        setActiveTestStep(1);

        // Simulate data stream connection test
        setStepStatus(prev => ({ ...prev, 1: 'testing' }));
        await new Promise(resolve => setTimeout(resolve, 3000));
        setStepStatus(prev => ({ ...prev, 1: 'success' }));
        setActiveTestStep(2);

        // Simulate webhook test
        setStepStatus(prev => ({ ...prev, 2: 'testing' }));
        await new Promise(resolve => setTimeout(resolve, 2000));
        setStepStatus(prev => ({ ...prev, 2: 'success' }));

        // Complete the test
        onTestComplete(true);
    };

    const renderStepContent = (step: number) => {
        const status = stepStatus[step];
        return (
            <Box sx={{ minHeight: 80, display: 'flex', alignItems: 'center', gap: 2 }}>
                {status === 'testing' && (
                    <>
                        <CircularProgress size={20} />
                        <Typography>Testing...</Typography>
                    </>
                )}
                {status === 'success' && (
                    <Alert severity="success" sx={{ width: '100%' }}>
                        {step === 0 && 'API authentication successful'}
                        {step === 1 && 'Successfully connected to data streams'}
                        {step === 2 && 'Webhook endpoint verified and test event sent'}
                    </Alert>
                )}
                {status === 'error' && (
                    <Alert severity="error" sx={{ width: '100%' }}>
                        Test failed. Please check your configuration and try again.
                    </Alert>
                )}
            </Box>
        );
    };

    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Integration Test
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
                Test your TradingView integration configuration
            </Typography>

            <Card sx={{ p: 3, mb: 3 }}>
                <Box sx={{ maxWidth: 600 }}>
                    <Stepper activeStep={activeTestStep} orientation="vertical">
                        {testSteps.map((step, index) => (
                            <Step key={step.label}>
                                <StepLabel>
                                    <Typography variant="subtitle2">{step.label}</Typography>
                                </StepLabel>
                                <StepContent>
                                    <Typography color="textSecondary" sx={{ mb: 2 }}>
                                        {step.description}
                                    </Typography>
                                    {renderStepContent(index)}
                                </StepContent>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
            </Card>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button onClick={onBack}>
                    Back
                </Button>
                <Button
                    variant="contained"
                    onClick={runTest}
                    disabled={testStatus === 'testing'}
                >
                    {testStatus === 'testing' ? 'Testing...' : 'Start Test'}
                </Button>
            </Box>
        </Box>
    );
};

export default IntegrationTest; 
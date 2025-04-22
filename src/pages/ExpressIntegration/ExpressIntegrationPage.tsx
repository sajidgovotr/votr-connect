import { useState } from 'react';
import {
    Box,
    Stepper,
    Step,
    StepLabel,
    Button,
    Typography,
    Paper,
    Divider,
    Alert,
} from '@mui/material';
import ProductSelection from '@/components/IntegrationSteps/ProductSelection/ProductSelection';
import IntegrationType from '@/components/IntegrationSteps/IntegrationType/IntegrationType';
import TestIntegration from '@/components/IntegrationSteps/TestIntegration/TestIntegration';
import RestApiIntegrationSteps from '@/components/IntegrationSteps/RestApiIntegration';
import GraphQLIntegrationSteps from '@/components/IntegrationSteps/GraphQLIntegration';
import FileUploadIntegrationSteps from '@/components/IntegrationSteps/FileUploadIntegration';

const steps = ['Select a Product', 'Select an Integration Type', 'Configure Integration', 'Test Integration'];

const ExpressIntegrationPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedIntegrationType, setSelectedIntegrationType] = useState('');
    const [selectedEnvironment, setSelectedEnvironment] = useState('');
    const [integrationStepCompleted, setIntegrationStepCompleted] = useState(false);
    const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setSelectedProduct('');
        setSelectedIntegrationType('');
        setSelectedEnvironment('');
        setIntegrationStepCompleted(false);
        setTestStatus('idle');
    };

    const handleIntegrationTypeSelect = (type: string) => {
        setSelectedIntegrationType(type);
    };

    const handleIntegrationStepComplete = (_type: string, completed: boolean) => {
        setIntegrationStepCompleted(completed);
    };

    const handleTestComplete = (success: boolean) => {
        setTestStatus(success ? 'success' : 'error');
        if (success) {
            handleNext();
        }
    };

    const isStepValid = (step: number) => {
        switch (step) {
            case 0:
                return !!selectedProduct;
            case 1:
                return !!selectedIntegrationType;
            case 2:
                return integrationStepCompleted;
            case 3:
                return testStatus === 'success';
            default:
                return true;
        }
    };

    const renderIntegrationSteps = () => {
        switch (selectedIntegrationType) {
            case 'rest-api':
                return (
                    <RestApiIntegrationSteps
                        selectedProduct={selectedProduct}
                        selectedEnvironment={selectedEnvironment}
                        onStepComplete={(completed: boolean) => handleIntegrationStepComplete('rest-api', completed)}
                    />
                );
            case 'graphql':
                return (
                    <GraphQLIntegrationSteps
                        selectedProduct={selectedProduct}
                        selectedEnvironment={selectedEnvironment}
                        onStepComplete={(completed: boolean) => handleIntegrationStepComplete('graphql', completed)}
                    />
                );
            case 'file-upload':
                return (
                    <FileUploadIntegrationSteps
                        selectedProduct={selectedProduct}
                        selectedEnvironment={selectedEnvironment}
                        onStepComplete={(completed: boolean) => handleIntegrationStepComplete('file-upload', completed)}
                    />
                );
            default:
                return null;
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <ProductSelection
                        selectedProduct={selectedProduct}
                        onProductSelect={setSelectedProduct}
                    />
                );

            case 1:
                return (
                    <IntegrationType
                        selectedType={selectedIntegrationType}
                        onTypeSelect={handleIntegrationTypeSelect}
                        selectedProduct={selectedProduct}
                        onStepComplete={handleIntegrationStepComplete}
                        onNext={handleNext}
                    />
                );

            case 2:
                return renderIntegrationSteps();

            case 3:
                return (
                    <TestIntegration
                        selectedProduct={selectedProduct}
                        integrationType={selectedIntegrationType}
                        selectedEnvironment={selectedEnvironment}
                        onTestComplete={handleTestComplete}
                    />
                );

            default:
                return null;
        }
    };

    return (
        <Box sx={{ width: '100%', p: 3 }}>
            <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Express Integration
                </Typography>
                <Divider sx={{ mb: 3 }} />

                <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
                    {steps.map((label, index) => (
                        <Step sx={{ cursor: 'pointer' }} key={label}>
                            <StepLabel onClick={() => setActiveStep(index)}>{label}</StepLabel>
                        </Step>
                    ))}
                </Stepper>

                {activeStep === steps.length ? (
                    <Box sx={{ mt: 2 }}>
                        <Alert severity="success" sx={{ mb: 2 }}>
                            <Typography variant="body1" color="success.main">
                                Express integration completed successfully!
                            </Typography>
                        </Alert>
                        <Button
                            variant="contained"
                            onClick={handleReset}
                            sx={{ mt: 2 }}
                        >
                            Start New Integration
                        </Button>
                    </Box>
                ) : (
                    <Box>
                        <Box sx={{ mt: 2, mb: 4, minHeight: '200px' }}>
                            {renderStepContent(activeStep)}
                        </Box>
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                            <Button
                                variant="outlined"
                                disabled={activeStep === 0}
                                onClick={handleBack}
                            >
                                Back
                            </Button>
                            {activeStep !== 1 && activeStep !== 3 && (
                                <Button
                                    variant="contained"
                                    onClick={handleNext}
                                    disabled={!isStepValid(activeStep)}
                                >
                                    Next
                                </Button>
                            )}
                        </Box>
                    </Box>
                )}
            </Paper>
        </Box>
    );
};

export default ExpressIntegrationPage; 
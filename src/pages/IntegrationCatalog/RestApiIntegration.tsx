import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router';
import { Box, Container, Typography, Button, Stepper, Step, StepLabel } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';
import {
    BasicInfo,
    Authentication,
    DataSchema,
    Review,
    BasicInfoRef,
    AuthenticationRef,
    DataSchemaRef,
    BasicInfoFormData,
    SchemaFormData
} from '../../components/RestApiSteps';
import useMessage from '@/hooks/useMessage';

const steps = ['Basic Info', 'Authentication', 'Data Schema', 'Review'];

const RestApiIntegration = () => {
    const navigate = useNavigate();
    const [activeStep, setActiveStep] = useState(0);
    const { showSnackbar } = useMessage();
    const basicInfoRef = useRef<BasicInfoRef>(null);
    const authRef = useRef<AuthenticationRef>(null);
    const schemaRef = useRef<DataSchemaRef>(null);
    const [formData, setFormData] = useState({
        basicInfo: null as BasicInfoFormData | null,
        authMethod: 'oauth2',
        dataSchema: null as SchemaFormData | null
    });
    const [nextDisabled, setNextDisabled] = useState(false);

    // Check if the current step is valid
    const isCurrentStepValid = () => {
        switch (activeStep) {
            case 0:
                return basicInfoRef.current?.isValid() || false;
            case 1:
                return authRef.current?.isValid() || false;
            case 2:
                return schemaRef.current?.isValid() || false;
            case 3:
                return true;
            default:
                return true;
        }
    };

    // Update next button state when active step changes
    React.useEffect(() => {

        // Check initial validity
        const checkValidity = () => {
            setNextDisabled(!isCurrentStepValid());
        };

        checkValidity();

        // Set up an interval to periodically check validity
        const intervalId = setInterval(checkValidity, 500);

        return () => clearInterval(intervalId);
    }, [activeStep]);

    const handleNext = () => {
        const lastStep = activeStep === steps.length - 1;

        if (lastStep) {
            showSnackbar(
                "Integration created successfully",
                "You can now use this integration in your workflows",
                "success"
            );
            navigate('/integration-catalog');
        }
        // Store form data before moving to next step
        if (activeStep === 0) {
            setFormData(prev => ({
                ...prev,
                basicInfo: basicInfoRef.current?.getData() || null
            }));
        }

        // Store data schema information
        if (activeStep === 2) {
            setFormData(prev => ({
                ...prev,
                dataSchema: schemaRef.current?.getData() || null
            }));
        }

        setActiveStep((prev) => Math.min(prev + 1, steps.length - 1));
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return <BasicInfo ref={basicInfoRef} />;
            case 1:
                return <Authentication ref={authRef} />;
            case 2:
                return <DataSchema ref={schemaRef} />;
            case 3:
                return <Review
                    basicInfo={formData.basicInfo}
                    authMethod={formData.authMethod}
                    dataSchema={formData.dataSchema}
                />;
            default:
                return <BasicInfo ref={basicInfoRef} />;
        }
    };

    return (
        <Container maxWidth="md">
            <Box sx={{ py: 4 }}>
                <Button
                    variant="text"
                    onClick={() => navigate(-1)}
                    startIcon={<ArrowBack />}
                    sx={{ mb: 3, color: '#1F2937', '&:hover': { color: '#5263FF' } }}
                >
                    Back
                </Button>
                <Typography variant="h4" sx={{ fontWeight: 700, mb: 2 }}>
                    REST API Integration
                </Typography>
                <Box sx={{ mb: 4 }}>
                    <Stepper activeStep={activeStep} alternativeLabel>
                        {steps.map((label) => (
                            <Step key={label}>
                                <StepLabel>{label}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                </Box>
                <Box sx={{ p: 4, borderRadius: 2, border: '1px solid #E5E7EB', bgcolor: '#FFFFFF', boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.05)' }}>
                    {renderStepContent(activeStep)}
                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
                        <Button
                            variant="outlined"
                            sx={{ mr: 2 }}
                            onClick={() => setActiveStep((prev) => Math.max(prev - 1, 0))}
                            disabled={activeStep === 0}
                        >
                            Previous
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleNext}
                            disabled={nextDisabled}
                        >
                            {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Container>
    );
};

export default RestApiIntegration; 
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
    Stack,
} from '@mui/material';
import ProductSelection from '@/components/IntegrationSteps/ProductSelection/ProductSelection';
import IntegrationType from '@/components/IntegrationSteps/IntegrationType/IntegrationType';
import RestApiIntegrationSteps from '@/components/IntegrationSteps/RestApiIntegration';
import GraphQLIntegrationSteps from '@/components/IntegrationSteps/GraphQLIntegration';
import FileUploadIntegrationSteps from '@/components/IntegrationSteps/FileUploadIntegration';

import { useRestApiIntegrationMutation } from '@/services/express-integration';
import useMessage from '@/hooks/useMessage';
import Modal from '@/components/Modal';
import { CustomButton } from '@/components';
import ReviewSection from '@/components/IntegrationSteps/ReviewSection';
import { useFileUploadIntegrationMutation } from '@/services/express-integration';

const steps = ['Select a Product', 'Select an Integration Type', 'Configure Integration', 'Review your integration'];

const ExpressIntegrationPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [selectedIntegrationType, setSelectedIntegrationType] = useState('');
    const [selectedEnvironment, setSelectedEnvironment] = useState('');
    const [integrationStepCompleted, setIntegrationStepCompleted] = useState(false);
    const [integrationData, setIntegrationData] = useState<any>(null);
    const [formData, setFormData] = useState<any>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [restApiIntegrationMutation, { isLoading: isRestApiIntegrationLoading }] = useRestApiIntegrationMutation();
    const [fileUploadIntegrationMutation, { isLoading: isFileUploadIntegrationLoading }] = useFileUploadIntegrationMutation();
    const { showSnackbar } = useMessage();

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
        setIntegrationData(null);
        setFormData(null);
    };

    const handleIntegrationTypeSelect = (type: string) => {
        setSelectedIntegrationType(type);
    };

    const handleIntegrationStepComplete = (_type: string, completed: boolean, data?: any, formValues?: any) => {
        setIntegrationStepCompleted(completed);
        if (data) {
            setIntegrationData(data);
        }
        if (formValues) {
            setFormData(formValues);
        }
    };

    const handleEditFromReview = (item: any) => {
        // Find which section contains this field
        const sectionIndex = integrationData?.findIndex((section: any) =>
            section.fields.some((field: any) => field.name === item.name)
        );

        // Always go to step 2 (Configure Integration) and pass the section to edit
        setFormData((prev: any) => ({
            ...prev,
            activeSection: sectionIndex,
            isEditingFromReview: true
        }));

        setActiveStep(2); // Always go to Configure Integration step
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
                return true;
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
                        onStepComplete={(completed: boolean, data?: any, formValues?: any) =>
                            handleIntegrationStepComplete('rest-api', completed, data, formValues)
                        }
                        initialValues={formData}
                    />
                );
            case 'graphql':
                return (
                    <GraphQLIntegrationSteps
                        selectedProduct={selectedProduct}
                        selectedEnvironment={selectedEnvironment}
                        onStepComplete={(completed: boolean, data?: any) => handleIntegrationStepComplete('graphql', completed, data)}
                    />
                );
            case 'file-upload':
                return (
                    <FileUploadIntegrationSteps
                        selectedProduct={selectedProduct}
                        selectedEnvironment={selectedEnvironment}
                        onStepComplete={(completed: boolean, data?: any, formValues?: any) =>
                            handleIntegrationStepComplete('file-upload', completed, data, formValues)
                        }
                        initialValues={formData}
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
                    <ReviewSection
                        data={integrationData}
                        onEdit={handleEditFromReview}
                    />
                );

            default:
                return null;
        }
    };

    const handleSaveIntegration = async () => {
        try {
            let payload;
            if (selectedIntegrationType === 'rest-api') {
                payload = {
                    name: formData.integrationName,
                    environment: formData.environment,
                    dataFormat: formData.dataFormat,
                    method: formData.method,
                    url: formData.baseURL,
                    authentication: {
                        authenticationType: formData.authMethod,
                        apiKey: formData.apiKey,
                    },
                    schema: {
                        resourceName: formData.dataSchema.schemaName,
                        endpointPath: formData.dataSchema.endpoint,
                        fieldDetails: formData.dataSchema.fields.map((field: any) => ({
                            name: field.name,
                            type: field.type,
                            isRequired: field.required,
                            mapFeildName: field.mapFeildName,
                        })),
                    }
                };
                await restApiIntegrationMutation(payload);
            } else if (selectedIntegrationType === 'file-upload') {
                if (formData.protocol === 'ftp') {
                    if (formData.ftpType === 'ftp') {
                        payload = {
                            name: formData.integrationName,
                            fileFormat: formData.fileFormat.toUpperCase(),
                            fileNamePattern: formData.fileNamePattern,
                            isHeaderRowIncluded: formData.hasHeader,
                            transferFrequency: formData.schedule,
                            timeOfDay: formData.timeOfDay || '',
                            timeZone: formData.timeZone,
                            afterSuccessfulTransferAction: "archive",
                            afterFailedTransferAction: "retry",
                            url: formData.host,
                            ftp: {
                                host: formData.host,
                                port: parseInt(formData.port || ''),
                                type: formData.ftpType,
                                ftpAuthentication: {
                                    type: "password",
                                    username: formData.username,
                                    password: formData.password
                                }
                            }
                        };
                    } else {
                        payload = {
                            name: formData.integrationName,
                            fileFormat: formData.fileFormat.toUpperCase(),
                            fileNamePattern: formData.fileNamePattern,
                            isHeaderRowIncluded: formData.hasHeader,
                            transferFrequency: formData.schedule,
                            timeOfDay: formData.timeOfDay || '',
                            timeZone: formData.timeZone,
                            afterSuccessfulTransferAction: "archive",
                            afterFailedTransferAction: "retry",
                            url: formData.host,
                            ftp: {
                                host: formData.host,
                                port: parseInt(formData.port || ''),
                                type: formData.ftpType,
                                ftpAuthentication: {
                                    type: "sshKey",
                                    username: formData.username,
                                    sshKey: formData.sshKey,
                                    passphrase: formData.passphrase
                                }
                            }
                        };
                    }
                } else {
                    payload = {
                        name: formData.integrationName,
                        fileFormat: formData.fileFormat.toUpperCase(),
                        fileNamePattern: formData.fileNamePattern,
                        isHeaderRowIncluded: formData.hasHeader,
                        transferFrequency: formData.schedule,
                        timeOfDay: formData.timeOfDay || '',
                        timeZone: formData.timeZone,
                        afterSuccessfulTransferAction: "archive",
                        afterFailedTransferAction: "retry",
                        url: `s3://${formData.bucketName}.s3.${formData.region}.amazonaws.com${formData.folderPath || ''}`,
                        amazonS3Details: {
                            region: formData.region,
                            bucketName: formData.bucketName,
                            folderPath: formData.folderPath || '',
                            amazonS3Authentication: {
                                authenticationMethod: "accessKey",
                                ARN: formData.arn,
                                accessKey: formData.accessKey,
                                secretKey: formData.secretKey
                            }
                        }
                    };
                }
                console.log(formData, "dataschema values");
                await fileUploadIntegrationMutation(payload);
            }

            showSnackbar('Success', 'Integration saved successfully', 'success', 10000);
            setShowConfirmationModal(false);
            setActiveStep((prevStep) => prevStep + 1);
        } catch (error) {
            showSnackbar('Error', 'Failed to save integration', 'error', 10000);
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

                            <Button
                                variant="contained"
                                onClick={() => {
                                    if (activeStep === steps.length - 1) {
                                        setShowConfirmationModal(true);
                                    } else {
                                        handleNext();
                                    }
                                }}
                                disabled={!isStepValid(activeStep)}
                            >
                                {activeStep === steps.length - 1 ? 'Save' : 'Next'}
                            </Button>
                        </Box>
                    </Box>
                )}
            </Paper>

            <Modal open={showConfirmationModal} onClose={() => setShowConfirmationModal(false)} maxWidth="sm">
                <Box sx={{ p: 3 }}>
                    <Box sx={{ mb: 3 }}>
                        <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                            Confirm Integration
                        </Typography>
                        {/* <Typography variant="body2" >
                            Please review your integration details carefully. Once confirmed, the integration will be saved.
                        </Typography> */}
                        <Alert severity="info" sx={{ mb: 2 }}>
                            <Typography variant="body1" color="info.main">
                                Please review your integration details carefully. Once confirmed, the integration will be saved.
                            </Typography>
                        </Alert>
                    </Box>
                    <Stack spacing={2} direction="row" justifyContent="flex-end">
                        <CustomButton
                            title="Cancel"
                            size="large"
                            onClick={() => setShowConfirmationModal(false)}
                            sx={{
                                border: "1px solid #E6E6E9",
                                color: "black",
                                '&:hover': {
                                    borderColor: "#9CA3AF",
                                }
                            }}
                            variant="outlined"
                            color="inherit"
                        />
                        <CustomButton
                            size="large"
                            title="Confirm"
                            color="primary"
                            onClick={handleSaveIntegration}
                            loading={isRestApiIntegrationLoading || isFileUploadIntegrationLoading}
                            sx={{
                                color: "#FFFFFF",
                                '&:hover': {
                                    backgroundColor: "#1D4ED8",
                                }
                            }}
                        />
                    </Stack>
                </Box>
            </Modal>
        </Box>
    );
};

export default ExpressIntegrationPage; 
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
import FileUploadIntegrationSteps from '@/components/IntegrationSteps/FileUploadIntegration';
import { useCreateIntegrationWithDetailsMutation, useGetIntegrationMethodsQuery } from '@/services/express-integration';
import useMessage from '@/hooks/useMessage';
import Modal from '@/components/Modal';
import { CustomButton } from '@/components';
import ReviewSection from '@/components/IntegrationSteps/ReviewSection';
import { EnvironmentEnum } from '@/types/environment';
import { storageService } from '@/utils/storage';


const steps = ['Select a Product', 'Select an Integration Type', 'Configure Integration', 'Review your integration'];

const ExpressIntegrationPage = () => {
    const [activeStep, setActiveStep] = useState(0);
    const [selectedProduct, setSelectedProduct] = useState<{ id: string; name: string } | null>(null);
    const [selectedIntegrationType, setSelectedIntegrationType] = useState<string>('');
    const [selectedEnvironment, setSelectedEnvironment] = useState<EnvironmentEnum>(EnvironmentEnum.DEVELOPMENT);
    const [integrationStepCompleted, setIntegrationStepCompleted] = useState(false);
    const [integrationData, setIntegrationData] = useState<any>(null);
    const [formData, setFormData] = useState<any>(null);
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const [createIntegrationWithDetails, { isLoading }] = useCreateIntegrationWithDetailsMutation();
    const { data: methodsResponse } = useGetIntegrationMethodsQuery();
    const { showSnackbar } = useMessage();

    const handleNext = () => {
        setActiveStep((prevStep) => prevStep + 1);
    };

    const handleBack = () => {
        setActiveStep((prevStep) => prevStep - 1);
    };

    const handleReset = () => {
        setActiveStep(0);
        setSelectedProduct(null);
        setSelectedIntegrationType('');
        setSelectedEnvironment(EnvironmentEnum.DEVELOPMENT);
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
            if (formValues.environment) {
                setSelectedEnvironment(formValues.environment);
            }
        }
    };

    const handleEditFromReview = (item: any) => {
        const sectionIndex = integrationData?.findIndex((section: any) =>
            section.fields.some((field: any) => field.name === item.name)
        );

        setFormData((prev: any) => ({
            ...prev,
            activeSection: sectionIndex,
            isEditingFromReview: true
        }));

        setActiveStep(2);
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

    const prepareIntegrationPayload = () => {
        const selectedMethod = methodsResponse?.data.find(method => method.code === selectedIntegrationType);
        const userDetails = storageService.getUserDetails();
        
        if (!selectedMethod || !selectedProduct || !userDetails) {
            throw new Error('Missing required data');
        }

        const basePayload = {
            productId: selectedProduct.id,
            integrationMethodId: selectedMethod.id,
            environment: formData.environment,
            name: formData.integrationName,
            brokerId: userDetails.brokerId,
            createdBy: userDetails.userId,
            configs: [] as any[],
            auths: [] as any[],
        };

        if (selectedIntegrationType === 'rest-api') {
            basePayload.configs = [
                { configKey: 'dataFormat', configValue: formData.dataFormat },
                { configKey: 'method', configValue: formData.method },
                { configKey: 'url', configValue: formData.baseURL },
                { configKey: 'resourceName', configValue: formData.dataSchema.schemaName },
                { configKey: 'endpointPath', configValue: formData.dataSchema.endpoint },
            ];
            basePayload.auths = [
                { authKey: 'authenticationType', authValue: formData.authMethod },
                { authKey: 'apiKey', authValue: formData.apiKey },
            ];
        } else if (selectedIntegrationType === 'file-upload') {
            basePayload.configs = [
                { configKey: 'fileFormat', configValue: formData.fileFormat.toUpperCase() },
                { configKey: 'fileNamePattern', configValue: formData.fileNamePattern },
                { configKey: 'isHeaderRowIncluded', configValue: formData.hasHeader.toString() },
                { configKey: 'transferFrequency', configValue: formData.schedule },
                { configKey: 'timeOfDay', configValue: formData.timeOfDay || '' },
                { configKey: 'timeZone', configValue: formData.timeZone },
            ];

            if (formData.protocol === 'ftp') {
                basePayload.configs.push(
                    { configKey: 'host', configValue: formData.host },
                    { configKey: 'port', configValue: formData.port },
                    { configKey: 'type', configValue: formData.ftpType }
                );
                basePayload.auths = [
                    { authKey: 'type', authValue: formData.ftpType === 'ftp' ? 'password' : 'sshKey' },
                    { authKey: 'username', authValue: formData.username },
                ];
                if (formData.ftpType === 'ftp') {
                    basePayload.auths.push({ authKey: 'password', authValue: formData.password });
                } else {
                    basePayload.auths.push(
                        { authKey: 'sshKey', authValue: formData.sshKey },
                        { authKey: 'passphrase', authValue: formData.passphrase }
                    );
                }
            } else {
                basePayload.configs.push(
                    { configKey: 'region', configValue: formData.region },
                    { configKey: 'bucketName', configValue: formData.bucketName },
                    { configKey: 'folderPath', configValue: formData.folderPath || '' }
                );
                basePayload.auths = [
                    { authKey: 'authenticationMethod', authValue: 'accessKey' },
                    { authKey: 'ARN', authValue: formData.arn },
                    { authKey: 'accessKey', authValue: formData.accessKey },
                    { authKey: 'secretKey', authValue: formData.secretKey },
                ];
            }
        }

        return basePayload;
    };

    const handleSaveIntegration = async () => {
        try {
            const payload = prepareIntegrationPayload();
            await createIntegrationWithDetails(payload).unwrap();
            showSnackbar('Success', 'Integration saved successfully', 'success', 10000);
            setShowConfirmationModal(false);
            setActiveStep((prevStep) => prevStep + 1);
        } catch (error) {
            showSnackbar('Error', 'Failed to save integration', 'error', 10000);
        }
    };

    const renderIntegrationSteps = () => {
        switch (selectedIntegrationType) {
            case 'rest-api':
                return (
                    <RestApiIntegrationSteps
                        selectedProduct={selectedProduct?.id}
                        selectedProductName={selectedProduct?.name}
                        selectedEnvironment={selectedEnvironment}
                        onStepComplete={(completed: boolean, data?: any, formValues?: any) =>
                            handleIntegrationStepComplete('rest-api', completed, data, formValues)
                        }
                        initialValues={formData}
                    />
                );
            case 'file-upload':
                return (
                    <FileUploadIntegrationSteps
                        selectedProduct={selectedProduct?.id}
                        selectedProductName={selectedProduct?.name}
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
                        selectedProduct={selectedProduct?.id}
                        onProductSelect={(product: { id: string; name: string }) => setSelectedProduct(product)}
                    />
                );

            case 1:
                return (
                    <IntegrationType
                        selectedType={selectedIntegrationType}
                        onTypeSelect={handleIntegrationTypeSelect}
                        selectedProduct={selectedProduct?.id}
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
                            loading={isLoading}
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
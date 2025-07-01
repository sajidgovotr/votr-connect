import { useState } from 'react';
import { Box } from '@mui/material';
import SrmHeaderBanner from './SrmHeaderBanner';
import StepBar from './StepBar';
import ApiStepBasicInfo from './ApiStepBasicInfo';
import ApiStepAuthentication from './ApiStepAuthentication';
import ApiStepDataSchema from './ApiStepDataSchema';
import { useParams } from 'react-router';
import ApiStepReview from './ApiStepReview';

const steps = [
    'Basic Info',
    'Authentication',
    'Data Schema',
];

const defaultBasicInfo = {
    integrationName: '',
    baseUrl: '',
    httpMethod: 'GET',
    environment: 'Development',
    dataFormat: 'json',
};

const defaultAuth = {
    authMethod: 'api_key',
    apiKey: '',
    bearerToken: '',
    username: '',
    password: '',
    oauthClientId: '',
    oauthClientSecret: '',
    oauthTokenUrl: '',
};

const defaultSchema = {
    schemaName: 'shareholders',
    fields: [
        { mapping: 'cusip', fieldName: 'CUSIP', type: 'string', required: true },
        { mapping: '', fieldName: '', type: '', required: false },
    ],
};

interface ApiIntegrationStepperProps {
    onBackToMethods?: () => void;
    integrationMethodId?: string | null;
    primaryHeading: string;
    primarySubheading: string;
}

const ApiIntegrationStepper = ({ onBackToMethods, integrationMethodId, primaryHeading, primarySubheading }: ApiIntegrationStepperProps) => {
    const { productId } = useParams();
    const [activeStep, setActiveStep] = useState(0);
    const [basicInfo, setBasicInfo] = useState(defaultBasicInfo);
    const [auth, setAuth] = useState(defaultAuth);
    const [schema, setSchema] = useState(defaultSchema);
    const [showReview, setShowReview] = useState(false);

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep((prev) => prev + 1);
        } else {
            setShowReview(true);
        }
    };
    const handleBack = () => setActiveStep((prev) => prev - 1);
    const handleBackToMethods = () => {
        if (onBackToMethods) onBackToMethods();
    };
    const handleEditStep = (stepIdx: number) => {
        setShowReview(false);
        setActiveStep(stepIdx);
    };

    return (
        <Box maxWidth="md" mx="auto" py={4} width={1}>
            {/* Step Content */}
            {!showReview && (
                <>
                    {/* Header Banner */}
                    <SrmHeaderBanner
                        primaryHeading={primaryHeading}
                        primarySubheading={primarySubheading}
                        secondaryHeading='Automated API Integration'
                        secondarySubheading='VOTR automatically retrieves daily shareholder position data from your API'
                    />
                    {/* Custom Step Bar */}
                    <StepBar steps={steps} activeStep={activeStep} />
                    <Box mt={4}>
                        {activeStep === 0 && <ApiStepBasicInfo value={basicInfo} onChange={setBasicInfo} onNext={handleNext} onBack={handleBackToMethods} />}
                        {activeStep === 1 && (
                            <ApiStepAuthentication
                                value={{ ...auth, baseUrl: basicInfo.baseUrl }}
                                onChange={val => {
                                    const { baseUrl, ...rest } = val;
                                    setAuth(rest);
                                }}
                                onNext={handleNext}
                                onBack={handleBack}
                            />
                        )}
                        {activeStep === 2 && <ApiStepDataSchema value={schema} onChange={setSchema} onNext={handleNext} onBack={handleBack} />}
                    </Box>
                </>
            )}
            {/* Review Content */}
            {showReview && (
                <Box mt={4}>
                    <ApiStepReview
                        basicInfo={basicInfo}
                        auth={auth}
                        schema={schema}
                        integrationMethodId={integrationMethodId}
                        productId={productId}
                        onBack={() => {
                            setShowReview(false);
                            setActiveStep(steps.length - 1);
                        }}
                        onEditStep={handleEditStep}
                        primaryHeading={primaryHeading}
                        primarySubheading={primarySubheading}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ApiIntegrationStepper; 
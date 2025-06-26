import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Box, Button } from '@mui/material';
import Breadcrumbs from '@/components/Breadcrumbs';
import SrmHeaderBanner from './SrmHeaderBanner';
import StepBar from './StepBar';
import ApiStepBasicInfo from './ApiStepBasicInfo';
import ApiStepAuthentication from './ApiStepAuthentication';
import ApiStepDataSchema from './ApiStepDataSchema';
import { Typography, Paper } from '@mui/material';
import EditIcon from '@/assets/svgs/edit-gray-pencil.svg';
import reviewHeaderSvg from '@/assets/svgs/review-header.svg';

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

const ReviewStep = ({ basicInfo, auth, schema, onBack, onEditStep }: any) => {
    const theme = useTheme();
    return (
        <>
            {/* Header Banner */}
            <SrmHeaderBanner heading='Automated API Integration' subheading='VOTR automatically retrieves daily shareholder position data from your API' />
            {/* Step Bar - set activeStep to steps.length to indicate review */}
            <StepBar steps={steps} activeStep={steps.length} />

            <Paper elevation={3} variant='outlined' sx={{ p: 3, borderRadius: 1, position: 'relative' }}>
                {/* Header Section */}
                <Paper elevation={0} sx={{ display: 'flex', alignItems: 'center', bgcolor: '#F0F1FF', p: 3, mb: 3, borderRadius: 1 }}>
                    <Box mr={2}>
                        <img src={reviewHeaderSvg} alt="Review" width={122} height={93} />
                    </Box>
                    <Box>
                        <Typography variant="h4">Review</Typography>
                        <Typography variant="body1" sx={{ color: theme.palette.primary.main }}>
                            Please carefully review all your integration details below. Once you click <b>'Finish'</b>, the integration will be saved.
                        </Typography>
                    </Box>
                </Paper>

                {/* Basic Info Section */}
                <Paper variant="outlined" sx={{ p: 3, mb: 2, borderRadius: 1, position: 'relative' }}>
                    <Typography fontSize={20} fontWeight={500} mb={1}>Basic Info</Typography>
                    <Box component="img" src={EditIcon} alt="Edit" sx={{ position: 'absolute', top: 16, right: 16, width: 35, height: 35, cursor: 'pointer' }} onClick={() => onEditStep && onEditStep(0)} />
                    <Box>
                        <Box display="flex" justifyContent="space-between" py={0.5} sx={{ borderBottom: '1px solid #E6E7E8' }}><span style={{ color: '#888' }}>INTEGRATION NAME</span><span style={{ fontWeight: 500 }}>{basicInfo.integrationName}</span></Box>
                        <Box display="flex" justifyContent="space-between" py={0.5} sx={{ borderBottom: '1px solid #E6E7E8' }}><span style={{ color: '#888' }}>BASE URL</span><span style={{ fontWeight: 500 }}>{basicInfo.baseUrl}</span></Box>
                        <Box display="flex" justifyContent="space-between" py={0.5} sx={{ borderBottom: '1px solid #E6E7E8' }}><span style={{ color: '#888' }}>METHOD</span><span style={{ fontWeight: 500 }}>{basicInfo.httpMethod}</span></Box>
                        <Box display="flex" justifyContent="space-between" py={0.5} sx={{ borderBottom: '1px solid #E6E7E8' }}><span style={{ color: '#888' }}>ENVIRONMENT</span><span style={{ fontWeight: 500 }}>{basicInfo.environment}</span></Box>
                        <Box display="flex" justifyContent="space-between" py={0.5}><span style={{ color: '#888' }}>DATA FORMAT</span><span style={{ fontWeight: 500 }}>{basicInfo.dataFormat?.toUpperCase()}</span></Box>
                    </Box>
                </Paper>

                {/* Authentication Section */}
                <Paper variant="outlined" sx={{ p: 3, mb: 2, borderRadius: 1, position: 'relative' }}>
                    <Typography fontSize={20} fontWeight={500} mb={1}>Authentication</Typography>
                    <Box component="img" src={EditIcon} alt="Edit" sx={{ position: 'absolute', top: 16, right: 16, width: 35, height: 35, cursor: 'pointer' }} onClick={() => onEditStep && onEditStep(1)} />
                    <Box>
                        <Box display="flex" justifyContent="space-between" py={0.5}><span style={{ color: '#888' }}>AUTHENTICATION METHOD</span><span style={{ fontWeight: 500 }}>{auth.authMethod === 'api_key' ? 'API Key' : auth.authMethod}</span></Box>
                        {auth.authMethod === 'api_key' && (
                            <Box display="flex" justifyContent="space-between" py={0.5}><span style={{ color: '#888' }}>API KEY</span><span style={{ fontWeight: 500 }}>{auth.apiKey ? auth.apiKey : '••••••••••••••••••••••••'}</span></Box>
                        )}
                    </Box>
                </Paper>

                {/* Data Schema Section */}
                <Paper variant="outlined" sx={{ p: 3, borderRadius: 1, position: 'relative' }}>
                    <Typography fontSize={20} fontWeight={500} mb={1}>Data Schema Configuration</Typography>
                    <Box component="img" src={EditIcon} alt="Edit" sx={{ position: 'absolute', top: 16, right: 16, width: 35, height: 35, cursor: 'pointer' }} onClick={() => onEditStep && onEditStep(2)} />
                    <Box>
                        <Box display="flex" justifyContent="space-between" py={0.5}><span style={{ color: '#888' }}>SCHEMA NAME</span><span style={{ fontWeight: 500 }}>{schema.schemaName}</span></Box>
                        <Box display="flex" justifyContent="space-between" py={0.5}><span style={{ color: '#888' }}>END POINT</span><span style={{ fontWeight: 500 }}>http://{basicInfo.baseUrl}</span></Box>
                        {schema.fields.filter((f: { mapping: string; fieldName: string }) => f.mapping || f.fieldName).map((f: { fieldName: string; type: string; required: boolean }, i: number) => (
                            <Box display="flex" justifyContent="space-between" py={0.5} key={i}>
                                <span style={{ color: '#888' }}>{`FIELD ${i + 1}`}</span>
                                <span style={{ fontWeight: 500 }}>{f.fieldName} ({f.type?.charAt(0).toUpperCase() + f.type?.slice(1)}, {f.required ? 'Required' : 'Optional'})</span>
                            </Box>
                        ))}
                    </Box>
                </Paper>
            </Paper>

            {/* Buttons */}
            <Box display="flex" justifyContent="space-between" mt={4} gap={2}>
                <Button variant="outlined" sx={{ minWidth: 1 / 2 }} onClick={onBack}>Back</Button>
                <Button variant="contained" sx={{ minWidth: 1 / 2 }}>Finish</Button>
            </Box>
        </>
    );
};

const ApiIntegrationStepper = ({ onBackToMethods }: { onBackToMethods?: () => void }) => {
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
            <Box mb={3}>
                <Breadcrumbs
                    data={[
                        { name: 'Express Integration', url: '/express-integration', active: false },
                        { name: 'Shareholder Relationship Management (SRM)', url: '', active: true },
                    ]}
                />
            </Box>
            {/* Step Content */}
            {!showReview && (
                <>
                    {/* Header Banner */}
                    <SrmHeaderBanner heading='Automated API Integration' subheading='VOTR automatically retrieves daily shareholder position data from your API' />
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
                    <ReviewStep
                        basicInfo={basicInfo}
                        auth={auth}
                        schema={schema}
                        onBack={() => {
                            setShowReview(false);
                            setActiveStep(steps.length - 1);
                        }}
                        onEditStep={handleEditStep}
                    />
                </Box>
            )}
        </Box>
    );
};

export default ApiIntegrationStepper; 
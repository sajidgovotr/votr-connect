import { useTheme } from '@mui/material/styles';
import { Box, Button, Typography, Paper } from '@mui/material';
import SrmHeaderBanner from './SrmHeaderBanner';
import StepBar from './StepBar';
import EditIcon from '@/assets/svgs/edit-gray-pencil.svg';
import reviewHeaderSvg from '@/assets/svgs/review-header.svg';
import { useCreateIntegrationWithDetailsMutation, useUpdateIntegrationWithDetailsMutation } from '@/services/express-integration';
import useMessage from '@/hooks/useMessage';
import { storageService } from '@/utils/storage';
import { EnvironmentEnum } from '@/types/environment';
import { useNavigate } from 'react-router';

const steps = [
    'Basic Info',
    'Authentication',
    'Data Schema',
];

const ApiStepReview = ({ basicInfo, auth, schema, integrationMethodId, productId, onBack, onEditStep, primaryHeading, primarySubheading, editMode, integrationId }: any) => {
    const theme = useTheme();
    const [createIntegrationWithDetails, { isLoading: isCreating }] = useCreateIntegrationWithDetailsMutation();
    const [updateIntegrationWithDetails, { isLoading: isUpdating }] = useUpdateIntegrationWithDetailsMutation();
    const { showSnackbar } = useMessage();
    const navigate = useNavigate();
    const userDetails = storageService.getUserDetails();

    const handleFinish = async () => {
        const payload = {
            productId: productId ?? '',
            brokerId: userDetails?.brokerId ?? '',
            integrationMethodId: integrationMethodId ?? '',
            environment: basicInfo?.environment === 'Development' ? EnvironmentEnum.DEVELOPMENT : basicInfo?.environment === 'Staging' ? EnvironmentEnum.STAGING : EnvironmentEnum.PRODUCTION,
            name: basicInfo?.integrationName,
            createdBy: userDetails?.userId ?? '',
            configs: [
                ...(basicInfo?.baseUrl ? [{ configKey: 'baseUrl', configValue: `https://${basicInfo.baseUrl}` }] : []),
                ...(basicInfo?.httpMethod ? [{ configKey: 'httpMethod', configValue: basicInfo.httpMethod }] : []),
                ...(basicInfo?.dataFormat ? [{ configKey: 'dataFormat', configValue: basicInfo.dataFormat }] : []),
                ...(schema?.schemaName ? [{ configKey: 'schemaName', configValue: schema.schemaName }] : []),
                ...(schema?.endpoint || basicInfo?.baseUrl ? [{ configKey: 'endpoint', configValue: schema?.endpoint || basicInfo?.baseUrl }] : []),
                ...(schema?.fields ? [{ configKey: 'dataFields', configValue: JSON.stringify(schema.fields) }] : []),
            ],
            auths: [
                ...(auth?.authMethod ? [{ authKey: 'authMethod', authValue: auth.authMethod }] : []),
                ...(auth?.apiKey ? [{ authKey: 'apiKey', authValue: auth.apiKey }] : []),
                ...(auth?.bearerToken ? [{ authKey: 'bearerToken', authValue: auth.bearerToken }] : []),
                ...(auth?.username ? [{ authKey: 'username', authValue: auth.username }] : []),
                ...(auth?.password ? [{ authKey: 'password', authValue: auth.password }] : []),
                ...(auth?.oauthClientId ? [{ authKey: 'oauthClientId', authValue: auth.oauthClientId }] : []),
                ...(auth?.oauthClientSecret ? [{ authKey: 'oauthClientSecret', authValue: auth.oauthClientSecret }] : []),
                ...(auth?.oauthTokenUrl ? [{ authKey: 'oauthTokenUrl', authValue: auth.oauthTokenUrl }] : []),
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
            {/* Header Banner */}
            <SrmHeaderBanner
                primaryHeading={primaryHeading}
                primarySubheading={primarySubheading}
                secondaryHeading='Automated API Integration'
                secondarySubheading='VOTR automatically retrieves daily shareholder position data from your API'
            />
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
                <Button variant="contained" sx={{ minWidth: 1 / 2 }} onClick={handleFinish} disabled={isCreating || isUpdating}>Finish</Button>
            </Box>
        </>
    );
};

export default ApiStepReview; 
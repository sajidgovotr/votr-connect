import { Box, Typography, Grid, Chip, Divider, Paper } from "@mui/material";
import Modal from "../index";

interface IntegrationDetailsProps {
    open: boolean;
    onClose: () => void;
    integration: any;
}

const DetailItem = ({ label, value, highlight = false }: { label: string; value: string | object | null; highlight?: boolean }) => {
    if (!value) return null;

    const displayValue = typeof value === 'object'
        ? JSON.stringify(value, null, 2)
        : value;

    return (
        <Box sx={{ height: '100%' }}>
            <Typography variant="subtitle2" sx={{ color: '#6B7280', mb: 0.5 }}>
                {label}
            </Typography>
            <Typography variant="body2" sx={{
                color: highlight ? '#2563EB' : '#1F2937',
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                fontFamily: typeof value === 'object' ? 'monospace' : 'inherit',
                fontWeight: highlight ? 600 : 400,
                backgroundColor: highlight ? '#EFF6FF' : 'transparent',
                p: highlight ? 1 : 0,
                borderRadius: highlight ? 1 : 0,
                minHeight: '24px'
            }}>
                {displayValue}
            </Typography>
        </Box>
    );
};

const SectionTitle = ({ title }: { title: string }) => (
    <Typography
        variant="subtitle1"
        sx={{
            fontWeight: 600,
            color: '#374151',
            mb: 2,
            mt: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1
        }}
    >
        {title}
    </Typography>
);

const IntegrationDetails = ({ open, onClose, integration }: IntegrationDetailsProps) => {
    if (!integration) return null;

    const isRestIntegration = integration.integrationMethod?.code === 'rest-api';
    const getConfigValue = (key: string) => {
        const config = integration.config?.find((c: any) => c.configKey === key);
        return config?.configValue;
    };

    const getAuthValue = (key: string) => {
        const auth = integration.auth?.find((a: any) => a.authKey === key);
        return auth?.authValue;
    };

    return (
        <Modal open={open} onClose={onClose} maxWidth="md">
            <Box sx={{ p: 3 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
                        Integration Details
                    </Typography>
                    <Chip
                        label={integration?.integrationMethod?.code?.toUpperCase()}
                        size="small"
                        sx={{
                            backgroundColor: integration?.integrationMethod?.code?.toLowerCase() === 'file-upload' ? '#DCFCE7' : '#FEE2E2',
                            color: integration?.integrationMethod?.code?.toLowerCase() === 'file-upload' ? '#166534' : '#991B1B',
                            border: `1px solid ${integration?.integrationMethod?.code?.toLowerCase() === 'file-upload' ? '#BBF7D0' : '#FECACA'}`,
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            height: '24px',
                            '& .MuiChip-label': {
                                px: 1
                            }
                        }}
                    />
                </Box>

                <Divider sx={{ mb: 4 }} />

                <Grid container spacing={4}>
                    {/* Basic Information Section */}
                    <Grid item xs={12}>
                        <SectionTitle title="Basic Information" />
                        <Paper elevation={0} sx={{ p: 3, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Name" value={integration.name} highlight />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Product" value={integration.product?.name} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Environment" value={integration.environment} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Integration Method" value={integration.integrationMethod?.methodName} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Company" value={integration.company?.name} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Integration Specific Details */}
                    <Grid item xs={12}>
                        <SectionTitle title={isRestIntegration ? "API Configuration" : "File Configuration"} />
                        <Paper elevation={0} sx={{ p: 3, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                            <Grid container spacing={3}>
                                {isRestIntegration ? (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="URL" value={getConfigValue('url')} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Method" value={getConfigValue('method')} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Data Format" value={getConfigValue('dataFormat')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Resource Name" value={getConfigValue('resourceName')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Endpoint Path" value={getConfigValue('endpointPath')} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <Divider sx={{ my: 2 }} />
                                            <SectionTitle title="Authentication" />
                                            <Grid container spacing={3}>
                                                <Grid item xs={12} md={6}>
                                                    <DetailItem label="Authentication Type" value={getAuthValue('authenticationType')} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <DetailItem label="API Key" value={getAuthValue('apiKey')} highlight />
                                                </Grid>
                                            </Grid>
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="File Format" value={getConfigValue('fileFormat')} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="File Name Pattern" value={getConfigValue('fileNamePattern')} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Transfer Frequency" value={getConfigValue('transferFrequency')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Time of Day" value={getConfigValue('timeOfDay')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Time Zone" value={getConfigValue('timeZone')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Header Row Included" value={getConfigValue('isHeaderRowIncluded')} />
                                        </Grid>
                                        {getConfigValue('type') === 'ftp' ? (
                                            <>
                                                <Grid item xs={12} md={6}>
                                                    <DetailItem label="Host" value={getConfigValue('host')} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <DetailItem label="Port" value={getConfigValue('port')} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider sx={{ my: 2 }} />
                                                    <SectionTitle title="FTP Authentication" />
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} md={6}>
                                                            <DetailItem label="Username" value={getAuthValue('username')} />
                                                        </Grid>
                                                        {getAuthValue('type') === 'password' ? (
                                                            <Grid item xs={12} md={6}>
                                                                <DetailItem label="Password" value={getAuthValue('password')} highlight />
                                                            </Grid>
                                                        ) : (
                                                            <>
                                                                <Grid item xs={12} md={6}>
                                                                    <DetailItem label="SSH Key" value={getAuthValue('sshKey')} highlight />
                                                                </Grid>
                                                                <Grid item xs={12} md={6}>
                                                                    <DetailItem label="Passphrase" value={getAuthValue('passphrase')} highlight />
                                                                </Grid>
                                                            </>
                                                        )}
                                                    </Grid>
                                                </Grid>
                                            </>
                                        ) : (
                                            <>
                                                <Grid item xs={12} md={6}>
                                                    <DetailItem label="Region" value={getConfigValue('region')} />
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <DetailItem label="Bucket Name" value={getConfigValue('bucketName')} />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <Divider sx={{ my: 2 }} />
                                                    <SectionTitle title="S3 Authentication" />
                                                    <Grid container spacing={3}>
                                                        <Grid item xs={12} md={6}>
                                                            <DetailItem label="ARN" value={getAuthValue('ARN')} />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <DetailItem label="Access Key" value={getAuthValue('accessKey')} highlight />
                                                        </Grid>
                                                        <Grid item xs={12} md={6}>
                                                            <DetailItem label="Secret Key" value={getAuthValue('secretKey')} highlight />
                                                        </Grid>
                                                    </Grid>
                                                </Grid>
                                            </>
                                        )}
                                    </>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Metadata Section */}
                    <Grid item xs={12}>
                        <SectionTitle title="Metadata" />
                        <Paper elevation={0} sx={{ p: 3, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Created At" value={new Date(integration.createdAt).toLocaleString()} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Updated At" value={new Date(integration.updatedAt).toLocaleString()} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default IntegrationDetails; 
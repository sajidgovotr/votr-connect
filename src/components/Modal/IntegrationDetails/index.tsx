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

const DataFieldsTable = ({ fields }: { fields: any[] }) => (
    <Box sx={{ mt: 2, mb: 1 }}>
        <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 1, overflow: 'hidden', fontSize: 14 }}>
            <Box component="thead" sx={{ background: '#F3F4F6' }}>
                <Box component="tr">
                    <Box component="th" sx={{ p: 1, textAlign: 'left', fontWeight: 600 }}>Mapping</Box>
                    <Box component="th" sx={{ p: 1, textAlign: 'left', fontWeight: 600 }}>Field Name</Box>
                    <Box component="th" sx={{ p: 1, textAlign: 'left', fontWeight: 600 }}>Type</Box>
                    <Box component="th" sx={{ p: 1, textAlign: 'left', fontWeight: 600 }}>Required</Box>
                </Box>
            </Box>
            <Box component="tbody">
                {fields.map((f, idx) => (
                    <Box component="tr" key={idx} sx={{ borderBottom: '1px solid #E5E7EB' }}>
                        <Box component="td" sx={{ p: 1 }}>{f.mapping}</Box>
                        <Box component="td" sx={{ p: 1 }}>{f.fieldName}</Box>
                        <Box component="td" sx={{ p: 1 }}>{f.type}</Box>
                        <Box component="td" sx={{ p: 1 }}>{f.required ? 'Yes' : 'No'}</Box>
                    </Box>
                ))}
            </Box>
        </Box>
    </Box>
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
                                {isRestIntegration && (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Base URL" value={getConfigValue('baseUrl')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="HTTP Method" value={getConfigValue('httpMethod')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Data Format" value={getConfigValue('dataFormat')} />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Integration Specific Details */}
                    {isRestIntegration && (
                        <>
                            <Grid item xs={12}>
                                <SectionTitle title="Authentication" />
                                <Paper elevation={0} sx={{ p: 3, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Authentication Method" value={getAuthValue('authMethod')} />
                                        </Grid>
                                        {getAuthValue('apiKey') && (
                                            <Grid item xs={12} md={6}>
                                                <DetailItem label="API Key" value={getAuthValue('apiKey')} highlight />
                                            </Grid>
                                        )}
                                        {getAuthValue('bearerToken') && (
                                            <Grid item xs={12} md={6}>
                                                <DetailItem label="Bearer Token" value={getAuthValue('bearerToken')} />
                                            </Grid>
                                        )}
                                        {getAuthValue('username') && (
                                            <Grid item xs={12} md={6}>
                                                <DetailItem label="Username" value={getAuthValue('username')} />
                                            </Grid>
                                        )}
                                        {getAuthValue('password') && (
                                            <Grid item xs={12} md={6}>
                                                <DetailItem label="Password" value={getAuthValue('password')} />
                                            </Grid>
                                        )}
                                        {getAuthValue('oauthClientId') && (
                                            <Grid item xs={12} md={6}>
                                                <DetailItem label="OAuth Client ID" value={getAuthValue('oauthClientId')} />
                                            </Grid>
                                        )}
                                        {getAuthValue('oauthClientSecret') && (
                                            <Grid item xs={12} md={6}>
                                                <DetailItem label="OAuth Client Secret" value={getAuthValue('oauthClientSecret')} />
                                            </Grid>
                                        )}
                                        {getAuthValue('oauthTokenUrl') && (
                                            <Grid item xs={12} md={6}>
                                                <DetailItem label="OAuth Token URL" value={getAuthValue('oauthTokenUrl')} />
                                            </Grid>
                                        )}
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <SectionTitle title="Data Schema Configuration" />
                                <Paper elevation={0} sx={{ p: 3, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                                    <Grid container spacing={3}>
                                        {(getConfigValue('schemaName') || getConfigValue('endpoint')) && (
                                            <>
                                                {getConfigValue('schemaName') && (
                                                    <Grid item xs={12} md={6}>
                                                        <DetailItem label="Schema Name" value={getConfigValue('schemaName')} />
                                                    </Grid>
                                                )}
                                                {getConfigValue('endpoint') && (
                                                    <Grid item xs={12} md={6}>
                                                        <DetailItem label="End Point" value={getConfigValue('endpoint')} />
                                                    </Grid>
                                                )}
                                            </>
                                        )}
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <SectionTitle title="Data Fields" />
                                <Paper elevation={0} sx={{ p: 3, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                                    {getConfigValue('dataFields') && (() => {
                                        const fields = JSON.parse(getConfigValue('dataFields'));
                                        if (Array.isArray(fields) && fields.length > 0 && typeof fields[0] === 'object') {
                                            return <Grid item xs={12}><DataFieldsTable fields={fields} /></Grid>;
                                        }
                                        return <Grid item xs={12}><DetailItem label="Data Fields" value={fields} /></Grid>;
                                    })()}
                                </Paper>
                            </Grid>
                        </>
                    )}
                    {!isRestIntegration && (
                        <>
                            <Grid item xs={12}>
                                <SectionTitle title="File Configuration" />
                                <Paper elevation={0} sx={{ p: 3, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="File Type" value={getConfigValue('fileType')} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="File Name Pattern" value={getConfigValue('fileNamePattern')} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Max File Size" value={(() => {
                                                const size = getConfigValue('maxFileSize');
                                                const unit = getConfigValue('fileSizeUnit');
                                                return size ? `${size} ${unit || ''}`.trim() : null;
                                            })()} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="File Contains Header Row" value={getConfigValue('hasHeader') === 'true' ? 'Yes' : 'No'} />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <SectionTitle title="Data Fields" />
                                <Paper elevation={0} sx={{ p: 3, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                                    <Grid container spacing={3}>
                                        {getConfigValue('dataFields') && (() => {
                                            const fields = JSON.parse(getConfigValue('dataFields'));
                                            if (Array.isArray(fields) && fields.length > 0 && typeof fields[0] === 'object') {
                                                return <Grid item xs={12}><DataFieldsTable fields={fields} /></Grid>;
                                            }
                                            return <Grid item xs={12}><DetailItem label="Data Fields" value={fields} /></Grid>;
                                        })()}
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <SectionTitle title="Transfer Settings" />
                                <Paper elevation={0} sx={{ p: 3, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Transfer Protocol" value={getConfigValue('protocol')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Transfer Type" value={getConfigValue('type')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Host" value={getConfigValue('host')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Port" value={getConfigValue('port')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Schedule" value={getConfigValue('schedule')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Time of Day" value={getConfigValue('timeOfDay')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Time Zone" value={getConfigValue('timeZone')} />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                            <Grid item xs={12}>
                                <SectionTitle title="Authentication" />
                                <Paper elevation={0} sx={{ p: 3, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Username" value={getAuthValue('username')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="SSH Key" value={getAuthValue('sshKey')} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Passphrase" value={getAuthValue('passphrase')} />
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </>
                    )}

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
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
        <Box sx={{ mb: 2 }}>
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
                borderRadius: highlight ? 1 : 0
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

    const isRestIntegration = integration.integrationType === 'rest';
    // const environmentColors = getEnvironmentColor(integration.environment);

    return (
        <Modal open={open} onClose={onClose} maxWidth="md">
            <Box sx={{ p: 2 }}>
                <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, color: '#1F2937' }}>
                        Integration Details
                    </Typography>
                    <Chip
                        label={integration.integrationType.toUpperCase()}
                        size="small"
                        sx={{
                            backgroundColor: integration.integrationType.toLowerCase() === 'file' ? '#DCFCE7' : '#FEE2E2',
                            color: integration.integrationType.toLowerCase() === 'file' ? '#166534' : '#991B1B',
                            border: `1px solid ${integration.integrationType.toLowerCase() === 'file' ? '#BBF7D0' : '#FECACA'}`,
                            fontWeight: 500,
                            fontSize: '0.75rem',
                            height: '24px',
                            '& .MuiChip-label': {
                                px: 1
                            }
                        }}
                    />
                </Box>

                <Divider sx={{ mb: 3 }} />

                <Grid container spacing={3}>
                    {/* Basic Information Section */}
                    <Grid item xs={12}>
                        <SectionTitle title="Basic Information" />
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    <DetailItem label="Name" value={integration.name} highlight />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Environment" value={integration.environment} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Status" value={integration.status} />
                                </Grid>
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Integration Specific Details */}
                    <Grid item xs={12}>
                        <SectionTitle title={isRestIntegration ? "API Configuration" : "File Configuration"} />
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                            <Grid container spacing={2}>
                                {isRestIntegration ? (
                                    <>
                                        <Grid item xs={12}>
                                            <DetailItem label="URL" value={integration.url} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Method" value={integration.method} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Data Format" value={integration.dataFormat} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Update Frequency" value={integration.updateFrequency} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Advanced Options" value={integration.advanceOptions} />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <DetailItem label="Body" value={integration.body} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Query Parameters" value={integration.queryParams} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Headers" value={integration.headersParams} />
                                        </Grid>
                                    </>
                                ) : (
                                    <>
                                        <Grid item xs={12}>
                                            <DetailItem label="URL" value={integration.url} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="File Format" value={integration.fileFormat} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="File Name Pattern" value={integration.fileNamePattern} highlight />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Transfer Frequency" value={integration.transferFrequency} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Time of Day" value={integration.timeOfDay} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Time Zone" value={integration.timeZone} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Header Row Included" value={integration.isHeaderRowIncluded ? 'Yes' : 'No'} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="After Successful Transfer" value={integration.afterSuccessfulTransferAction} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="After Failed Transfer" value={integration.afterFailedTransferAction} />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>

                    {/* Metadata Section */}
                    <Grid item xs={12}>
                        <SectionTitle title="Metadata" />
                        <Paper elevation={0} sx={{ p: 2, backgroundColor: '#F9FAFB', borderRadius: 2 }}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Created At" value={new Date(integration.createdAt).toLocaleString()} />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <DetailItem label="Updated At" value={new Date(integration.updatedAt).toLocaleString()} />
                                </Grid>
                                {isRestIntegration && (
                                    <>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Authentication ID" value={integration.authenticationId} />
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <DetailItem label="Production Checklist ID" value={integration.productionChecklistId} />
                                        </Grid>
                                    </>
                                )}
                            </Grid>
                        </Paper>
                    </Grid>
                </Grid>
            </Box>
        </Modal>
    );
};

export default IntegrationDetails; 
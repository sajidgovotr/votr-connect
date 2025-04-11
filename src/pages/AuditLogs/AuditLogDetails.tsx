import React, { useState } from 'react';
import { Box, Typography, Stack, Tabs, Tab, Paper } from '@mui/material';
import { PageHeader, CustomButton } from '@/components';
import { useNavigate } from 'react-router';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

interface DetailRowProps {
    label: string;
    value: string;
    isError?: boolean;
}

const DetailRow = ({ label, value, isError }: DetailRowProps) => (
    <Box sx={{ py: 2, borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
        <Typography variant="body1" color="text.secondary" gutterBottom>
            {label}:
        </Typography>
        <Typography
            variant="body1"
            color={isError ? 'error' : 'text.primary'}
            sx={{ wordBreak: 'break-all' }}
        >
            {value}
        </Typography>
    </Box>
);

const AuditLogDetails = () => {
    const navigate = useNavigate();
    const [tabValue, setTabValue] = useState(0);

    const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
        setTabValue(newValue);
    };

    return (
        <Box sx={{ height: '100%', overflow: 'auto' }}>
            <PageHeader
                title="Audit Log Details"
                rightNode={
                    <CustomButton
                        variant="outlined"
                        onClick={() => navigate('/audit-logs')}
                    >
                        Back
                    </CustomButton>
                }
            />

            <Box sx={{ p: 3 }}>
                <Paper sx={{ mb: 3, p: 2 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="center">
                        <Typography variant="h6">Log ID: LOG-85389</Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                bgcolor: 'error.main',
                                color: 'white',
                                px: 2,
                                py: 0.5,
                                borderRadius: 1
                            }}
                        >
                            ERROR
                        </Typography>
                    </Stack>
                </Paper>

                <Paper sx={{ mb: 3 }}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs value={tabValue} onChange={handleTabChange}>
                            <Tab label="Request" />
                            <Tab label="Response" />
                        </Tabs>
                    </Box>

                    <Box sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            API Access Revoked
                        </Typography>
                        <Typography variant="subtitle1" color="text.secondary" gutterBottom>
                            Apr 8, 2025 11:25:03 GMT
                        </Typography>

                        <Box sx={{ mt: 3 }}>
                            <DetailRow
                                label="Actor"
                                value="Integration Admin (admin@yourplatform.com)"
                            />
                            <DetailRow
                                label="IP Address"
                                value="182.34.56.78"
                            />
                            <DetailRow
                                label="Location"
                                value="Unknown (potential VPN)"
                                isError
                            />
                            <DetailRow
                                label="Client"
                                value="Securo Financial (securo-fin-67890)"
                            />
                            <DetailRow
                                label="Method"
                                value="DELETE"
                                isError
                            />
                            <DetailRow
                                label="Endpoint"
                                value="/api/v1/clients/securo-financial/access"
                            />
                            <DetailRow
                                label="Status Code"
                                value="200 OK"
                            />
                            <DetailRow
                                label="User Agent"
                                value="Chrome 120.0 / Windows"
                            />
                        </Box>
                    </Box>

                    <TabPanel value={tabValue} index={0}>
                        <Box sx={{
                            bgcolor: '#f5f5f5',
                            p: 2,
                            borderRadius: 1,
                            fontFamily: 'monospace'
                        }}>
                            {`{
  "reason": "security_policy_violation",
  "permanent": true
}`}
                        </Box>
                    </TabPanel>

                    <TabPanel value={tabValue} index={1}>
                        <Box sx={{
                            bgcolor: '#f5f5f5',
                            p: 2,
                            borderRadius: 1,
                            fontFamily: 'monospace'
                        }}>
                            {/* Add response data here */}
                        </Box>
                    </TabPanel>
                </Paper>

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
                    <CustomButton
                        variant="outlined"
                        onClick={() => console.log('Raw JSON clicked')}
                        title='Raw JSON'
                    />
                    <CustomButton
                        variant="contained"
                        color="error"
                        onClick={() => console.log('Flag clicked')}
                        title='Flag'
                    />

                    <CustomButton
                        variant="contained"
                        onClick={() => console.log('Export clicked')}
                        title='Export'
                    />

                </Box>
            </Box>
        </Box>
    );
};

export default AuditLogDetails; 
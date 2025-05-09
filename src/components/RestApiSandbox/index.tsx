import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useForm, FormProvider } from 'react-hook-form';
import TabPanel from './components/TabPanel';
import ConfigurationTab from './components/ConfigurationTab';
import TestValidateTab from './components/TestValidateTab';
import LogsTab from './components/LogsTab';
import SampleDataTab from './components/SampleDataTab';
import { sampleDataSets } from '@/constants/static';
import { callEndpoint, FormValues } from '@/services/apiService';

const RestApiSandbox = () => {
    // Form state
    const methods = useForm<FormValues>({
        defaultValues: {
            baseUrl: 'https://fakestoreapi.com',
            authType: 'API Key',
            apiKey: '',
            endpoint: '/products',
            method: 'GET',
            parameters: [
                { name: 'limit', value: '100' },
            ],
            requestBody: '{\n    \n}',
            formData: []
        }
    });

    // UI state
    const [activeTab, setActiveTab] = useState(0);
    const [responseStatus, setResponseStatus] = useState('Status: 200 OK');
    const [responseTime, setResponseTime] = useState('Time: 245ms');
    const [responseBody, setResponseBody] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(false);

    // Logs state
    const [filterValue, setFilterValue] = useState('All');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalLogs] = useState(28);

    // Sample Data state
    const [searchQuery, setSearchQuery] = useState('');

    const mockLogs = [
        { id: 'log_1', timestamp: 'Apr 8, 2025 10:45:12ET', method: 'GET', endpoint: '/shareholders', status: 200, duration: '245ms' },
        { id: 'log_2', timestamp: 'Apr 8, 2025 10:44:37POST', method: 'POST', endpoint: '/auth/token', status: 200, duration: '312ms' },
        { id: 'log_3', timestamp: 'Apr 8, 2025 10:40:23ET', method: 'GET', endpoint: '/shareholders/123', status: 404, duration: '98ms' },
        { id: 'log_4', timestamp: 'Apr 8, 2025 10:38:57ET', method: 'GET', endpoint: '/shareholders?limit=50', status: 200, duration: '267ms' },
        { id: 'log_5', timestamp: 'Apr 8, 2025 10:35:14POST', method: 'POST', endpoint: '/auth/token', status: 401, duration: '156ms' },
    ];

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleSave = methods.handleSubmit(() => {
        setActiveTab(1);
    });

    const handleExecute = methods.handleSubmit(async (data) => {
        try {
            setIsLoading(true);
            const response = await callEndpoint(data);
            setResponseStatus(`Status: ${response.status} ${response.status === 200 ? 'OK' : 'Error'}`);
            setResponseTime(`Time: ${Math.round(response.timeTaken)}ms`);
            setResponseBody(response.body);

            // Add to logs
            const newLog = {
                id: `log_${Date.now()}`,
                timestamp: new Date().toLocaleString(),
                method: response.method,
                endpoint: data.endpoint,
                status: response.status,
                duration: `${Math.round(response.timeTaken)}ms`
            };
            mockLogs.unshift(newLog);
        } catch (error) {
            console.error('Error executing request:', error);
            setResponseStatus('Status: Error');
            setResponseTime('Time: 0ms');
            setResponseBody({ error: 'Failed to execute request' });
        } finally {
            setIsLoading(false);
        }
    });

    const handleViewDetails = () => {
        console.log('Viewing log details...');
    };

    const handleDownloadLogs = () => {
        console.log('Downloading logs...');
    };

    return (
        <FormProvider {...methods}>
            <Box className="p-6">
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: '1.75rem',
                        fontWeight: 600,
                        color: '#111827',
                        mb: 1
                    }}
                >
                    REST API Sandbox
                </Typography>
                <Typography
                    sx={{
                        fontSize: '1rem',
                        color: '#6B7280',
                        mb: 4
                    }}
                >
                    Use sample data for testing your integration.
                </Typography>

                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs
                        value={activeTab}
                        onChange={handleTabChange}
                        sx={{
                            '& .MuiTab-root': {
                                textTransform: 'none',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                color: '#6B7280',
                                '&.Mui-selected': {
                                    color: '#3B82F6',
                                }
                            },
                            '& .MuiTabs-indicator': {
                                backgroundColor: '#3B82F6',
                            }
                        }}
                    >
                        <Tab label="Configuration" />
                        <Tab label="Test & Validate" />
                        <Tab label="Logs" />
                        <Tab label="Sample Data" />
                    </Tabs>
                </Box>

                <TabPanel value={activeTab} index={0}>
                    <ConfigurationTab onSave={handleSave} />
                </TabPanel>

                <TabPanel value={activeTab} index={1}>
                    <TestValidateTab
                        responseStatus={responseStatus}
                        responseTime={responseTime}
                        responseBody={responseBody}
                        onExecute={handleExecute}
                        isLoading={isLoading}
                    />
                </TabPanel>

                <TabPanel value={activeTab} index={2}>
                    <LogsTab
                        logs={mockLogs}
                        filterValue={filterValue}
                        setFilterValue={setFilterValue}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        totalLogs={totalLogs}
                        onViewDetails={handleViewDetails}
                        onDownloadLogs={handleDownloadLogs}
                    />
                </TabPanel>

                <TabPanel value={activeTab} index={3}>
                    <SampleDataTab
                        searchQuery={searchQuery}
                        setSearchQuery={setSearchQuery}
                        dataSets={sampleDataSets}
                    />
                </TabPanel>
            </Box>
        </FormProvider>
    );
};

export default RestApiSandbox; 
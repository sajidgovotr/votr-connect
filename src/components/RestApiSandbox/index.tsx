import { useState } from 'react';
import { Box, Tab, Tabs, Typography } from "@mui/material";
import TabPanel from './components/TabPanel';
import ConfigurationTab from './components/ConfigurationTab';
import TestValidateTab from './components/TestValidateTab';
import LogsTab from './components/LogsTab';
import SampleDataTab from './components/SampleDataTab';

interface RequestParameter {
    name: string;
    value: string;
}

const RestApiSandbox = () => {
    // Configuration state
    const [activeTab, setActiveTab] = useState(0);
    const [baseUrl, setBaseUrl] = useState('https://api.sandbox.yourplatform.com/v1');
    const [authType, setAuthType] = useState('OAuth 2.0');
    const [grantType, setGrantType] = useState('Client Credentials');
    const [clientId, setClientId] = useState('sandbox_client_123456');
    const [clientSecret, setClientSecret] = useState('');
    const [tokenUrl, setTokenUrl] = useState('https://auth.sandbox.yourplatform.com/oauth/token');

    // Test & Validate state
    const [endpoint, setEndpoint] = useState('/shareholders');
    const [method, setMethod] = useState('GET');
    const [parameters, setParameters] = useState<RequestParameter[]>([
        { name: 'limit', value: '100' },
        { name: 'startDate', value: '2025-01-01' }
    ]);
    const [responseStatus] = useState('Status: 200 OK');
    const [responseTime] = useState('Time: 245ms');

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

    const sampleDataSets = [
        {
            title: 'Shareholders',
            color: '#3B82F6',
            features: [
                '1,000 sample records',
                'Includes positions & account data',
                'Updated weekly'
            ]
        },
        {
            title: 'Broker Accounts',
            color: '#9333EA',
            features: [
                '500 sample records',
                'Multiple account types',
                'Includes regulatory data'
            ]
        },
        {
            title: 'Transactions',
            color: '#F97316',
            features: [
                '2,500 sample records',
                'Various transaction types',
                '6 months of history'
            ]
        },
        {
            title: 'Positions',
            color: '#22C55E',
            features: [
                '1,500 sample records',
                'Diverse security types',
                'Includes pricing data'
            ]
        }
    ];

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleSave = () => {
        console.log('Saving configuration...');
    };

    const handleExecute = () => {
        console.log('Executing API request...');
    };

    const handleViewDetails = () => {
        console.log('Viewing log details...');
    };

    const handleDownloadLogs = () => {
        console.log('Downloading logs...');
    };

    return (
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
                <ConfigurationTab
                    baseUrl={baseUrl}
                    setBaseUrl={setBaseUrl}
                    authType={authType}
                    setAuthType={setAuthType}
                    grantType={grantType}
                    setGrantType={setGrantType}
                    clientId={clientId}
                    setClientId={setClientId}
                    clientSecret={clientSecret}
                    setClientSecret={setClientSecret}
                    tokenUrl={tokenUrl}
                    setTokenUrl={setTokenUrl}
                    onSave={handleSave}
                />
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
                <TestValidateTab
                    endpoint={endpoint}
                    setEndpoint={setEndpoint}
                    method={method}
                    setMethod={setMethod}
                    parameters={parameters}
                    setParameters={setParameters}
                    responseStatus={responseStatus}
                    responseTime={responseTime}
                    onExecute={handleExecute}
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
    );
};

export default RestApiSandbox; 
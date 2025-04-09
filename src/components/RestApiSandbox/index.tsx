import { useState } from 'react';
import { Box, Button, Tab, Tabs, TextField, Typography, MenuItem, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

interface RequestParameter {
    name: string;
    value: string;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`sandbox-tabpanel-${index}`}
            aria-labelledby={`sandbox-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ py: 3 }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

const RestApiSandbox = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [authType, setAuthType] = useState('OAuth 2.0');
    const [grantType, setGrantType] = useState('Client Credentials');
    const [baseUrl, setBaseUrl] = useState('https://api.sandbox.yourplatform.com/v1');
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
    // const logsPerPage = 5;

    // Sample Data state
    const [searchQuery, setSearchQuery] = useState('');

    const mockLogs = [
        { timestamp: 'Apr 8, 2025 10:45:12ET', method: 'GET', endpoint: '/shareholders', status: 200, duration: '245ms' },
        { timestamp: 'Apr 8, 2025 10:44:37POST', method: 'POST', endpoint: '/auth/token', status: 200, duration: '312ms' },
        { timestamp: 'Apr 8, 2025 10:40:23ET', method: 'GET', endpoint: '/shareholders/123', status: 404, duration: '98ms' },
        { timestamp: 'Apr 8, 2025 10:38:57ET', method: 'GET', endpoint: '/shareholders?limit=50', status: 200, duration: '267ms' },
        { timestamp: 'Apr 8, 2025 10:35:14POST', method: 'POST', endpoint: '/auth/token', status: 401, duration: '156ms' },
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

    const handleAddParameter = () => {
        setParameters([...parameters, { name: '', value: '' }]);
    };

    const handleRemoveParameter = (index: number) => {
        setParameters(parameters.filter((_, i) => i !== index));
    };

    const handleParameterChange = (index: number, field: 'name' | 'value', value: string) => {
        const newParameters = [...parameters];
        newParameters[index][field] = value;
        setParameters(newParameters);
    };

    const handleExecute = () => {
        console.log('Executing API request...');
        // Add API request logic here
    };

    const handleViewDetails = () => {
        console.log('Viewing log details...');
    };

    const handleDownloadLogs = () => {
        console.log('Downloading logs...');
    };

    const getStatusColor = (status: number) => {
        if (status === 200) return '#22C55E';
        if (status === 401) return '#F59E0B';
        return '#EF4444';
    };

    const getStatusBgColor = (status: number) => {
        if (status === 200) return '#ECFDF5';
        if (status === 401) return '#FEF3C7';
        return '#FEE2E2';
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
                <Box sx={{
                    bgcolor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    p: 4
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: '#111827',
                            mb: 4
                        }}
                    >
                        Endpoint Configuration
                    </Typography>

                    <Box sx={{ mb: 4 }}>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                color: '#374151',
                                mb: 1
                            }}
                        >
                            Base URL
                        </Typography>
                        <TextField
                            fullWidth
                            value={baseUrl}
                            onChange={(e) => setBaseUrl(e.target.value)}
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#D1D5DB',
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: '#111827',
                            mb: 3
                        }}
                    >
                        Authentication
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 3, mb: 3 }}>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#374151',
                                    mb: 1
                                }}
                            >
                                Authentication Type
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                value={authType}
                                onChange={(e) => setAuthType(e.target.value)}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#D1D5DB',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="OAuth 2.0">OAuth 2.0</MenuItem>
                                <MenuItem value="API Key">API Key</MenuItem>
                            </TextField>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#374151',
                                    mb: 1
                                }}
                            >
                                Grant Type
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                value={grantType}
                                onChange={(e) => setGrantType(e.target.value)}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#D1D5DB',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="Client Credentials">Client Credentials</MenuItem>
                                <MenuItem value="Authorization Code">Authorization Code</MenuItem>
                            </TextField>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#374151',
                                    mb: 1
                                }}
                            >
                                Client ID
                            </Typography>
                            <TextField
                                fullWidth
                                value={clientId}
                                onChange={(e) => setClientId(e.target.value)}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#D1D5DB',
                                        },
                                    },
                                }}
                            />
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#374151',
                                    mb: 1
                                }}
                            >
                                Client Secret
                            </Typography>
                            <TextField
                                fullWidth
                                type="password"
                                value={clientSecret}
                                onChange={(e) => setClientSecret(e.target.value)}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#D1D5DB',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>

                    <Box sx={{ mb: 3 }}>
                        <Typography
                            sx={{
                                fontSize: '0.875rem',
                                color: '#374151',
                                mb: 1
                            }}
                        >
                            Token URL
                        </Typography>
                        <TextField
                            fullWidth
                            value={tokenUrl}
                            onChange={(e) => setTokenUrl(e.target.value)}
                            size="small"
                            sx={{
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#D1D5DB',
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={handleSave}
                            sx={{
                                bgcolor: '#3B82F6',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#2563EB',
                                },
                                px: 4
                            }}
                        >
                            Save
                        </Button>
                    </Box>
                </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
                <Box sx={{
                    bgcolor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    p: 4
                }}>
                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1.25rem',
                            fontWeight: 600,
                            color: '#111827',
                            mb: 4
                        }}
                    >
                        Test API Endpoint
                    </Typography>

                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 2, mb: 4 }}>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#374151',
                                    mb: 1
                                }}
                            >
                                Endpoint
                            </Typography>
                            <TextField
                                fullWidth
                                value={endpoint}
                                onChange={(e) => setEndpoint(e.target.value)}
                                size="small"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#D1D5DB',
                                        },
                                    },
                                }}
                            />
                        </Box>
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#374151',
                                    mb: 1
                                }}
                            >
                                Method
                            </Typography>
                            <TextField
                                select
                                value={method}
                                onChange={(e) => setMethod(e.target.value)}
                                size="small"
                                sx={{
                                    minWidth: 120,
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: '#D1D5DB',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="GET">GET</MenuItem>
                                <MenuItem value="POST">POST</MenuItem>
                                <MenuItem value="PUT">PUT</MenuItem>
                                <MenuItem value="DELETE">DELETE</MenuItem>
                            </TextField>
                        </Box>
                    </Box>

                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#111827',
                            mb: 2
                        }}
                    >
                        Request Parameters
                    </Typography>

                    <Box sx={{ mb: 3 }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500, pl: 0 }}>Name</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Value</TableCell>
                                    <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Actions</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {parameters.map((param, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ pl: 0 }}>
                                            <TextField
                                                size="small"
                                                value={param.name}
                                                onChange={(e) => handleParameterChange(index, 'name', e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#E5E7EB',
                                                        },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <TextField
                                                size="small"
                                                value={param.value}
                                                onChange={(e) => handleParameterChange(index, 'value', e.target.value)}
                                                sx={{
                                                    '& .MuiOutlinedInput-root': {
                                                        '& fieldset': {
                                                            borderColor: '#E5E7EB',
                                                        },
                                                    },
                                                }}
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                onClick={() => handleRemoveParameter(index)}
                                                sx={{
                                                    color: '#EF4444',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        bgcolor: 'transparent',
                                                        opacity: 0.8
                                                    }
                                                }}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>

                        <Button
                            onClick={handleAddParameter}
                            sx={{
                                mt: 2,
                                color: '#3B82F6',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: 'transparent',
                                    opacity: 0.8
                                }
                            }}
                        >
                            + Add Parameter
                        </Button>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                        <Button
                            variant="contained"
                            onClick={handleExecute}
                            sx={{
                                bgcolor: '#3B82F6',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#2563EB',
                                },
                                px: 4
                            }}
                        >
                            Execute
                        </Button>
                    </Box>

                    <Typography
                        variant="h6"
                        sx={{
                            fontSize: '1rem',
                            fontWeight: 600,
                            color: '#111827',
                            mb: 2
                        }}
                    >
                        Response
                    </Typography>

                    <Box sx={{
                        bgcolor: '#F9FAFB',
                        p: 2,
                        borderRadius: '6px',
                        display: 'flex',
                        gap: 3
                    }}>
                        <Typography sx={{ color: '#059669' }}>{responseStatus}</Typography>
                        <Typography sx={{ color: '#374151' }}>{responseTime}</Typography>
                    </Box>
                </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={2}>
                <Box sx={{
                    bgcolor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    p: 4
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: '#111827'
                            }}
                        >
                            API Call Logs
                        </Typography>
                        <TextField
                            select
                            size="small"
                            value={filterValue}
                            onChange={(e) => setFilterValue(e.target.value)}
                            sx={{
                                minWidth: 120,
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#D1D5DB',
                                    },
                                },
                            }}
                        >
                            <MenuItem value="All">Filter by: All</MenuItem>
                            <MenuItem value="Success">Success</MenuItem>
                            <MenuItem value="Error">Error</MenuItem>
                        </TextField>
                    </Box>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#374151', fontWeight: 500, pl: 0 }}>Timestamp</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Method</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Endpoint</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Status</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Duration</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockLogs.map((log, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ pl: 0 }}>{log.timestamp}</TableCell>
                                    <TableCell>{log.method}</TableCell>
                                    <TableCell>{log.endpoint}</TableCell>
                                    <TableCell>
                                        <Box
                                            sx={{
                                                display: 'inline-block',
                                                px: 2,
                                                py: 0.5,
                                                borderRadius: '16px',
                                                bgcolor: getStatusBgColor(log.status),
                                                color: getStatusColor(log.status),
                                                fontSize: '0.875rem',
                                                fontWeight: 500
                                            }}
                                        >
                                            {log.status}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{log.duration}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 3 }}>
                        <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
                            Showing 1-5 of {totalLogs} logs
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1 }}>
                            {[1, 2, 3].map((page) => (
                                <Button
                                    key={page}
                                    variant={currentPage === page ? 'contained' : 'outlined'}
                                    onClick={() => setCurrentPage(page)}
                                    sx={{
                                        minWidth: '40px',
                                        height: '40px',
                                        p: 0,
                                        borderColor: '#E5E7EB',
                                        color: currentPage === page ? 'white' : '#374151',
                                        bgcolor: currentPage === page ? '#3B82F6' : 'transparent',
                                        '&:hover': {
                                            bgcolor: currentPage === page ? '#2563EB' : 'transparent',
                                            borderColor: '#D1D5DB',
                                        },
                                    }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>
                    </Box>

                    <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
                        <Button
                            variant="contained"
                            onClick={handleViewDetails}
                            sx={{
                                bgcolor: '#3B82F6',
                                color: 'white',
                                textTransform: 'none',
                                '&:hover': {
                                    bgcolor: '#2563EB',
                                },
                            }}
                        >
                            View Details
                        </Button>
                        <Button
                            variant="outlined"
                            onClick={handleDownloadLogs}
                            sx={{
                                borderColor: '#E5E7EB',
                                color: '#374151',
                                textTransform: 'none',
                                '&:hover': {
                                    borderColor: '#D1D5DB',
                                    bgcolor: 'transparent',
                                },
                            }}
                        >
                            Download Logs
                        </Button>
                    </Box>
                </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
                <Box sx={{
                    bgcolor: 'white',
                    borderRadius: '8px',
                    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
                    p: 4
                }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                        <Typography
                            variant="h6"
                            sx={{
                                fontSize: '1.25rem',
                                fontWeight: 600,
                                color: '#111827'
                            }}
                        >
                            Sample Data Sets
                        </Typography>
                        <TextField
                            placeholder="Search datasets..."
                            size="small"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            sx={{
                                width: '300px',
                                '& .MuiOutlinedInput-root': {
                                    bgcolor: 'white',
                                    '& fieldset': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover fieldset': {
                                        borderColor: '#D1D5DB',
                                    },
                                },
                            }}
                        />
                    </Box>

                    <Box sx={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(2, 1fr)',
                        gap: 3
                    }}>
                        {sampleDataSets.map((dataset, index) => (
                            <Box
                                key={index}
                                sx={{
                                    border: '1px solid #E5E7EB',
                                    borderRadius: '8px',
                                    overflow: 'hidden'
                                }}
                            >
                                <Box
                                    sx={{
                                        bgcolor: dataset.color,
                                        color: 'white',
                                        p: 2,
                                        fontWeight: 500
                                    }}
                                >
                                    {dataset.title}
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    {dataset.features.map((feature, idx) => (
                                        <Box
                                            key={idx}
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                color: '#6B7280',
                                                fontSize: '0.875rem',
                                                mb: idx < dataset.features.length - 1 ? 1 : 0
                                            }}
                                        >
                                            <Box
                                                component="span"
                                                sx={{
                                                    width: '4px',
                                                    height: '4px',
                                                    borderRadius: '50%',
                                                    bgcolor: '#D1D5DB',
                                                    mr: 2
                                                }}
                                            />
                                            {feature}
                                        </Box>
                                    ))}
                                    <Button
                                        sx={{
                                            mt: 3,
                                            color: dataset.color,
                                            textTransform: 'none',
                                            p: 0,
                                            '&:hover': {
                                                bgcolor: 'transparent',
                                                opacity: 0.8
                                            }
                                        }}
                                    >
                                        View & Use
                                    </Button>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Box>
            </TabPanel>
        </Box>
    );
};

export default RestApiSandbox; 
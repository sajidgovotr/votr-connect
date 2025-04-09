import { useState } from 'react';
import { Box, Button, Tab, Tabs, TextField, Typography, MenuItem, Table, TableBody, TableCell, TableHead, TableRow, Chip, Avatar, Switch } from "@mui/material";
import { useNavigate } from 'react-router';
import NewRequestModal, { NewRequestData } from './NewRequestModal';

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
            id={`production-tabpanel-${index}`}
            aria-labelledby={`production-tab-${index}`}
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

interface ApprovalRequest {
    id: string;
    name: string;
    type: string;
    status: 'Pending' | 'Approved' | 'Rejected';
    requestedBy: string;
    requestedOn: string;
    environment: string;
}

const ProductionApprovals = () => {
    const [activeTab, setActiveTab] = useState(0);
    const [filterValue, setFilterValue] = useState('All');
    const [isNewRequestModalOpen, setIsNewRequestModalOpen] = useState(false);
    const navigate = useNavigate();

    const mockApprovalRequests: ApprovalRequest[] = [
        {
            id: 'REQ-001',
            name: 'Shareholder API Production Release',
            type: 'API Release',
            status: 'Pending',
            requestedBy: 'Alex Johnson',
            requestedOn: 'Apr 8, 2025',
            environment: 'Production'
        },
        {
            id: 'REQ-002',
            name: 'Transaction Processor Update',
            type: 'Service Update',
            status: 'Approved',
            requestedBy: 'Samantha Chen',
            requestedOn: 'Apr 7, 2025',
            environment: 'Production'
        },
        {
            id: 'REQ-003',
            name: 'Account Management API Change',
            type: 'API Change',
            status: 'Rejected',
            requestedBy: 'Michael Brown',
            requestedOn: 'Apr 6, 2025',
            environment: 'Production'
        },
        {
            id: 'REQ-004',
            name: 'Data Export Service Deployment',
            type: 'Service Deployment',
            status: 'Pending',
            requestedBy: 'Emma Wilson',
            requestedOn: 'Apr 6, 2025',
            environment: 'Production'
        },
    ];

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setActiveTab(newValue);
    };

    const handleApprove = (id: string) => {
        console.log(`Approving request ${id}`);
    };

    const handleReject = (id: string) => {
        console.log(`Rejecting request ${id}`);
    };

    const handleViewDetails = (id: string) => {
        console.log(`Viewing details for request ${id}`);
        navigate(`/production-approvals/${id}`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Approved': return '#22C55E';
            case 'Rejected': return '#EF4444';
            default: return '#F59E0B';
        }
    };

    const getStatusBgColor = (status: string) => {
        switch (status) {
            case 'Approved': return '#ECFDF5';
            case 'Rejected': return '#FEE2E2';
            default: return '#FEF3C7';
        }
    };

    const handleNewRequest = (data: NewRequestData) => {
        console.log('New request data:', data);
        // In a real app, you would make an API call here to create the request
        // Then refresh the list of requests
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
                Production Approvals
            </Typography>
            <Typography
                sx={{
                    fontSize: '1rem',
                    color: '#6B7280',
                    mb: 4
                }}
            >
                Review and approve requests for production deployments.
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
                    <Tab label="Pending Approvals" />
                    <Tab label="Approval History" />
                    <Tab label="My Requests" />
                    <Tab label="Settings" />
                </Tabs>
            </Box>

            <TabPanel value={activeTab} index={0}>
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
                            Pending Approval Requests
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/production-approvals/create')}
                                sx={{
                                    bgcolor: '#3B82F6',
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        bgcolor: '#2563EB',
                                    },
                                }}
                            >
                                Create Request
                            </Button>
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
                                <MenuItem value="API">API Changes</MenuItem>
                                <MenuItem value="Service">Service Updates</MenuItem>
                            </TextField>
                        </Box>
                    </Box>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#374151', fontWeight: 500, pl: 0 }}>Request ID</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Name</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Type</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Status</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Requested By</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Date</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockApprovalRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell sx={{ pl: 0 }}>{request.id}</TableCell>
                                    <TableCell>{request.name}</TableCell>
                                    <TableCell>{request.type}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={request.status}
                                            sx={{
                                                bgcolor: getStatusBgColor(request.status),
                                                color: getStatusColor(request.status),
                                                fontSize: '0.75rem',
                                                fontWeight: 500
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    bgcolor: '#3B82F6',
                                                    fontSize: '0.75rem',
                                                    mr: 1
                                                }}
                                            >
                                                {request.requestedBy.split(' ').map(name => name[0]).join('')}
                                            </Avatar>
                                            {request.requestedBy}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{request.requestedOn}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                size="small"
                                                variant="contained"
                                                onClick={() => handleApprove(request.id)}
                                                disabled={request.status !== 'Pending'}
                                                sx={{
                                                    bgcolor: '#22C55E',
                                                    color: 'white',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        bgcolor: '#16A34A',
                                                    },
                                                    '&.Mui-disabled': {
                                                        opacity: 0.3,
                                                    }
                                                }}
                                            >
                                                Approve
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="outlined"
                                                onClick={() => handleReject(request.id)}
                                                disabled={request.status !== 'Pending'}
                                                sx={{
                                                    borderColor: '#EF4444',
                                                    color: '#EF4444',
                                                    textTransform: 'none',
                                                    '&:hover': {
                                                        borderColor: '#DC2626',
                                                        bgcolor: 'transparent',
                                                    },
                                                    '&.Mui-disabled': {
                                                        opacity: 0.3,
                                                    }
                                                }}
                                            >
                                                Reject
                                            </Button>
                                            <Button
                                                size="small"
                                                variant="text"
                                                onClick={() => handleViewDetails(request.id)}
                                                sx={{
                                                    color: '#3B82F6',
                                                    textTransform: 'none',
                                                }}
                                            >
                                                Details
                                            </Button>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={1}>
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
                            Approval History
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
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
                                <MenuItem value="All">Status: All</MenuItem>
                                <MenuItem value="Approved">Approved</MenuItem>
                                <MenuItem value="Rejected">Rejected</MenuItem>
                            </TextField>
                            <TextField
                                type="date"
                                size="small"
                                label="From Date"
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                    },
                                }}
                            />
                            <TextField
                                type="date"
                                size="small"
                                label="To Date"
                                InputLabelProps={{ shrink: true }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                    },
                                }}
                            />
                        </Box>
                    </Box>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#374151', fontWeight: 500, pl: 0 }}>Request ID</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Name</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Status</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Approved/Rejected By</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Date</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Comments</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockApprovalRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell sx={{ pl: 0 }}>{request.id}</TableCell>
                                    <TableCell>{request.name}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={request.status}
                                            sx={{
                                                bgcolor: getStatusBgColor(request.status),
                                                color: getStatusColor(request.status),
                                                fontSize: '0.75rem',
                                                fontWeight: 500
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                            <Avatar
                                                sx={{
                                                    width: 24,
                                                    height: 24,
                                                    bgcolor: '#3B82F6',
                                                    fontSize: '0.75rem',
                                                    mr: 1
                                                }}
                                            >
                                                {request.requestedBy.split(' ').map(name => name[0]).join('')}
                                            </Avatar>
                                            {request.requestedBy}
                                        </Box>
                                    </TableCell>
                                    <TableCell>{request.requestedOn}</TableCell>
                                    <TableCell>
                                        <Typography
                                            sx={{
                                                color: '#6B7280',
                                                fontSize: '0.875rem',
                                                maxWidth: 200,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap'
                                            }}
                                        >
                                            {request.status === 'Approved' ? 'Approved with standard checks' : 'Changes required in implementation'}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Button
                                            size="small"
                                            variant="text"
                                            onClick={() => handleViewDetails(request.id)}
                                            sx={{
                                                color: '#3B82F6',
                                                textTransform: 'none',
                                            }}
                                        >
                                            View Details
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
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
                            My Requests
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 2 }}>
                            <Button
                                variant="contained"
                                onClick={() => navigate('/production-approvals/create')}
                                sx={{
                                    bgcolor: '#3B82F6',
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        bgcolor: '#2563EB',
                                    },
                                }}
                            >
                                New Request
                            </Button>
                        </Box>
                    </Box>

                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ color: '#374151', fontWeight: 500, pl: 0 }}>Request ID</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Name</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Type</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Status</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Submitted On</TableCell>
                                <TableCell sx={{ color: '#374151', fontWeight: 500 }}>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {mockApprovalRequests.map((request) => (
                                <TableRow key={request.id}>
                                    <TableCell sx={{ pl: 0 }}>{request.id}</TableCell>
                                    <TableCell>{request.name}</TableCell>
                                    <TableCell>{request.type}</TableCell>
                                    <TableCell>
                                        <Chip
                                            label={request.status}
                                            sx={{
                                                bgcolor: getStatusBgColor(request.status),
                                                color: getStatusColor(request.status),
                                                fontSize: '0.75rem',
                                                fontWeight: 500
                                            }}
                                        />
                                    </TableCell>
                                    <TableCell>{request.requestedOn}</TableCell>
                                    <TableCell>
                                        <Box sx={{ display: 'flex', gap: 1 }}>
                                            <Button
                                                size="small"
                                                variant="text"
                                                onClick={() => handleViewDetails(request.id)}
                                                sx={{
                                                    color: '#3B82F6',
                                                    textTransform: 'none',
                                                }}
                                            >
                                                View Details
                                            </Button>
                                            {request.status === 'Pending' && (
                                                <Button
                                                    size="small"
                                                    variant="text"
                                                    onClick={() => console.log('Cancel request:', request.id)}
                                                    sx={{
                                                        color: '#EF4444',
                                                        textTransform: 'none',
                                                    }}
                                                >
                                                    Cancel
                                                </Button>
                                            )}
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Box>
            </TabPanel>

            <TabPanel value={activeTab} index={3}>
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
                        Approval Settings
                    </Typography>

                    <Box sx={{ maxWidth: 600 }}>
                        <Box sx={{ mb: 4 }}>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: '#111827',
                                    mb: 2
                                }}
                            >
                                Approval Requirements
                            </Typography>
                            <TextField
                                select
                                fullWidth
                                size="small"
                                label="Required Approvers"
                                defaultValue="2"
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        bgcolor: 'white',
                                        '& fieldset': {
                                            borderColor: '#E5E7EB',
                                        },
                                    },
                                }}
                            >
                                <MenuItem value="1">1 Approver</MenuItem>
                                <MenuItem value="2">2 Approvers</MenuItem>
                                <MenuItem value="3">3 Approvers</MenuItem>
                            </TextField>
                        </Box>

                        <Box sx={{ mb: 4 }}>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: '#111827',
                                    mb: 2
                                }}
                            >
                                Notification Settings
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: '#374151' }}>
                                        Email notifications for new requests
                                    </Typography>
                                    <Switch defaultChecked />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: '#374151' }}>
                                        Email notifications for request updates
                                    </Typography>
                                    <Switch defaultChecked />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: '#374151' }}>
                                        Slack notifications
                                    </Typography>
                                    <Switch />
                                </Box>
                            </Box>
                        </Box>

                        <Box>
                            <Typography
                                sx={{
                                    fontSize: '1rem',
                                    fontWeight: 500,
                                    color: '#111827',
                                    mb: 2
                                }}
                            >
                                Auto-Approval Rules
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: '#374151' }}>
                                        Auto-approve minor version updates
                                    </Typography>
                                    <Switch />
                                </Box>
                                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Typography sx={{ color: '#374151' }}>
                                        Auto-approve documentation changes
                                    </Typography>
                                    <Switch />
                                </Box>
                            </Box>
                        </Box>

                        <Box sx={{ mt: 4 }}>
                            <Button
                                variant="contained"
                                sx={{
                                    bgcolor: '#3B82F6',
                                    color: 'white',
                                    textTransform: 'none',
                                    '&:hover': {
                                        bgcolor: '#2563EB',
                                    },
                                }}
                            >
                                Save Settings
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </TabPanel>

            <NewRequestModal
                open={isNewRequestModalOpen}
                onClose={() => setIsNewRequestModalOpen(false)}
                onSubmit={handleNewRequest}
            />
        </Box>
    );
};

export default ProductionApprovals; 
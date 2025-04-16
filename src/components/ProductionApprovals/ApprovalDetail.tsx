import { useState } from 'react';
import {
    Box,
    Button,
    Typography,
    Paper,
    Grid,
    Divider,
    Chip,
    Avatar,
    TextField,
    List,
    ListItem,
    ListItemText,
    ListItemIcon
} from '@mui/material';

import { useParams, useNavigate } from 'react-router';
import { ChevronLeft, Check, Close, AccessTime, Code, SystemUpdate, Description } from '@mui/icons-material';


const ApprovalDetail = () => {
    const { requestId } = useParams();
    const navigate = useNavigate();
    const [commentText, setCommentText] = useState('');

    // Mock data - in a real app, this would be fetched based on the requestId
    const requestDetail = {
        id: requestId || 'REQ-001',
        name: 'Shareholder API Production Release',
        type: 'API Release',
        status: 'Pending',
        requestedBy: 'Alex Johnson',
        requestedOn: 'Apr 8, 2025',
        environment: 'Production',
        description: 'This release introduces new endpoints for the Shareholder API, including improved pagination and filtering capabilities. The changes have been tested in the staging environment with no issues.',
        changes: [
            'Added /shareholders/filter endpoint',
            'Improved pagination with cursor-based navigation',
            'Added sorting options for all shareholder endpoints',
            'Updated documentation for new endpoints'
        ],
        dependencies: [
            'Authentication Service v2.3',
            'Data Processing Service v1.1',
            'Notification Service v3.0'
        ],
        timelineEvents: [
            {
                id: '1',
                action: 'Request Created',
                user: 'Alex Johnson',
                timestamp: 'Apr 8, 2025 10:30 AM',
                comment: 'Initial submission for API update'
            },
            {
                id: '2',
                action: 'Tests Completed',
                user: 'CI/CD Pipeline',
                timestamp: 'Apr 8, 2025 11:45 AM',
                comment: 'All tests passed with 100% coverage'
            },
            {
                id: '3',
                action: 'Security Review',
                user: 'Security Team',
                timestamp: 'Apr 8, 2025 02:15 PM',
                comment: 'No security vulnerabilities detected'
            }
        ]
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

    const handleApprove = () => {
        console.log(`Approving request ${requestId} with comment: ${commentText}`);
        // In a real app, you would make an API call here
        // Then navigate back or show success message
    };

    const handleReject = () => {
        console.log(`Rejecting request ${requestId} with comment: ${commentText}`);
        // In a real app, you would make an API call here
        // Then navigate back or show success message
    };

    const getIconForEvent = (action: string) => {
        if (action.includes('Created')) return <Description />;
        if (action.includes('Tests')) return <Code />;
        if (action.includes('Review')) return <SystemUpdate />;
        return <AccessTime />;
    };

    return (
        <Box className="p-6">
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Button
                    startIcon={<ChevronLeft />}
                    onClick={() => navigate('/production-approvals')}
                    sx={{
                        color: '#3B82F6',
                        textTransform: 'none',
                        fontWeight: 500,
                        mr: 2
                    }}
                >
                    Back to Approvals
                </Button>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: '1.75rem',
                        fontWeight: 600,
                        color: '#111827'
                    }}
                >
                    Approval Request Details
                </Typography>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Paper sx={{ p: 4, borderRadius: '8px', mb: 3 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                            <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827' }}>
                                {requestDetail.name}
                            </Typography>
                            <Chip
                                label={requestDetail.status}
                                sx={{
                                    bgcolor: getStatusBgColor(requestDetail.status),
                                    color: getStatusColor(requestDetail.status),
                                    fontSize: '0.75rem',
                                    fontWeight: 500
                                }}
                            />
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 3 }}>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Request ID</Typography>
                                <Typography sx={{ fontWeight: 500 }}>{requestDetail.id}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Type</Typography>
                                <Typography sx={{ fontWeight: 500 }}>{requestDetail.type}</Typography>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Requested By</Typography>
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
                                        {requestDetail.requestedBy.split(' ').map(name => name[0]).join('')}
                                    </Avatar>
                                    <Typography sx={{ fontWeight: 500 }}>{requestDetail.requestedBy}</Typography>
                                </Box>
                            </Grid>
                            <Grid item xs={12} sm={6} md={3}>
                                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Date</Typography>
                                <Typography sx={{ fontWeight: 500 }}>{requestDetail.requestedOn}</Typography>
                            </Grid>
                        </Grid>

                        <Divider sx={{ my: 3 }} />

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, color: '#111827', mb: 2 }}>
                                Description
                            </Typography>
                            <Typography sx={{ color: '#4B5563' }}>
                                {requestDetail.description}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3 }}>
                            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, color: '#111827', mb: 2 }}>
                                Changes
                            </Typography>
                            <List dense>
                                {requestDetail.changes.map((change, index) => (
                                    <ListItem key={index} sx={{ py: 0.5 }}>
                                        <ListItemIcon sx={{ minWidth: '32px' }}>
                                            <Box
                                                sx={{
                                                    width: 6,
                                                    height: 6,
                                                    borderRadius: '50%',
                                                    bgcolor: '#3B82F6',
                                                    mt: 1
                                                }}
                                            />
                                        </ListItemIcon>
                                        <ListItemText primary={change} />
                                    </ListItem>
                                ))}
                            </List>
                        </Box>

                        <Box>
                            <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, color: '#111827', mb: 2 }}>
                                Dependencies
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                                {requestDetail.dependencies.map((dependency, index) => (
                                    <Chip
                                        key={index}
                                        label={dependency}
                                        sx={{
                                            bgcolor: '#F9FAFB',
                                            color: '#4B5563',
                                            borderRadius: '4px',
                                            fontSize: '0.75rem',
                                            fontWeight: 500
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>
                    </Paper>

                    <Paper sx={{ p: 4, borderRadius: '8px', mb: 3 }}>
                        <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', mb: 3 }}>
                            Timeline
                        </Typography>

                        <List>
                            {requestDetail.timelineEvents.map((event, index) => (
                                <ListItem
                                    key={event.id}
                                    sx={{
                                        display: 'flex',
                                        alignItems: 'flex-start',
                                        position: 'relative',
                                        pb: 3,
                                        '&:last-child': {
                                            pb: 0
                                        }
                                    }}
                                >
                                    <Box
                                        sx={{
                                            position: 'absolute',
                                            left: '20px',
                                            top: 0,
                                            bottom: 0,
                                            width: '2px',
                                            bgcolor: index === requestDetail.timelineEvents.length - 1 ? 'transparent' : '#E5E7EB'
                                        }}
                                    />
                                    <Box sx={{ mr: 3, position: 'relative', zIndex: 1 }}>
                                        <Avatar
                                            sx={{
                                                width: 40,
                                                height: 40,
                                                bgcolor: '#3B82F6'
                                            }}
                                        >
                                            {getIconForEvent(event.action)}
                                        </Avatar>
                                    </Box>
                                    <Box sx={{ flex: 1 }}>
                                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                                            <Typography variant="body1" sx={{ fontWeight: 500, fontSize: '0.875rem' }}>
                                                {event.action}
                                            </Typography>
                                            <Typography sx={{ color: '#6B7280', fontSize: '0.75rem' }}>
                                                {event.timestamp}
                                            </Typography>
                                        </Box>
                                        <Typography sx={{ color: '#6B7280', fontSize: '0.75rem', mb: 1 }}>
                                            By {event.user}
                                        </Typography>
                                        {event.comment && (
                                            <Typography
                                                sx={{
                                                    color: '#4B5563',
                                                    fontSize: '0.75rem',
                                                    bgcolor: '#F9FAFB',
                                                    p: 1,
                                                    borderRadius: '4px'
                                                }}
                                            >
                                                {event.comment}
                                            </Typography>
                                        )}
                                    </Box>
                                </ListItem>
                            ))}
                        </List>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Paper sx={{ p: 4, borderRadius: '8px', mb: 3, position: 'sticky', top: 20 }}>
                        <Typography variant="h6" sx={{ fontSize: '1.25rem', fontWeight: 600, color: '#111827', mb: 3 }}>
                            Actions
                        </Typography>

                        {requestDetail.status === 'Pending' && (
                            <>
                                <TextField
                                    fullWidth
                                    multiline
                                    rows={4}
                                    placeholder="Add a comment (optional)"
                                    value={commentText}
                                    onChange={(e) => setCommentText(e.target.value)}
                                    sx={{
                                        mb: 3,
                                        '& .MuiOutlinedInput-root': {
                                            '& fieldset': {
                                                borderColor: '#E5E7EB',
                                            },
                                        },
                                    }}
                                />

                                <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        startIcon={<Check />}
                                        onClick={handleApprove}
                                        sx={{
                                            bgcolor: '#22C55E',
                                            color: 'white',
                                            textTransform: 'none',
                                            '&:hover': {
                                                bgcolor: '#16A34A',
                                            },
                                        }}
                                    >
                                        Approve
                                    </Button>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        startIcon={<Close />}
                                        onClick={handleReject}
                                        sx={{
                                            borderColor: '#EF4444',
                                            color: '#EF4444',
                                            textTransform: 'none',
                                            '&:hover': {
                                                borderColor: '#DC2626',
                                                bgcolor: 'transparent',
                                            },
                                        }}
                                    >
                                        Reject
                                    </Button>
                                </Box>
                            </>
                        )}

                        {requestDetail.status !== 'Pending' && (
                            <Box sx={{ mb: 3, p: 2, bgcolor: '#F9FAFB', borderRadius: '8px' }}>
                                <Typography sx={{ fontWeight: 500 }}>
                                    This request has been {requestDetail.status.toLowerCase()}
                                </Typography>
                                <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>
                                    No further actions are required
                                </Typography>
                            </Box>
                        )}

                        <Divider sx={{ my: 3 }} />

                        <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 600, color: '#111827', mb: 2 }}>
                            Related Information
                        </Typography>

                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Environment</Typography>
                            <Typography sx={{ fontWeight: 500 }}>{requestDetail.environment}</Typography>
                        </Box>

                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Requires Restart</Typography>
                            <Typography sx={{ fontWeight: 500 }}>No</Typography>
                        </Box>

                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Estimated Downtime</Typography>
                            <Typography sx={{ fontWeight: 500 }}>None</Typography>
                        </Box>

                        <Box sx={{ mb: 1 }}>
                            <Typography sx={{ color: '#6B7280', fontSize: '0.875rem' }}>Rollback Plan</Typography>
                            <Typography sx={{ fontWeight: 500 }}>Automated rollback available</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
};

export default ApprovalDetail; 
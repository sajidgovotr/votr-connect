import { CustomButton } from "@/components";
import DynamicTable from "@/components/DynamicTable";
import { Box, TextField, Typography, Paper, InputAdornment, Chip, Stack, Select, MenuItem, FormControl, InputLabel, Alert, CircularProgress } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useGetAllIntegrationsWithDetailsQuery, usePullDataFromIntegrationQuery } from "@/services/express-integration";
import { useMemo, useState, useEffect } from "react";
import IntegrationDetails from "@/components/Modal/IntegrationDetails";

const Integrations = () => {
    const [pullingDataId, setPullingDataId] = useState<string | null>(null);
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const { data: integrationsResponse, isLoading, isError, error } = useGetAllIntegrationsWithDetailsQuery();
    const { isLoading: isPullingData, isError: isPullError, error: pullError, isSuccess: isPullSuccess } = usePullDataFromIntegrationQuery(
        pullingDataId || '',
        {
            skip: !pullingDataId,
            refetchOnMountOrArgChange: true,
            refetchOnFocus: false,
            refetchOnReconnect: false
        }
    );
    const [selectedType, setSelectedType] = useState<string>('all');
    const [search, setSearch] = useState<string>('');
    const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

    const integrations = integrationsResponse?.data || [];

    useEffect(() => {
        if (isPullSuccess) {
            setShowSuccessMessage(true);
            setPullingDataId(null);
            const timer = setTimeout(() => {
                setShowSuccessMessage(false);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, [isPullSuccess]);

    const columns = useMemo(() => [
        {
            key: ["name"],
            name: "Name",
            align: "left"
        },
        {
            key: ["integrationMethod"],
            name: "Type",
            align: "left",
            component: (data: any) => (
                <Chip
                    label={data?.integrationMethod?.code?.toUpperCase()}
                    size="small"
                    sx={{
                        backgroundColor: data?.integrationMethod?.code?.toLowerCase() === 'file-upload' ? '#DCFCE7' : '#FEE2E2',
                        color: data?.integrationMethod?.code?.toLowerCase() === 'file-upload' ? '#166534' : '#991B1B',
                        border: `1px solid ${data?.integrationMethod?.code?.toLowerCase() === 'file-upload' ? '#BBF7D0' : '#FECACA'}`,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        height: '24px',
                        '& .MuiChip-label': {
                            px: 1
                        }
                    }}
                />
            )
        },
        {
            key: ["product"],
            name: "Product",
            align: "left",
            component: (data: any) => data?.product?.name || '-'
        },
        {
            key: ["environment"],
            name: "Environment",
            align: "left",
            component: (data: any) => (
                <Chip
                    label={data?.environment}
                    size="small"
                    sx={{
                        backgroundColor: data?.environment === 'PRODUCTION' ? '#FEE2E2' : '#FEF3C7',
                        color: data?.environment === 'PRODUCTION' ? '#991B1B' : '#92400E',
                        border: `1px solid ${data?.environment === 'PRODUCTION' ? '#FECACA' : '#FDE68A'}`,
                        fontWeight: 500,
                        fontSize: '0.75rem',
                        height: '24px',
                        '& .MuiChip-label': {
                            px: 1
                        }
                    }}
                />
            )
        },
        {
            key: ["actions"],
            name: "Actions",
            align: "left",
            component: (data: any, _index: number) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <CustomButton
                            variant="text"
                            size="small"
                            onClick={() => setSelectedIntegration(data)}
                            title="View Details"
                            sx={{ p: 2 }}
                        />
                        {/* {
                            data?.integrationMethod?.code === 'file-upload' && (
                                <Tooltip title="Start pulling data from the integration on the server">
                                    <CustomButton
                                        variant="text"
                                        size="small"
                                        title="Pull Data"
                                        sx={{ p: 2 }}
                                        loading={isPullingData && pullingDataId === data?.id}
                                        onClick={() => {
                                            setPullingDataId(data?.id);
                                        }}
                                    />
                                </Tooltip>
                            )
                        } */}
                    </Stack>
                )
            }
        },
    ], [isPullingData, pullingDataId]);

    const filterByType = (integration: any) => {
        if (selectedType === 'all') return true;
        return integration.integrationMethod.code === selectedType;
    }

    const filterBySearch = (integration: any) => {
        return integration.name.toLowerCase().includes(search.toLowerCase()) ||
            integration.product.name.toLowerCase().includes(search.toLowerCase()) ||
            integration.environment.toLowerCase().includes(search.toLowerCase())
    }

    const sortByCreatedAt = (integrations: any[]) => {
        return integrations.sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    const filteredIntegrations = useMemo(() => {
        const filtered = integrations.filter(filterByType).filter(filterBySearch);
        return sortByCreatedAt(filtered);
    }, [selectedType, search, integrations]);

    // Handle loading state
    if (isLoading) {
        return (
            <Box sx={{ p: 3, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
                <CircularProgress />
            </Box>
        );
    }

    // Handle error state
    if (isError) {
        const errorMessage = error && 'data' in error
            ? (error.data as { message?: string })?.message
            : 'Failed to fetch integrations. Please try again later.';

        return (
            <Box sx={{ p: 3 }}>
                <Alert
                    severity="error"
                    sx={{
                        mb: 2,
                        '& .MuiAlert-message': {
                            color: '#991B1B'
                        }
                    }}
                >
                    {errorMessage}
                </Alert>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#1F2937' }}>
                    Error Loading Integrations
                </Typography>
                <Typography variant="body1" sx={{ color: '#6B7280' }}>
                    There was a problem loading your integrations. Please check your connection and try again.
                </Typography>
            </Box>
        );
    }

    // Handle empty state
    if (!integrations || integrations.length === 0) {
        return (
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#1F2937' }}>
                    No Integrations Found
                </Typography>
                <Typography variant="body1" sx={{ color: '#6B7280' }}>
                    You haven't created any integrations yet. Get started by creating your first integration.
                </Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ p: 3 }}>
            <Box sx={{ mb: 4 }}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: 600, color: '#1F2937' }}>
                    Integrations
                </Typography>
                <Typography variant="body1" sx={{ color: '#6B7280', mb: 3 }}>
                    Manage and monitor your API integrations and file uploads
                </Typography>
            </Box>

            {/* Show pull data error if any */}
            {isPullError && (
                <Alert
                    severity="error"
                    sx={{
                        mb: 3,
                        '& .MuiAlert-message': {
                            color: '#991B1B'
                        }
                    }}
                >
                    {pullError && 'data' in pullError
                        ? (pullError.data as { message?: string })?.message
                        : 'Failed to pull data. Please try again.'}
                </Alert>
            )}

            {/* Show success message */}
            {showSuccessMessage && (
                <Alert
                    severity="success"
                    sx={{
                        mb: 3,
                        '& .MuiAlert-message': {
                            color: '#065F46'
                        }
                    }}
                >
                    Data pulled successfully! The integration is now processing your data.
                </Alert>
            )}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    backgroundColor: 'white',
                    borderRadius: '8px',
                    border: '1px solid #E5E7EB'
                }}
            >
                <Box sx={{ mb: 3 }}>
                    <TextField
                        fullWidth
                        placeholder="Search integrations..."
                        variant="outlined"
                        size="small"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#9CA3AF' }} />
                                </InputAdornment>
                            ),
                        }}
                        sx={{
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#F9FAFB',
                                '& fieldset': {
                                    borderColor: '#E5E7EB',
                                },
                                '&:hover fieldset': {
                                    borderColor: '#D1D5DB',
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#3B82F6',
                                },
                            },
                        }}
                    />
                </Box>

                <Box sx={{ mb: 3 }}>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <FilterListIcon sx={{ color: '#6B7280' }} />
                            <Typography variant="subtitle2" sx={{ color: '#6B7280' }}>
                                Filters:
                            </Typography>
                        </Box>
                        <FormControl size="small" sx={{ minWidth: 150 }}>
                            <InputLabel>Type</InputLabel>
                            <Select
                                label="Type"
                                defaultValue="all"
                                onChange={(e) => setSelectedType(e.target.value)}
                                sx={{
                                    backgroundColor: '#F9FAFB',
                                    '& .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#E5E7EB',
                                    },
                                    '&:hover .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#D1D5DB',
                                    },
                                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                        borderColor: '#3B82F6',
                                    },
                                }}
                            >
                                <MenuItem value="all">All Types</MenuItem>
                                <MenuItem value="rest-api">Rest Api</MenuItem>
                                <MenuItem value="file-upload">File Upload</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>

                {/* Show no results message if filtered list is empty */}
                {filteredIntegrations.length === 0 ? (
                    <Box sx={{ py: 4, textAlign: 'center' }}>
                        <Typography variant="body1" sx={{ color: '#6B7280' }}>
                            No integrations found matching your search criteria.
                        </Typography>
                    </Box>
                ) : (
                    <DynamicTable
                        columns={columns}
                        data={filteredIntegrations}
                        hidePagination={true}
                        isLoading={isLoading}
                    />
                )}
            </Paper>

            <IntegrationDetails
                open={!!selectedIntegration}
                onClose={() => setSelectedIntegration(null)}
                integration={selectedIntegration}
            />
        </Box>
    )
}

export default Integrations;
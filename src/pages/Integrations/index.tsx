import { CustomButton } from "@/components";
import DynamicTable from "@/components/DynamicTable";
import { Box, TextField, Typography, Paper, InputAdornment, Chip, Stack, Select, MenuItem, FormControl, InputLabel, Tooltip } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useGetAllIntegrationsQuery, usePullDataFromIntegrationQuery } from "@/services/express-integration";
import { useMemo, useState } from "react";
import IntegrationDetails from "@/components/Modal/IntegrationDetails";

// const EnvironmentBadge = ({ environment }: { environment: string }) => {
//     const colors = getEnvironmentColor(environment);
//     return (
//         <Chip
//             label={environment}
//             size="small"
//             sx={{
//                 backgroundColor: colors.bg,
//                 color: colors.text,
//                 border: `1px solid ${colors.border}`,
//                 fontWeight: 500,
//                 fontSize: '0.75rem',
//                 height: '24px',
//                 '& .MuiChip-label': {
//                     px: 1
//                 }
//             }}
//         />
//     );
// };

const Integrations = () => {
    const [pullingDataId, setPullingDataId] = useState<string | null>(null);
    const { data: integrations, isLoading } = useGetAllIntegrationsQuery(null);
    const { isLoading: isPullingData } = usePullDataFromIntegrationQuery(pullingDataId || '', { skip: !pullingDataId });
    const [selectedType, setSelectedType] = useState<string>('all');
    const [search, setSearch] = useState<string>('');
    const [selectedIntegration, setSelectedIntegration] = useState<any>(null);

    const columns = [
        {
            key: ["name"],
            name: "Name",
            align: "left"
        },
        {
            key: ["integrationType"],
            name: "Type",
            align: "left",
            component: (data: any) => (
                <Chip
                    label={data?.integrationType?.toUpperCase()}
                    size="small"
                    sx={{
                        backgroundColor: data?.integrationType?.toLowerCase() === 'file' ? '#DCFCE7' : '#FEE2E2',
                        color: data?.integrationType?.toLowerCase() === 'file' ? '#166534' : '#991B1B',
                        border: `1px solid ${data?.integrationType?.toLowerCase() === 'file' ? '#BBF7D0' : '#FECACA'}`,
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
                        {
                            data?.integrationType === 'file' && (
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
                        }
                    </Stack>
                )
            }
        },
    ];

    const filterByType = (integration: any) => {
        return selectedType === 'all' ? integrations : integration.integrationType === selectedType;
    }

    const filterBySearch = (integration: any) => {
        return integration.name.toLowerCase().includes(search.toLowerCase());
    }

    const filteredIntegrations = useMemo(() => integrations?.filter(filterByType).filter(filterBySearch), [selectedType, search, integrations]);

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
                                <MenuItem value="rest">Rest Api</MenuItem>
                                <MenuItem value="file">File Upload</MenuItem>
                            </Select>
                        </FormControl>
                    </Stack>
                </Box>

                <DynamicTable
                    columns={columns}
                    data={filteredIntegrations || []}
                    hidePagination={true}
                    isLoading={isLoading}
                />
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
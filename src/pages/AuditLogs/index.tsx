import React from 'react';
import { Box, Stack } from '@mui/material';
import { PageHeader, Table, Search, SelectBox, CustomButton } from '@/components';
import { useNavigate } from 'react-router';
import type { Label } from '@/types';

interface AuditLog {
    id: string;
    timestamp: string;
    user: string;
    type: string;
    clientResource: string;
    details: string;
}

const columns = [
    { key: 'timestamp', name: 'Timestamp', minWidth: 170 },
    { key: 'user', name: 'User', minWidth: 130 },
    { key: 'type', name: 'Type', minWidth: 130 },
    { key: 'clientResource', name: 'Client/Resource', minWidth: 170 },
    { key: 'details', name: 'Details', minWidth: 100 },
];

const mockData = [
    {
        id: 'LOG-85389',
        timestamp: 'Apr 9, 2025 10:45:12',
        user: 'System Admin',
        type: 'Production Approval',
        clientResource: 'Acme Financial',
        details: 'Details',
    },
    {
        id: 'LOG-85388',
        timestamp: 'Apr 9, 2025 09:32:45',
        user: 'Integration Admin',
        type: 'Schema Update',
        clientResource: 'Global Finance Ltd',
        details: 'Details',
    },
    // Add more mock data as needed
];

const actionOptions: Label[] = [
    { value: 'all', label: 'All Actions' },
    { value: 'production_approval', label: 'Production Approval' },
    { value: 'schema_update', label: 'Schema Update' },
    { value: 'user_login', label: 'User Login' },
    { value: 'api_key_creation', label: 'API Key Creation' },
];

const userRoleOptions: Label[] = [
    { value: 'all', label: 'All Users' },
    { value: 'system_admin', label: 'System Admin' },
    { value: 'integration_admin', label: 'Integration Admin' },
];

const dateRangeOptions: Label[] = [
    { value: '7d', label: 'Last 7 days' },
    { value: '30d', label: 'Last 30 days' },
    { value: '90d', label: 'Last 90 days' },
];

const AuditLogs = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = React.useState('');
    const [actionType, setActionType] = React.useState('all');
    const [userRole, setUserRole] = React.useState('all');
    const [dateRange, setDateRange] = React.useState('7d');

    const handleRowClick = (row: AuditLog) => {
        navigate(`/audit-logs/${row.id}`);
    };

    return (
        <Box sx={{ height: '100%', overflow: 'auto' }}>
            <PageHeader
                title="Audit Logs"
                rightNode={
                    <CustomButton
                        variant="contained"
                        onClick={() => console.log('Export logs')}
                        title=' Export Logs'
                    />


                }
            />

            <Box sx={{ p: 3 }}>
                <Stack direction="row" spacing={2} sx={{ mb: 3 }}>
                    <Search
                        value={searchQuery}
                        handleChangeValue={setSearchQuery}
                        placeholder="Search by user, action, or client..."
                        iconAlign="left"
                        size='small'
                    />

                    <SelectBox
                        value={actionType}
                        options={actionOptions}
                        handleChangeValue={setActionType}
                        placeholder="Action Type"
                    />

                    <SelectBox
                        value={userRole}
                        options={userRoleOptions}
                        handleChangeValue={setUserRole}
                        placeholder="User Role"
                    />

                    <SelectBox
                        value={dateRange}
                        options={dateRangeOptions}
                        handleChangeValue={setDateRange}
                        placeholder="Date Range"
                    />
                </Stack>

                <Table
                    columns={columns}
                    data={mockData}
                    hidePagination={true}
                    handleChangePage={(newPage: number) => console.log('Page changed:', newPage)}
                    handleChangeRowsPerPage={(newRowsPerPage: number) =>
                        console.log('Rows per page changed:', newRowsPerPage)
                    }
                    onRowClick={handleRowClick}
                    hover
                />
            </Box>
        </Box>
    );
};

export default AuditLogs; 
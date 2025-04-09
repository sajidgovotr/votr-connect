import { Box, Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useState } from 'react';
import { Search, CustomButton, ActiveStatusChip, TablePagination } from '@/components';
import { EditIcon } from '@/assets/svgs/custom-icons';
import { useNavigate } from 'react-router';

interface Client {
    name: string;
    integrationType: string;
    status: 'Active' | 'Pending' | 'Inactive' | 'Setup';
}

const ClientManagement = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [page, setPage] = useState(1);
    const [limit] = useState(16);

    const clients: Client[] = [
        { name: 'John Partners Inc.', integrationType: 'REST API', status: 'Active' },
        { name: 'Global Finance Ltd', integrationType: 'GraphQL', status: 'Pending' },
        { name: 'TechStar Corp', integrationType: 'File Upload', status: 'Active' },
        { name: 'DataSync Solutions', integrationType: 'REST API', status: 'Active' },
        { name: 'Securo Financial', integrationType: 'GraphQL', status: 'Inactive' },
        { name: 'Alpine Trading Group', integrationType: 'Custom', status: 'Setup' },
    ];

    const handleSearch = (value: string) => {
        setSearchTerm(value);
    };

    const handlePageChange = (newPage: number) => {
        setPage(newPage);
    };

    return (
        <Container maxWidth="xl">
            <Box sx={{ py: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        Client Management
                    </Typography>
                    <CustomButton
                        variant="contained"
                        color="primary"
                        title="Create"
                        startIcon="+"
                        onClick={() => navigate('/client-management/create')}
                    />
                </Box>

                <Typography variant="subtitle1" sx={{ mb: 3, color: 'text.secondary' }}>
                    Create and manage client accounts.
                </Typography>

                <Box sx={{ mb: 4 }}>
                    <Search
                        placeholder="Search by company name, email or status..."
                        value={searchTerm}
                        handleChangeValue={handleSearch}
                    />
                </Box>

                <TableContainer component={Paper} sx={{ mb: 4 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Client Name</TableCell>
                                <TableCell>Integration Type</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {clients.map((client) => (
                                <TableRow key={client.name}>
                                    <TableCell>{client.name}</TableCell>
                                    <TableCell>{client.integrationType}</TableCell>
                                    <TableCell>
                                        <ActiveStatusChip
                                            isActive={client.status === 'Active'}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        <CustomButton
                                            variant="text"
                                            size="small"
                                            title="Edit"
                                            startIcon={<EditIcon />}
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>

                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <TablePagination
                        page={page}
                        limit={limit}
                        total={47}
                        handlePageChange={handlePageChange}
                    />
                </Box>
            </Box>
        </Container>
    );
};

export default ClientManagement; 
import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    IconButton,
    Tooltip,
    Typography,
    Switch,
    TablePagination,
    Box,
    TextField,
    InputAdornment,
} from '@mui/material';
import {
    Edit as EditIcon,
    Delete as DeleteIcon,
    Search as SearchIcon,
} from '@mui/icons-material';
import { EmailTemplate } from './EmailTemplatesPage';

interface EmailTemplateListProps {
    templates: EmailTemplate[];
    onEdit: (template: EmailTemplate) => void;
    onDelete: (templateId: string) => void;
}

const EmailTemplateList: React.FC<EmailTemplateListProps> = ({
    templates,
    onEdit,
    onDelete,
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const filteredTemplates = templates.filter((template) =>
        template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        template.subject.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const paginatedTemplates = filteredTemplates.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    return (
        <Box>
            <Box mb={3}>
                <TextField
                    fullWidth
                    variant="outlined"
                    placeholder="Search templates..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <SearchIcon color="action" />
                            </InputAdornment>
                        ),
                    }}
                    size="small"
                />
            </Box>

            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Subject</TableCell>
                            <TableCell>Last Updated</TableCell>
                            <TableCell align="center">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedTemplates.length === 0 ? (
                            <TableRow>
                                <TableCell colSpan={5} align="center">
                                    <Typography variant="body1" color="textSecondary" py={3}>
                                        No email templates found
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        ) : (
                            paginatedTemplates.map((template) => (
                                <TableRow key={template.id} hover>
                                    <TableCell>
                                        <Typography variant="body1">{template.name}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" >
                                            {template.subject}
                                        </Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography variant="body2" >
                                            {new Date(template.updatedAt).toLocaleDateString(undefined, {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit',
                                            })}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box>
                                            <Tooltip title="Edit">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => onEdit(template)}
                                                    sx={{ mr: 1 }}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip title="Delete">
                                                <IconButton
                                                    size="small"
                                                    onClick={() => {
                                                        if (window.confirm('Are you sure you want to delete this template?')) {
                                                            onDelete(template.id);
                                                        }
                                                    }}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredTemplates.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Box>
    );
};

export default EmailTemplateList; 
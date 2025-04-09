import { Box, Button, Card, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Link } from "@mui/material";
import RoleChip from "../RoleChip";
import AddIcon from '@mui/icons-material/Add';

interface TeamMember {
    name: string;
    email: string;
    role: "Admin" | "Developer" | "Viewer";
}

const teamMembers: TeamMember[] = [
    { name: "John Parker", email: "john@partnersco.com", role: "Admin" },
    { name: "Sarah Johnson", email: "sarah@partnersco.com", role: "Developer" },
    { name: "Mike Wilson", email: "mike@partnersco.com", role: "Viewer" },
    { name: "Lisa Chen", email: "lisa@partnersco.com", role: "Developer" }
];

const roleDescriptions = [
    {
        role: "Admin",
        description: "Full access to account settings and team management"
    },
    {
        role: "Developer",
        description: "Configure and test integrations, access API keys"
    },
    {
        role: "Viewer",
        description: "View-only access to dashboards and integration status"
    }
];

const TeamManagement = () => {
    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 3 }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    sx={{
                        bgcolor: '#2563EB',
                        color: 'white',
                        textTransform: 'none',
                        fontWeight: 500,
                        '&:hover': {
                            bgcolor: '#1D4ED8',
                        }
                    }}
                >
                    Add Team Member
                </Button>
            </Box>

            <Card>
                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    sx={{
                                        color: '#6B7280',
                                        fontWeight: 500,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: '#6B7280',
                                        fontWeight: 500,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Email
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: '#6B7280',
                                        fontWeight: 500,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Role
                                </TableCell>
                                <TableCell
                                    sx={{
                                        color: '#6B7280',
                                        fontWeight: 500,
                                        fontSize: '0.875rem'
                                    }}
                                >
                                    Actions
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {teamMembers.map((member, index) => (
                                <TableRow key={index}>
                                    <TableCell sx={{ color: '#111827' }}>
                                        {member.name}
                                    </TableCell>
                                    <TableCell sx={{ color: '#6B7280' }}>
                                        {member.email}
                                    </TableCell>
                                    <TableCell>
                                        <RoleChip role={member.role} />
                                    </TableCell>
                                    <TableCell>
                                        <Link
                                            href="#"
                                            sx={{
                                                color: '#2563EB',
                                                textDecoration: 'none',
                                                '&:hover': {
                                                    textDecoration: 'underline'
                                                }
                                            }}
                                        >
                                            Edit
                                        </Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Card>

            <Box
                sx={{
                    mt: 4,
                    p: 3,
                    bgcolor: '#F9FAFB',
                    borderRadius: 1,
                    border: '1px solid #E5E7EB'
                }}
            >
                <Typography
                    sx={{
                        fontSize: '0.875rem',
                        fontWeight: 600,
                        color: '#111827',
                        mb: 2
                    }}
                >
                    Roles:
                </Typography>
                <Box component="ul" sx={{ m: 0, p: 0, listStyle: 'none' }}>
                    {roleDescriptions.map((role, index) => (
                        <Box
                            component="li"
                            key={index}
                            sx={{
                                display: 'flex',
                                alignItems: 'baseline',
                                mb: 1,
                                '&:last-child': { mb: 0 }
                            }}
                        >
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#111827',
                                    fontWeight: 500,
                                    minWidth: '80px',
                                    mr: 1
                                }}
                            >
                                {role.role}:
                            </Typography>
                            <Typography
                                component="span"
                                sx={{
                                    fontSize: '0.875rem',
                                    color: '#6B7280'
                                }}
                            >
                                {role.description}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            </Box>
        </Box>
    );
};

export default TeamManagement; 
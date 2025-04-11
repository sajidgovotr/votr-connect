import { Box, Typography, Breadcrumbs, Link } from '@mui/material';
import { useNavigate } from 'react-router';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    showCreateButton?: boolean;
    currentPage?: string;
}

const PageHeader = ({
    title,
    subtitle = 'Review and approve requests for production deployments.',
    showCreateButton = false,
    currentPage
}: PageHeaderProps) => {
    const navigate = useNavigate();

    return (
        <Box sx={{ mb: 4 }}>
            {currentPage && (
                <Breadcrumbs sx={{ mb: 2 }}>
                    <Link
                        color="inherit"
                        href="/production-approvals"
                        sx={{ textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                    >
                        Production Approvals
                    </Link>
                    <Typography color="text.primary">{currentPage}</Typography>
                </Breadcrumbs>
            )}

            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                mb: 1
            }}>
                <Typography
                    variant="h4"
                    sx={{
                        fontSize: '1.75rem',
                        fontWeight: 600,
                        color: '#111827'
                    }}
                >
                    {title}
                </Typography>

                {showCreateButton && (
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
                )}
            </Box>

            {subtitle && (
                <Typography
                    sx={{
                        fontSize: '1rem',
                        color: '#6B7280'
                    }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

export default PageHeader; 
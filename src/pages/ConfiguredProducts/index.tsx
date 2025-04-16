import { useState } from 'react';
import {
    Box,
    Container,
    Typography,
    Card,
    Grid,
    Button,
    Chip,
    IconButton,
    Menu,
    MenuItem,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Alert,
} from '@mui/material';
import {
    MoreVert as MoreVertIcon,
    Edit as EditIcon,
    Delete as DeleteIcon,
    Refresh as RefreshIcon,
    PlayArrow as PlayArrowIcon,
    Stop as StopIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router';

interface Integration {
    type: string;
    environment: string;
    status: string;
    healthStatus: string;
    lastSync: string;
}

interface ConfiguredProduct {
    id: string;
    name: string;
    status: string;
    lastSync: string;
    integrations: Integration[];
}
// Mock data for configured products
const mockConfiguredProducts: ConfiguredProduct[] = [
    {
        id: '1',
        name: 'SRM',
        status: 'active',
        lastSync: '2024-03-20T10:30:00',
        integrations: [
            {
                type: 'REST API',
                environment: 'prod',
                status: 'active',
                healthStatus: 'healthy',
                lastSync: '2024-03-20T10:30:00',
            },
            {
                type: 'GraphQL',
                environment: 'staging',
                status: 'inactive',
                healthStatus: 'warning',
                lastSync: '2024-03-19T15:45:00',
            }
        ]
    },
    {
        id: '2',
        name: 'Proxy Integration',
        status: 'active',
        lastSync: '2024-03-20T09:15:00',
        integrations: [
            {
                type: 'File Upload',
                environment: 'prod',
                status: 'active',
                healthStatus: 'healthy',
                lastSync: '2024-03-20T09:15:00',
            }
        ]
    }
];

interface DeleteConfirmationDialogProps {
    open: boolean;
    onClose: () => void;
    onConfirm: () => void;
    productName: string;
}

const DeleteConfirmationDialog = ({ open, onClose, onConfirm, productName }: DeleteConfirmationDialogProps) => (
    <Dialog open={open} onClose={onClose}>
        <DialogTitle>Delete Product Configuration</DialogTitle>
        <DialogContent>
            <Typography>
                Are you sure you want to delete the configuration for {productName}? This action cannot be undone.
            </Typography>
            <Alert severity="warning" sx={{ mt: 2 }}>
                This will remove all integration configurations and stop any active syncs.
            </Alert>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>Cancel</Button>
            <Button onClick={onConfirm} color="error" variant="contained">
                Delete
            </Button>
        </DialogActions>
    </Dialog>
);

const ConfiguredProducts = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [selectedProduct, setSelectedProduct] = useState<ConfiguredProduct | null>(null);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    const handleMenuClick = (event: React.MouseEvent<HTMLElement>, product: ConfiguredProduct) => {
        setAnchorEl(event.currentTarget);
        setSelectedProduct(product);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        setSelectedProduct(null);
    };

    const handleDeleteClick = () => {
        handleMenuClose();
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        // Implement delete logic here
        console.log('Deleting product:', selectedProduct?.name);
        setDeleteDialogOpen(false);
        setSelectedProduct(null);
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'healthy':
                return 'success';
            case 'warning':
                return 'warning';
            case 'error':
                return 'error';
            default:
                return 'default';
        }
    };

    const getStatusChip = (integration: Integration) => (
        <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <Chip
                size="small"
                label={integration.status === 'active' ? 'Active' : 'Inactive'}
                color={integration.status === 'active' ? 'success' : 'default'}
            />
            <Chip
                size="small"
                label={integration.healthStatus.charAt(0).toUpperCase() + integration.healthStatus.slice(1)}
                color={getStatusColor(integration.healthStatus)}
            />
        </Box>
    );

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                <Typography variant="h4" component="h1">
                    Configured Products
                </Typography>
                <Button
                    variant="contained"
                    onClick={() => navigate('/integration-catalog')}
                >
                    Configure New Product
                </Button>
            </Box>

            <Grid container spacing={3}>
                {mockConfiguredProducts.map((product) => (
                    <Grid item xs={12} key={product.id}>
                        <Card sx={{ p: 3 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                                <Box>
                                    <Typography variant="h6" component="h2">
                                        {product.name}
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Last Sync: {new Date(product.lastSync).toLocaleString()}
                                    </Typography>
                                </Box>
                                <IconButton
                                    onClick={(e) => handleMenuClick(e, product)}
                                    size="small"
                                >
                                    <MoreVertIcon />
                                </IconButton>
                            </Box>

                            <Grid container spacing={2}>
                                {product.integrations.map((integration, index) => (
                                    <Grid item xs={12} md={6} key={index}>
                                        <Card variant="outlined" sx={{ p: 2 }}>
                                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                                                <Typography variant="subtitle1">
                                                    {integration.type}
                                                </Typography>
                                                {getStatusChip(integration)}
                                            </Box>
                                            <Typography variant="body2" color="text.secondary" gutterBottom>
                                                Environment: {integration.environment}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                Last Sync: {new Date(integration.lastSync).toLocaleString()}
                                            </Typography>
                                            <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                                                <Button
                                                    size="small"
                                                    startIcon={integration.status === 'active' ? <StopIcon /> : <PlayArrowIcon />}
                                                    variant="outlined"
                                                >
                                                    {integration.status === 'active' ? 'Stop' : 'Start'}
                                                </Button>
                                                <Button
                                                    size="small"
                                                    startIcon={<RefreshIcon />}
                                                    variant="outlined"
                                                >
                                                    Sync Now
                                                </Button>
                                                <Button
                                                    size="small"
                                                    startIcon={<EditIcon />}
                                                    variant="outlined"
                                                >
                                                    Edit
                                                </Button>
                                            </Box>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
            >
                <MenuItem onClick={() => {
                    handleMenuClose();
                    navigate(`/integration-catalog?product=${selectedProduct?.id}`);
                }}>
                    <EditIcon fontSize="small" sx={{ mr: 1 }} />
                    Add Integration
                </MenuItem>
                <MenuItem onClick={handleDeleteClick} sx={{ color: 'error.main' }}>
                    <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
                    Delete Configuration
                </MenuItem>
            </Menu>

            <DeleteConfirmationDialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                onConfirm={handleDeleteConfirm}
                productName={selectedProduct?.name || ''}
            />
        </Container>
    );
};

export default ConfiguredProducts; 
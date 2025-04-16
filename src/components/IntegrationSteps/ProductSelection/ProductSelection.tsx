import {
    Box,
    Typography,
    Card,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
    padding: theme.spacing(3),
    marginBottom: theme.spacing(2),
    borderRadius: '10px',
    boxShadow: 'none',
    border: '1px solid #e6e6e9',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    '&:hover': {
        borderColor: theme.palette.primary.main,
    },
    '&.selected': {
        borderColor: theme.palette.primary.main,
        backgroundColor: '#F8F9FF',
    },
}));

interface ProductSelectionProps {
    selectedProduct: string;
    onProductSelect: (product: string) => void;
}

const products = [
    {
        id: 'srm',
        name: 'SRM (Supplier Relationship Management)',
        description: 'Manage and optimize your supplier relationships with our comprehensive SRM solution.',
        features: [
            'Supplier onboarding and management',
            'Performance tracking',
            'Risk assessment',
            'Contract management'
        ]
    },
    {
        id: 'proxy',
        name: 'Proxy Integration',
        description: 'Secure and efficient proxy integration for seamless data exchange and API management.',
        features: [
            'API security',
            'Request routing',
            'Load balancing',
            'Rate limiting'
        ]
    }
];

const ProductSelection = ({ selectedProduct, onProductSelect }: ProductSelectionProps) => {
    return (
        <Box>
            <Typography variant="h6" gutterBottom>
                Select a Product
            </Typography>
            <Typography color="textSecondary" sx={{ mb: 3 }}>
                Choose the product you want to integrate with your system
            </Typography>

            <FormControl component="fieldset">
                <RadioGroup
                    value={selectedProduct}
                    onChange={(e) => onProductSelect(e.target.value)}
                >
                    <Grid container spacing={2}>
                        {products.map((product) => (
                            <Grid item xs={12} key={product.id}>
                                <StyledCard className={selectedProduct === product.id ? 'selected' : ''}>
                                    <Box sx={{ display: 'flex', alignItems: 'flex-start' }}>
                                        <FormControlLabel
                                            value={product.id}
                                            control={<Radio />}
                                            label=""
                                            sx={{ mr: 1 }}
                                        />
                                        <Box>
                                            <Typography variant="subtitle1" fontWeight="500">
                                                {product.name}
                                            </Typography>
                                            <Typography color="textSecondary" sx={{ mt: 1 }}>
                                                {product.description}
                                            </Typography>
                                            <Box sx={{ mt: 2 }}>
                                                <Typography variant="subtitle2" gutterBottom>
                                                    Key Features:
                                                </Typography>
                                                <Grid container spacing={1}>
                                                    {product.features.map((feature, index) => (
                                                        <Grid item xs={12} sm={6} key={index}>
                                                            <Typography
                                                                variant="body2"
                                                                color="textSecondary"
                                                                sx={{
                                                                    display: 'flex',
                                                                    alignItems: 'center',
                                                                    '&:before': {
                                                                        content: '"•"',
                                                                        marginRight: 1,
                                                                        color: 'primary.main'
                                                                    }
                                                                }}
                                                            >
                                                                {feature}
                                                            </Typography>
                                                        </Grid>
                                                    ))}
                                                </Grid>
                                            </Box>
                                        </Box>
                                    </Box>
                                </StyledCard>
                            </Grid>
                        ))}
                    </Grid>
                </RadioGroup>
            </FormControl>
        </Box>
    );
};

export default ProductSelection; 
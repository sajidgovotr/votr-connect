import { Box, Grid, Typography } from '@mui/material';
import ProductCard from '@/components/ProductSelection/ProductCard';
import { FaUserFriends, FaExchangeAlt, FaFileAlt } from 'react-icons/fa';
import useExpressIntegrationLandingStyles from './ExpressIntegrationLanding.style';
import { useNavigate } from "react-router";

const products = [
  {
    id: "48f36b4e-e9fe-4428-92fe-adf939f5a384",
    key: 'srm',
    icon: <FaUserFriends color="#6366F1" size={48} />,
    image: '/images/SRM.png',
    title: 'Shareholder Relationship Management (SRM)',
    description: 'Manage and optimize your shareholder relationships with our comprehensive SRM solution.',
    disabled: false,
  },
  {
    id: "65f6166d-0a0a-4a4b-8a6d-5fe3e776adff",
    key: 'proxy',
    icon: <FaExchangeAlt color="#6366F1" size={48} />,
    image: '/images/Proxy.png',
    title: 'Proxy Integration',
    description: 'Secure and efficient proxy integration for seamless data exchange and API management.',
    disabled: false,
  },
  {
    key: 'post-sale',
    icon: <FaFileAlt color="#6366F1" size={48} />,
    image: '/images/PostSale.png',
    title: 'Post Sale',
    description: 'Aute est ex incididunt cillum pariatur fugiat non aliqua enim consectetur ipsum. Enim cupidatat ipsum id.',
    disabled: true,
  },
];

const ExpressIntegrationLanding = () => {
  const classes = useExpressIntegrationLandingStyles();
  const navigate = useNavigate();

  return (
    <Box className={classes.container}>
      <Typography variant="h4" fontWeight={400} className={classes.title}>
        Select a product
      </Typography>
      <Typography className={classes.subtitle}>
        Choose the product you want to integrate with your system
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={12} sm={6} md={4} key={product.key} sx={{ display: 'flex', justifyContent: 'center' }}>
            <ProductCard
              image={product.image}
              title={product.title}
              description={product.description}
              onClick={() => {
                navigate('/express-integration/integration-methods', { state: { productId: product.id } });
              }}
              disabled={product.disabled}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ExpressIntegrationLanding; 
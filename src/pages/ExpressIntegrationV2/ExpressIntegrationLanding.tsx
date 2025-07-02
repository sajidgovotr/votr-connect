import { Box, Grid, Typography, CircularProgress, Alert } from '@mui/material';
import ProductCard from '@/components/ProductSelection/ProductCard';
import { FaUserFriends, FaExchangeAlt, FaFileAlt } from 'react-icons/fa';
import useExpressIntegrationLandingStyles from './ExpressIntegrationLanding.style';
import { useNavigate } from "react-router";
import { useGetProductsQuery } from '@/services/express-integration';

// Utility function to map product names to images and icons
const getProductAssets = (productName: string) => {
  const name = productName.toLowerCase();
  
  if (name.includes('srm') || name.includes('shareholder')) {
    return {
      image: '/images/SRM.png',
      icon: <FaUserFriends color="#6366F1" size={48} />
    };
  }
  
  if (name.includes('proxy')) {
    return {
      image: '/images/Proxy.png',
      icon: <FaExchangeAlt color="#6366F1" size={48} />
    };
  }
  
  if (name.includes('post-sale') || name.includes('post sale')) {
    return {
      image: '/images/PostSale.png',
      icon: <FaFileAlt color="#6366F1" size={48} />
    };
  }
  
  // Default fallback
  return {
    image: '/images/SRM.png',
    icon: <FaUserFriends color="#6366F1" size={48} />
  };
};

const ExpressIntegrationLanding = () => {
  const classes = useExpressIntegrationLandingStyles();
  const navigate = useNavigate();
  const { data: productsResponse, isLoading, error } = useGetProductsQuery();

  if (isLoading) {
    return (
      <Box className={classes.container} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box className={classes.container}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Error loading products. Please try again later.
        </Alert>
      </Box>
    );
  }

  const products = productsResponse?.data || [];

  return (
    <Box className={classes.container}>
      <Typography variant="h4" fontWeight={400} className={classes.title}>
        Select a product
      </Typography>
      <Typography className={classes.subtitle}>
        Choose the product you want to integrate with your system
      </Typography>
      <Grid container spacing={3} justifyContent="center">
        {products.map((product) => {
          const assets = getProductAssets(product.name);
          return (
            <Grid item xs={12} sm={6} md={4} key={product.id} sx={{ display: 'flex', justifyContent: 'center' }}>
              <ProductCard
                image={assets.image}
                title={product.name}
                description={product.description}
                onClick={() => {
                  navigate(`/express-integration/${product.id}/integration-methods`);
                }}
                disabled={false}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

export default ExpressIntegrationLanding; 
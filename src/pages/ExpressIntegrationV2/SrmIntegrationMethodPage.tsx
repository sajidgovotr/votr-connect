import { Box, Grid, Typography, Chip, Paper } from '@mui/material';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { useParams } from 'react-router';
import NavigationCard from '@/components/NavigationCard/NavigationCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import summaryBanner from '../../../public/images/SRM_Background.png';
import { CloudUpload } from '@mui/icons-material';
import SftpIntegrationStepper from './SftpIntegrationStepper';
import ApiIntegrationStepper from './ApiIntegrationStepper';
import { useState } from 'react';
import { useGetProductsQuery, useGetIntegrationMethodsQuery } from '@/services/express-integration';

const SrmIntegrationMethodPage = () => {
  const [showSftpStepper, setShowSftpStepper] = useState(false);
  const [showApiStepper, setShowApiStepper] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const { productId } = useParams();
  const { data, isLoading, error } = useGetProductsQuery();
  const products = data?.data || [];
  const selectedProduct = products.find(p => p.id === productId);
  const { data: integrationMethodsData, isLoading: methodsLoading, error: methodsError } = useGetIntegrationMethodsQuery();
  const integrationMethods = integrationMethodsData?.data || [];
  const selectedMethod = integrationMethods.find((m: any) => m.id === selectedMethodId);

  const handleSelect = (method: any) => {
    setSelectedMethodId(method.id);
    if (method.code === 'file-upload') {
      setShowSftpStepper(true);
    } else if (method.code === 'rest-api') {
      setShowApiStepper(true);
    }
  };

  const getMethodIcon = (code: string) => {
    if (code === 'rest-api') return <FaCloudDownloadAlt color="#6366F1" size={40} />;
    if (code === 'file-upload') return <CloudUpload />;
    return <FaCloudDownloadAlt color="#6366F1" size={40} />; // fallback
  };

  const breadcrumbs = (
    <Breadcrumbs
      data={[
        { name: 'Express Integration', url: '/express-integration', active: false },
        { name: selectedProduct?.name || 'Product', url: '', active: false },
        { name: selectedMethod?.methodName || 'Integration Method', url: '', active: true },
      ]}
      onItemClick={(_, idx) => {
        if (idx === 1) {
          setSelectedMethodId(null);
          setShowSftpStepper(false);
          setShowApiStepper(false);
        }
      }}
    />
  );

  if (showSftpStepper) {
    return <>
      <Box maxWidth="md" mx="auto" width={1} mt={6}>
        {breadcrumbs}
      </Box>
      <SftpIntegrationStepper
        onBackToMethods={() => setShowSftpStepper(false)}
        integrationMethodId={selectedMethodId}
        primaryHeading={selectedProduct?.name || ''}
        primarySubheading={selectedProduct?.description || ''}
      />
    </>;
  }

  if (showApiStepper) {
    return <>
      <Box maxWidth="md" mx="auto" width={1} mt={6}>
        {breadcrumbs}
      </Box>
      <ApiIntegrationStepper
        onBackToMethods={() => setShowApiStepper(false)}
        integrationMethodId={selectedMethodId}
        primaryHeading={selectedProduct?.name || ''}
        primarySubheading={selectedProduct?.description || ''}
      />;
    </>
  }

  return (
    <Box px={{ xs: 1, md: 4 }} py={6}>
      <Box maxWidth="md" mx={"auto"}>
        {/* Breadcrumbs */}
        <Box mb={3}>
          <Breadcrumbs
            data={[
              { name: 'Express Integration', url: '/express-integration', active: false },
              { name: selectedProduct?.name || '', url: '', active: true },
            ]}
          />
        </Box>

        <Paper
          elevation={0}
          sx={{
            mb: 5,
            borderRadius: 1,
            p: { xs: 1.5, md: 3 },
            textAlign: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
            backdropFilter: 'blur(6px)',
            border: '1px solid #e0e0e0',
            overflow: 'hidden',
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center" gap={2}>
            {/* Image */}
            <Box
              component="img"
              src={summaryBanner}
              alt="SRM Illustration"
              sx={{
                width: '100%',
                maxWidth: '100%', // or whatever max width you want
                height: '280px',
                borderRadius: 2,
                background: '#e0e7ff',
                display: 'block',
                margin: '0 auto'
              }}
            />

            {/* Title */}
            <Typography variant="h5" fontWeight={600}>
              {selectedProduct?.name}
            </Typography>

            {/* Description */}
            <Typography variant="body1" maxWidth={700}>
              {selectedProduct?.description}
            </Typography>
          </Box>
        </Paper>

        {/* Integration Methods */}
        <Typography variant="subtitle1" fontWeight={500} mb={2} style={{ color: '#030712', fontSize: '20px' }}>
          Choose Integration Method
        </Typography>

        <Grid container spacing={3}>
          {integrationMethods.map((method: any) => (
            <Grid item xs={12} md={12} key={method.id}>
              <Box
                sx={{
                  p: 3,
                  borderRadius: 1,
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                  backdropFilter: 'blur(6px)',
                  border: '1px solid #e0e0e0',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <NavigationCard
                  icon={getMethodIcon(method.code)}
                  title={
                    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                      <Typography variant="h6" style={{ color: '#030712' }}>
                        {method.methodName}
                      </Typography>
                      {method.status === 'Recommended' && (
                        <Chip
                          label={method.status}
                          size="small"
                          sx={{
                            backgroundColor: '#DCFCE7',
                            color: '#15803D',
                            fontWeight: 500,
                            borderRadius: '6px',
                            height: 24,
                          }}
                        />
                      )}
                      {method.status === 'ComingSoon' && (
                        <Chip
                          label={'Coming Soon'}
                          size="small"
                          sx={{ backgroundColor: '#FEE2E2', color: '#991B1B', fontWeight: 500, borderRadius: '6px', height: 24 }}
                        />
                      )}
                    </Box>
                  }
                  subtitle={method.description}
                  onClick={() => handleSelect(method)}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default SrmIntegrationMethodPage;

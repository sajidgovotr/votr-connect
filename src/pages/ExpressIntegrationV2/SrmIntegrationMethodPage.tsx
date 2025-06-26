import { Box, Grid, Typography, Chip, Paper } from '@mui/material';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import NavigationCard from '@/components/NavigationCard/NavigationCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import summaryBanner from '../../../public/images/SRM_Background.png';
import { CloudUpload } from '@mui/icons-material';
import SftpIntegrationStepper from './SftpIntegrationStepper';
import ApiIntegrationStepper from './ApiIntegrationStepper';
import { useState } from 'react';

const integrationMethods = [
  {
    key: 'api',
    icon: <FaCloudDownloadAlt color="#6366F1" size={40} />,
    title: 'Automated API Integration (Pull Mode)',
    description: 'VOTR automatically retrieves daily shareholder position data from your API',
    badgeText: 'Recommended',
  },
  {
    key: 'sftp',
    icon: <CloudUpload />,
    title: 'SFTP File Transfer',
    description: 'Securely upload daily shareholder position files to the VOTR Connect SFTP server',
    badgeText: null,
  },
];

const SrmIntegrationMethodPage = () => {
  const [showSftpStepper, setShowSftpStepper] = useState(false);
  const [showApiStepper, setShowApiStepper] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (key: string) => {
    if (key === 'sftp') {
      setShowSftpStepper(true);
    } else if (key === 'api') {
      setShowApiStepper(true);
    } else {
      navigate(`/express-integration/srm/${key}`);
    }
  };

  if (showSftpStepper) {
    return <SftpIntegrationStepper onBackToMethods={() => setShowSftpStepper(false)} />;
  }

  if (showApiStepper) {
    return <ApiIntegrationStepper onBackToMethods={() => setShowApiStepper(false)} />;
  }

  return (
    <Box px={{ xs: 1, md: 4 }} py={6}>
      <Box maxWidth="md" mx={"auto"}>
        {/* Breadcrumbs */}
        <Box mb={3}>
          <Breadcrumbs
            data={[
              { name: 'Express Integration', url: '/express-integration', active: false },
              { name: 'Shareholder Relationship Management (SRM)', url: '', active: true },
            ]}
          />
        </Box>

        <Paper
          elevation={0}
          sx={{
            mb: 5,
            borderRadius: 1,
            p: { xs: 1.5, md: 3 }, // reduced padding
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
              Shareholder Relationship Management (SRM)
            </Typography>

            {/* Description */}
            <Typography variant="body1" maxWidth={700}>
              Manage and optimize your shareholder relationships with our comprehensive SRM solution.
            </Typography>
          </Box>
        </Paper>



        {/* Integration Methods */}
        <Typography variant="subtitle1" fontWeight={500} mb={2} style={{ color: '#030712', fontSize: '20px' }}>
          Choose Integration Method
        </Typography>

        <Grid container spacing={3}>
          {integrationMethods.map((method) => (
            <Grid item xs={12} md={12} key={method.key}>
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
                  icon={method.icon}
                  title={
                    <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                      <Typography variant="h6" style={{ color: '#030712' }}>
                        {method.title}
                      </Typography>
                      {method.badgeText && (
                        <Chip
                          label={method.badgeText}
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
                    </Box>
                  }

                  subtitle={method.description
                  }
                  onClick={() => handleSelect(method.key)}
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

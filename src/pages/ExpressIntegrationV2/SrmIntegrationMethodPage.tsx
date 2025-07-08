import { Box, Grid, Typography, Chip, Paper } from '@mui/material';
import { FaCloudDownloadAlt } from 'react-icons/fa';
import { useParams, useLocation } from 'react-router';
import NavigationCard from '@/components/NavigationCard/NavigationCard';
import Breadcrumbs from '@/components/Breadcrumbs';
import summaryBanner from '../../../public/images/SRM_Background.png';
import { CloudUpload } from '@mui/icons-material';
import SftpIntegrationStepper from './SftpIntegrationStepper';
import ApiIntegrationStepper from './ApiIntegrationStepper';
import { useState } from 'react';
import { useGetProductsQuery, useGetIntegrationMethodsQuery, useGetIntegrationWithDetailsByIdQuery } from '@/services/express-integration';

const SrmIntegrationMethodPage = () => {
  const [showSftpStepper, setShowSftpStepper] = useState(false);
  const [showApiStepper, setShowApiStepper] = useState(false);
  const [selectedMethodId, setSelectedMethodId] = useState<string | null>(null);
  const { productId } = useParams();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const integrationId = query.get('integrationId');
  const { data } = useGetProductsQuery();
  const products = data?.data || [];
  const selectedProduct = products.find(p => p.id === productId);
  const { data: integrationMethodsData } = useGetIntegrationMethodsQuery();
  const integrationMethods = integrationMethodsData?.data || [];
  const selectedMethod = integrationMethods.find((m: any) => m.id === selectedMethodId);
  const { data: integrationByIdData } = useGetIntegrationWithDetailsByIdQuery(integrationId!, { skip: !integrationId, refetchOnMountOrArgChange: true });
  const integration = integrationByIdData?.data;

  console.log("integration====>", integration);

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
        { 
          name: selectedProduct?.name || 'Product', 
          url: '', 
          active: false,
          onItemClick: () => {
            setSelectedMethodId(null);
            setShowSftpStepper(false);
            setShowApiStepper(false);
          }
        },
        { name: selectedMethod?.methodName || 'Integration Method', url: '', active: true },
      ]}
    />
  );

  function mapIntegrationToInitialValues(integration: any) {
    if (!integration) return undefined;
    const getConfig = (key: string) => integration.config?.find((c: any) => c.configKey === key)?.configValue || '';
    const getAuth = (key: string) => integration.auth?.find((a: any) => a.authKey === key)?.authValue || '';

    // API Integration
    if (integration.integrationMethod?.code === 'rest-api') {
      let baseUrl = getConfig('baseUrl');
      if (baseUrl.startsWith('https://')) baseUrl = baseUrl.replace(/^https:\/\//, '');
      if (baseUrl.startsWith('http://')) baseUrl = baseUrl.replace(/^http:\/\//, '');

      const rawFields = getConfig('dataFields') ? JSON.parse(getConfig('dataFields')) : [];
      const fields = rawFields.map((f: any) => ({
        mapping: f.mapping || '',
        fieldName: f.fieldName || f.name || '',
        type: f.type || '',
        required: typeof f.required === 'boolean' ? f.required : false,
      }));

      return {
        id: integration.id,
        integrationName: integration.name || '',
        baseUrl,
        httpMethod: getConfig('httpMethod') || 'GET',
        environment:
          integration.environment === 'DEVELOPMENT'
            ? 'Development'
            : integration.environment === 'STAGING'
            ? 'Staging'
            : integration.environment === 'PRODUCTION'
            ? 'Production'
            : 'Development',
        dataFormat: getConfig('dataFormat') || 'json',
        schemaName: getConfig('schemaName') || '',
        endpoint: getConfig('endpoint') || '',
        dataFields: fields,
        authMethod: getAuth('authMethod') || 'api_key',
        apiKey: getAuth('apiKey') || '',
        bearerToken: getAuth('bearerToken') || '',
        username: getAuth('username') || '',
        password: getAuth('password') || '',
        oauthClientId: getAuth('oauthClientId') || '',
        oauthClientSecret: getAuth('oauthClientSecret') || '',
        oauthTokenUrl: getAuth('oauthTokenUrl') || '',
      };
    }

    // SFTP Integration
    if (integration.integrationMethod?.code === 'file-upload') {
      const rawFields = getConfig('dataFields') ? JSON.parse(getConfig('dataFields')) : [];
      const fields = rawFields.map((f: any) => ({
        mapping: f.mapping || '',
        fieldName: f.fieldName || f.name || '',
        type: f.type || '',
        required: typeof f.required === 'boolean' ? f.required : false,
      }));
      let env = getConfig('environment') || integration.environment || 'Development';
      if (env === 'DEVELOPMENT') env = 'Development';
      else if (env === 'STAGING') env = 'Staging';
      else if (env === 'PRODUCTION') env = 'Production';
      return {
        id: integration.id,
        integrationName: integration.name || '',
        environment: env,
        timeZone: getConfig('timeZone') || '',
        fileType: getConfig('fileType') || 'CSV',
        fileNamePattern: getConfig('fileNamePattern') || '',
        maxFileSize: Number(getConfig('maxFileSize')) || 30,
        fileSizeUnit: getConfig('fileSizeUnit') || 'Mb',
        hasHeader: getConfig('hasHeader') === 'true',
        protocol: getConfig('protocol') || 'FTP/SFTP',
        type: getConfig('type') || 'SFTP',
        host: getConfig('host') || '',
        port: getConfig('port') || '',
        schedule: getConfig('schedule') || 'Daily',
        timeOfDay: getConfig('timeOfDay') || '',
        username: getAuth('username') || '',
        sshKey: getAuth('sshKey') || '',
        passphrase: getAuth('passphrase') || '',
        dataFields: fields,
      };
    }
    return {};
  }

  function shapeSftpInitialValues(flat: any) {
    return {
      id: flat.id,
      basicInfo: {
        integrationName: flat.integrationName || '',
        environment: flat.environment || 'Development',
        timeZone: flat.timeZone || ''
      },
      fileConfig: {
        fileType: flat.fileType || 'CSV',
        fileNamePattern: flat.fileNamePattern || '',
        maxFileSize: typeof flat.maxFileSize === 'number' ? flat.maxFileSize : Number(flat.maxFileSize) || 30,
        fileSizeUnit: flat.fileSizeUnit || 'Mb',
        hasHeader: typeof flat.hasHeader === 'boolean' ? flat.hasHeader : flat.hasHeader === 'true'
      },
      dataSchema: {
        fields: flat.dataFields || []
      },
      transferSettings: {
        protocol: flat.protocol || 'FTP/SFTP',
        type: flat.type || 'SFTP',
        host: flat.host || '',
        port: flat.port || '',
        userName: flat.username || flat.userName || '',
        sshKey: flat.sshKey || '',
        passphrase: flat.passphrase || '',
        schedule: flat.schedule || 'Daily',
        timeOfDay: flat.timeOfDay || ''
      }
    };
  }

  const editMode = !!integrationId && !!integration;

  if (editMode && integration.integrationMethod?.code === 'file-upload') {
    if (!showSftpStepper) setShowSftpStepper(true);
    if (!selectedMethodId) setSelectedMethodId(integration.integrationMethod.id);
  }
  if (editMode && integration.integrationMethod?.code === 'rest-api') {
    if (!showApiStepper) setShowApiStepper(true);
    if (!selectedMethodId) setSelectedMethodId(integration.integrationMethod.id);
  }

  if (showSftpStepper) {
    const flat = editMode ? mapIntegrationToInitialValues(integration) : undefined;
    const initialValues = flat ? shapeSftpInitialValues(flat) : undefined;
    return <>
      <Box maxWidth="md" mx="auto" width={1} mt={6}>
        {breadcrumbs}
      </Box>
      <SftpIntegrationStepper
        onBackToMethods={() => setShowSftpStepper(false)}
        integrationMethodId={selectedMethodId}
        primaryHeading={selectedProduct?.name || ''}
        primarySubheading={selectedProduct?.description || ''}
        initialValues={initialValues}
        editMode={editMode}
      />
    </>;
  }

  if (showApiStepper) {
    const initialValues = editMode ? mapIntegrationToInitialValues(integration) : undefined;
    return <>
      <Box maxWidth="md" mx="auto" width={1} mt={6}>
        {breadcrumbs}
      </Box>
      <ApiIntegrationStepper
        onBackToMethods={() => setShowApiStepper(false)}
        integrationMethodId={selectedMethodId}
        primaryHeading={selectedProduct?.name || ''}
        primarySubheading={selectedProduct?.description || ''}
        initialValues={initialValues}
        editMode={editMode}
      />
    </>;
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

import { Box } from '@mui/material';
import { useState } from 'react';
import Breadcrumbs from '@/components/Breadcrumbs';
import SrmHeaderBanner from './SrmHeaderBanner';
import StepBar from './StepBar';
import SftpStepBasicInfo from './SftpStepBasicInfo';
import SftpStepFileConfig from './SftpStepFileConfig';
import SftpStepDataSchema from './SftpStepDataSchema';
import SftpStepTransferSettings from './SftpStepTransferSettings';

const steps = [
  'Basic Info',
  'File Config',
  'Data Schema',
  'Transfer Settings',
];

interface SftpIntegrationStepperProps {
  onBackToMethods?: () => void;
  integrationMethodId?: string | null;
  productId?: string;
}

const SftpIntegrationStepper = ({ onBackToMethods, integrationMethodId, productId }: SftpIntegrationStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<any>(null);
  const [fileConfig, setFileConfig] = useState<any>(null);
  const [dataSchema, setDataSchema] = useState<any>(null);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleBackToMethods = () => {
    if (onBackToMethods) onBackToMethods();
  };

  return (
    <Box maxWidth="md" mx="auto" py={4} width={1}>
      <Box mb={3}>
        <Breadcrumbs
          data={[
            { name: 'Express Integration', url: '/express-integration', active: false },
            { name: 'Shareholder Relationship Management (SRM)', url: '', active: true },
          ]}
        />
      </Box>
      {/* 2. Header Banner */}
      <SrmHeaderBanner heading='SFTP File Transfer' subheading='Securely upload daily shareholder position files to the VOTR Connect SFTP server' />
      {/* 3. Custom Step Bar */}
      <StepBar steps={steps} activeStep={activeStep} />
      {/* 4. Step Content */}
      <Box mt={4}>
        {activeStep === 0 && <SftpStepBasicInfo onNext={(data: any) => { setBasicInfo(data); handleNext(); }} onBack={handleBackToMethods} />}
        {activeStep === 1 && <SftpStepFileConfig onNext={(data: any) => { setFileConfig(data); handleNext(); }} onBack={handleBack} />}
        {activeStep === 2 && <SftpStepDataSchema onNext={(data: any) => { setDataSchema(data); handleNext(); }} onBack={handleBack} />}
        {activeStep === 3 && <SftpStepTransferSettings onBack={handleBack} basicInfo={basicInfo} fileConfig={fileConfig} dataSchema={dataSchema} integrationMethodId={integrationMethodId} productId={productId} />}
      </Box>
    </Box>
  );
};

export default SftpIntegrationStepper; 
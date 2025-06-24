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

const SftpIntegrationStepper = ({ onBackToMethods }: { onBackToMethods?: () => void }) => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleBackToMethods = () => {
    if (onBackToMethods) onBackToMethods();
  };

  return (
    <Box maxWidth="md" mx="auto" py={4}>
      <Box mb={3}>
        <Breadcrumbs
          data={[
            { name: 'Express Integration', url: '/express-integration', active: false },
            { name: 'Shareholder Relationship Management (SRM)', url: '', active: true },
          ]}
        />
      </Box>
      {/* 2. Header Banner */}
      <SrmHeaderBanner />
      {/* 3. Custom Step Bar */}
      <StepBar steps={steps} activeStep={activeStep} />
      {/* 4. Step Content */}
      <Box mt={4}>
        {activeStep === 0 && <SftpStepBasicInfo onNext={handleNext} onBack={handleBackToMethods} />}
        {activeStep === 1 && <SftpStepFileConfig onNext={handleNext} onBack={handleBack} />}
        {activeStep === 2 && <SftpStepDataSchema onNext={handleNext} onBack={handleBack} />}
        {activeStep === 3 && <SftpStepTransferSettings onBack={handleBack} />}
      </Box>
    </Box>
  );
};

export default SftpIntegrationStepper; 
import { Box } from '@mui/material';
import { useState, useEffect } from 'react';
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
  primaryHeading: string;
  primarySubheading: string;
  initialValues?: any;
  editMode?: boolean;
}

const SftpIntegrationStepper = ({ onBackToMethods, integrationMethodId, primaryHeading, primarySubheading, initialValues, editMode }: SftpIntegrationStepperProps) => {
  const [activeStep, setActiveStep] = useState(0);
  const [basicInfo, setBasicInfo] = useState<any>(null);
  const [fileConfig, setFileConfig] = useState<any>(null);
  const [dataSchema, setDataSchema] = useState<any>(null);

  useEffect(() => {
    if (editMode && initialValues) {
      setBasicInfo(initialValues.basicInfo || initialValues || null);
      setFileConfig(initialValues.fileConfig || initialValues || null);
      setDataSchema(initialValues.dataSchema || null);
    }
  }, [editMode, initialValues]);

  const handleNext = () => setActiveStep((prev) => prev + 1);
  const handleBack = () => setActiveStep((prev) => prev - 1);
  const handleBackToMethods = () => {
    if (onBackToMethods) onBackToMethods();
  };

  return (
    <Box maxWidth="md" mx="auto" py={4} width={1}>
      {/* 2. Header Banner */}
      <SrmHeaderBanner
        primaryHeading={primaryHeading}
        primarySubheading={primarySubheading}
        secondaryHeading='SFTP File Transfer'
        secondarySubheading='Securely upload daily shareholder position files to the VOTR Connect SFTP server'
      />
      {/* 3. Custom Step Bar */}
      <StepBar steps={steps} activeStep={activeStep} />
      {/* 4. Step Content */}
      <Box mt={4}>
        {activeStep === 0 && <SftpStepBasicInfo onNext={(data: any) => { setBasicInfo(data); handleNext(); }} onBack={handleBackToMethods} initialValues={initialValues?.basicInfo} />}
        {activeStep === 1 && <SftpStepFileConfig onNext={(data: any) => { setFileConfig(data); handleNext(); }} onBack={handleBack} initialValues={fileConfig} />}
        {activeStep === 2 && <SftpStepDataSchema onNext={(data: any) => { setDataSchema(data); handleNext(); }} onBack={handleBack} initialValues={dataSchema} />}
        {activeStep === 3 && <SftpStepTransferSettings onBack={handleBack} basicInfo={basicInfo} fileConfig={fileConfig} dataSchema={dataSchema} integrationMethodId={integrationMethodId} initialValues={initialValues?.transferSettings} editMode={editMode} integrationId={initialValues?.id} />}
      </Box>
    </Box>
  );
};

export default SftpIntegrationStepper; 
import { Box, Typography } from '@mui/material';
import Card from '@/components/Card';
import CustomButton from '@/components/CustomButton';
import SendingEmailLogo from '@/assets/images/sending-email-logo.png';
import { FiPlus } from 'react-icons/fi';
import AddDomainModal from './AddDomainModal';
import { useState } from 'react';

interface DomainEmptyStateProps {
    onAddDomain: (data: { domain: string }) => void;
}

const DomainEmptyState: React.FC<DomainEmptyStateProps> = ({ onAddDomain }) => {
    const [modalOpen, setModalOpen] = useState(false);
    return (
        <Box className="flex items-center justify-center min-h-[60vh] w-full">
            <Card className="bg-white max-w-lg w-full mx-auto flex flex-col items-center !p-7">
                <img src={SendingEmailLogo} alt="Sending Email" className="w-20 h-20 object-contain" />
                <Typography variant="h5" fontWeight={500} className="text-center">
                    Sending from your Email Address
                </Typography>
                <Typography color="#A0AEC0" className="text-center !mb-8" fontSize={12}>
                    Requires that you verify your domain by adding a DNS record. Deserunt incididunt minim dolore in duis dolore reprehenderit commodo duis sit
                </Typography>
                <CustomButton
                    title={'Add Domain'}
                    variant="contained"
                    className="!rounded-lg !px-6 !py-2 !text-base !font-semibold flex items-center gap-2 mx-auto"
                    startIcon={<FiPlus />}
                    onClick={() => setModalOpen(true)}
                />
            </Card>
            <AddDomainModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                onAdd={(data) => {
                    setModalOpen(false);
                    onAddDomain(data);
                }}
            />
        </Box>
    );
};

export default DomainEmptyState; 
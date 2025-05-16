import Modal from '@/components/Modal';
import Input from '@/components/Textfields/input';
import CustomButton from '@/components/CustomButton';
import { Box, Typography, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import SendingEmailLogo from '@/assets/images/sending-email-logo.png';

const schema = yup.object().shape({
    domain: yup.string()
        .required('Domain is required')
        .matches(
            /^(?!-)[A-Za-z0-9-]{1,63}(?<!-)\.[A-Za-z]{2,6}$/,
            'Enter a valid domain (e.g. votr.com)'
        ),
});

interface AddDomainModalProps {
    open: boolean;
    onClose: () => void;
    onAdd: (data: any) => void;
    initialValues?: any;
}

const AddDomainModal: React.FC<AddDomainModalProps> = ({ open, onClose, onAdd, initialValues }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues || { domain: '' },
    });

    return (
        <Modal open={open} onClose={onClose} maxWidth="sm">
            <form onSubmit={handleSubmit(onAdd)}>
                <Box className="!rounded-2xl !bg-white !p-0" sx={{ overflow: 'hidden' }}>
                    {/* Header */}
                    <Box className="!flex !items-center !justify-between !px-3 !pt-8 !pb-4 !bg-[#F6F7FF]">
                        <Stack direction="row" alignItems="center" justifyContent={"center"} spacing={2}>
                            <img src={SendingEmailLogo} alt="Update Info" className="!w-24 !h-26 !mt-5" />
                            <Typography variant="h5" fontWeight={700} className="!text-[1.5rem]">Add Your Domain</Typography>
                        </Stack>
                        <Box display={"flex"} justifyContent={"center"} alignSelf={"flex-start"} height={"100%"}>
                            <CloseIcon className="!cursor-pointer" onClick={onClose} height={16} width={16} />
                        </Box>
                    </Box>
                    <Box className="!pt-2">
                        <Box className="!px-8">
                            <Controller
                                name="domain"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Domain"
                                        placeholder="https://www.domainname.com"
                                        type="text"
                                        error={!!errors.domain}
                                        helperText={
                                            typeof errors.domain?.message === 'string'
                                                ? errors.domain?.message
                                                : 'Enter your root domain only, without http(s):// or www.'
                                        }
                                        handleChangeValue={field.onChange}
                                        value={field.value}
                                    />
                                )}
                            />
                            <Typography variant="body2" color="#A0AEC0" className="!mt-2">
                                This domain will be used to send emails from your account.
                            </Typography>
                        </Box>
                        <Stack direction="row" spacing={2} justifyContent="space-between" className="!mt-6 !px-8 !py-6 !bg-gray-100">
                            <CustomButton
                                title="Close"
                                variant="outlined"
                                onClick={onClose}
                                sx={{ width: "100%" }}
                            />
                            <CustomButton
                                title="Add Domain"
                                variant="contained"
                                type="submit"
                                sx={{ width: "100%" }}
                            />
                        </Stack>
                    </Box>
                </Box>
            </form>
        </Modal>
    );
};

export default AddDomainModal; 
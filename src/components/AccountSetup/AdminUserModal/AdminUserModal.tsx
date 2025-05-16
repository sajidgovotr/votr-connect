import Modal from '@/components/Modal';
import Input from '@/components/Textfields/input';
import SelectBox from '@/components/SelectBox';
import Checkbox from '@/components/Checkbox';
import CustomButton from '@/components/CustomButton';
import { Box, Typography, Grid, Stack } from '@mui/material';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import CloseIcon from '@mui/icons-material/Close';
import updateInfoIcon from '@/assets/images/update-info-icon.png';

const roles = [
    { value: 'admin', label: 'Admin' },
    { value: 'user', label: 'User' },
];
const permissions = [
    'Permissions title 1',
    'Permissions title 1',
    'Permissions title 1',
    'Permissions title 1',
    'Permissions title 1',
    'Permissions title 1',
];

const schema = yup.object().shape({
    firstName: yup.string().required('First Name is required'),
    lastName: yup.string().required('Last Name is required'),
    title: yup.string().required('Title is required'),
    role: yup.string().required('Role is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    phone: yup.string().required('Phone Number is required'),
    permissions: yup.array().of(yup.string()).min(1, 'At least one permission is required'),
});

interface AdminUserModalProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (data: any) => void;
    initialValues?: any;
}

const AdminUserModal: React.FC<AdminUserModalProps> = ({ open, onClose, onSubmit, initialValues }) => {
    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialValues || {
            firstName: '',
            lastName: '',
            title: '',
            role: '',
            email: '',
            phone: '',
            permissions: [],
        },
    });

    return (
        <Modal open={open} onClose={onClose} maxWidth="sm">
            <form onSubmit={handleSubmit(onSubmit)}>
                <Box className="!rounded-2xl !bg-white !p-0" sx={{ overflow: 'hidden' }}>
                    {/* Header */}
                    <Box className="!flex !items-center !justify-between !px-3 !pt-8 !pb-4 !bg-[#F6F7FF]">
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <img src={updateInfoIcon} alt="Update Info" className="!w-24 !h-20" />
                            <Typography variant="h5" fontWeight={700} className="!text-[1.5rem]">Update Info</Typography>
                        </Stack>
                        <Box display={"flex"} justifyContent={"center"} alignSelf={"flex-start"} height={"100%"}>
                            <CloseIcon className="!cursor-pointer" onClick={onClose} height={16} width={16} />
                        </Box>
                    </Box>
                    <Box className=" !pt-2">
                        <Box className="!px-8">
                            <Typography className="!mb-4 !font-semibold !text-base">VOTR Connect Admin</Typography>
                            <Grid container spacing={2} className="!mb-2">
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="firstName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="First Name"
                                                placeholder="Eg. John"
                                                type="text"
                                                error={!!errors.firstName}
                                                helperText={typeof errors.firstName?.message === 'string' ? errors.firstName?.message : ''}
                                                handleChangeValue={field.onChange}
                                                value={field.value}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="lastName"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Last Name"
                                                placeholder="Eg. Anderson"
                                                type="text"
                                                error={!!errors.lastName}
                                                helperText={typeof errors.lastName?.message === 'string' ? errors.lastName?.message : ''}
                                                handleChangeValue={field.onChange}
                                                value={field.value}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="title"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Title"
                                                placeholder="Eg. John"
                                                type="text"
                                                error={!!errors.title}
                                                helperText={typeof errors.title?.message === 'string' ? errors.title?.message : ''}
                                                handleChangeValue={field.onChange}
                                                value={field.value}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="role"
                                        control={control}
                                        render={({ field }) => (
                                            <SelectBox
                                                {...field}
                                                label="Role"
                                                placeholder="Select here"
                                                value={field.value}
                                                options={roles}
                                                handleChangeValue={field.onChange}
                                                error={!!errors.role}
                                                helperText={typeof errors.role?.message === 'string' ? errors.role?.message : ''}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="email"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Email"
                                                placeholder="example@email.com"
                                                type="email"
                                                error={!!errors.email}
                                                helperText={typeof errors.email?.message === 'string' ? errors.email?.message : ''}
                                                handleChangeValue={field.onChange}
                                                value={field.value}
                                            />
                                        )}
                                    />
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Controller
                                        name="phone"
                                        control={control}
                                        render={({ field }) => (
                                            <Input
                                                {...field}
                                                label="Phone Number"
                                                placeholder="+1 (XXX) XX XXX"
                                                type="text"
                                                error={!!errors.phone}
                                                helperText={typeof errors.phone?.message === 'string' ? errors.phone?.message : ''}
                                                handleChangeValue={field.onChange}
                                                value={field.value}
                                            />
                                        )}
                                    />
                                </Grid>
                            </Grid>
                            <Box className="!mb-4 !mt-2 bg-gray-100 rounded-md !px-2 !py-2">
                                <Typography className="!mb-2 !font-semibold !text-base">Permissions</Typography>
                                <Grid container spacing={1}>
                                    {permissions.map((perm, idx) => (
                                        <Grid item xs={12} sm={6} md={4} key={idx}>
                                            <Controller
                                                name="permissions"
                                                control={control}
                                                render={({ field }) => (
                                                    <Checkbox
                                                        label={perm}
                                                        checked={field.value?.includes(perm)}
                                                        onChange={() => {
                                                            const newValue = field.value?.includes(perm)
                                                                ? field.value.filter((p: string) => p !== perm)
                                                                : [...(field.value || []), perm];
                                                            field.onChange(newValue);
                                                        }}
                                                    />
                                                )}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                                {errors.permissions && (
                                    <Typography color="error" fontSize={12} className="!mt-1">
                                        {typeof errors.permissions.message === 'string' ? errors.permissions.message : ''}
                                    </Typography>
                                )}
                            </Box>
                        </Box>


                        <Stack direction="row" spacing={2} justifyContent="space-between" className="!mt-6 !px-8 !py-6 !bg-gray-100">
                            <CustomButton
                                title="Close"
                                variant="outlined"
                                onClick={onClose}
                                sx={{ width: "100%" }}
                            />
                            <CustomButton
                                title="Save Changes"
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

export default AdminUserModal; 
import { Card, CustomButton, Avatar, Chip, ActiveStatusChip, RequiredChip } from '@/components';
import { Box, Typography, Stack } from '@mui/material';
import { EditIcon, ViewIcon, EmailIcon } from '@/assets/svgs/custom-icons';
import CompanyLogo from '@/assets/svgs/votr-icon.svg';

const company = {
    name: 'Interactive Brokers LLC',
    address: 'One Pickwick Plaza, Greenwich, CT 06830 USA',
    logo: CompanyLogo,
};

const adminUsers = [
    {
        name: 'Denise Orozco',
        role: 'Chief Operating Officer',
        email: 'don.gilbart@interactive.com',
        status: 'Invitation Sent',
        statusType: 'warning',
        phone: '(202) 555-0199',
        permissions: 'FULL ACCESS (5)',
        permissionType: 'success',
        tags: ['VOTR Connect'],
        actions: ['edit', 'resend'],
        avatar: '',
    },
    // Add more users as needed
];

const AccountSetup = () => {
    return (
        <Box className="w-full min-h-screen">
            {/* Company Card */}
            <Card className="!mb-8 !p-8 !flex !flex-col !items-center !shadow-md !bg-white">
                <img src={company.logo} alt="Company Logo" className="!w-20 !h-20 !mb-4" />
                <Typography variant="h4" fontWeight={600} className="!mb-2 !text-center">
                    {company.name}
                </Typography>
                <Typography color="#8C8E9C" className="!mb-4 !text-center">
                    {company.address}
                </Typography>
                <CustomButton
                    title="Request Update"
                    variant="outlined"
                    className='rounded-full'
                    startIcon={<EditIcon />}
                />
            </Card>

            {/* Admin Users Section */}
            <Typography variant="h6" fontWeight={600} className="!mb-4 !text-left">
                Admin User
            </Typography>
            <Stack spacing={2}>
                {/* Example Admin User Card */}
                <Card className="!flex !items-center !justify-between !p-6 !bg-white !shadow-sm">
                    <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar width={48} height={48} url={adminUsers[0].avatar} />
                        <Box>
                            <Stack direction="row" alignItems="center" spacing={1}>
                                <Typography fontWeight={600} fontSize={18}>
                                    {adminUsers[0].name}
                                </Typography>
                                {adminUsers[0].tags.map((tag, idx) => (
                                    <Chip key={idx} name={tag} className="!bg-[#E5E7EB] !text-[#5263FF] !text-xs !font-semibold" />
                                ))}
                            </Stack>
                            <Typography fontSize={14} color="#8C8E9C">
                                {adminUsers[0].role}
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={1} className="!mt-1">
                                {/* Email */}
                                <EmailIcon />
                                <Typography fontSize={14}>{adminUsers[0].email}</Typography>
                                {/* Status Chip */}
                                <RequiredChip text={adminUsers[0].status} color={adminUsers[0].statusType === 'warning' ? 'Danger' : 'Success'} />
                                {/* Phone */}
                                <span className="material-icons !text-[#8C8E9C] !text-base">call</span>
                                <Typography fontSize={14}>{adminUsers[0].phone}</Typography>
                                {/* Permissions */}
                                <Typography fontSize={14}>
                                    Permissions : <span className="!text-[#27BE69] !font-semibold">{adminUsers[0].permissions}</span>
                                </Typography>
                            </Stack>
                        </Box>
                    </Stack>
                    <Stack direction="row" spacing={2}>
                        <CustomButton
                            title="Edit"
                            icon={<EditIcon />}
                            variant="outlined"
                            sx={{ minWidth: 100, color: '#5263FF', borderColor: '#5263FF' }}
                        />
                        <CustomButton
                            title="Resend Invitation"
                            variant="contained"
                            sx={{ minWidth: 180, bgcolor: '#5263FF', color: '#fff' }}
                        />
                    </Stack>
                </Card>
            </Stack>
        </Box>
    );
};

export default AccountSetup;
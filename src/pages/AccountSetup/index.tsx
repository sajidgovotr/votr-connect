import { useState } from 'react';
import { Card, CustomButton, Avatar } from '@/components';
import PhoneIcon from '@mui/icons-material/Phone';
import { Box, Typography, Stack } from '@mui/material';
import { EditIcon, EmailIcon } from '@/assets/svgs/custom-icons';
import ErrorIcon from '@mui/icons-material/Error';
import CompanyLogo from '@/assets/svgs/votr-icon.svg';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BlockIcon from '@mui/icons-material/Block';
import SendIcon from '@mui/icons-material/Send';
import AdminUserModal from '@/components/AccountSetup/AdminUserModal/AdminUserModal';
import VerticalDivider from '@/components/AccountSetup/VerticalDIvider';
import StatusChipInline from '@/components/AccountSetup/StatusChipInline';
import TagChip from '@/components/AccountSetup/TagChip';

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
        statusColor: '#eb8634',
        statusBg: '#FFF7ED',
        statusIcon: <ErrorIcon sx={{ color: '#eb8634', fontSize: 16 }} />,
        button: {
            title: 'Resend Invitation',
            color: '#5263FF',
            icon: <SendIcon sx={{ fontSize: 18 }} />,
        },
    },
    {
        name: 'Charles M. Lafleur',
        role: 'Chief Executive Officer',
        email: 'charlesmlfleur@interactive.com',
        status: 'Active',
        statusType: 'success',
        phone: '(202) 555-0199',
        permissions: 'ACCESS (4)',
        permissionType: 'info',
        tags: ['Clearing Broker Portal'],
        actions: ['edit', 'revoke'],
        avatar: '',
        statusColor: '#27BE69',
        statusBg: '#ECFDF3',
        statusIcon: <CheckCircleIcon sx={{ color: '#27BE69', fontSize: 16 }} />,
        button: {
            title: 'Revoke Access',
            color: '#EA4334',
            icon: <BlockIcon sx={{ fontSize: 18 }} />,
        },
    },
];


const AccountSetup = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<any | null>(null);

    // Helper to split name for initial values
    const getInitialValues = (user: any) => {
        if (!user) return undefined;
        const nameParts = user.name ? user.name.split(' ') : ['', ''];
        return {
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            title: user.role || '',
            role: '', // Map if you have role value
            email: user.email || '',
            phone: user.phone || '',
            permissions: [], // Map if you have permission data
        };
    };

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
                    sx={{ borderRadius: '30px', minWidth: 180, fontWeight: 500, color: '#5263FF', borderColor: '#5263FF' }}
                    className="rounded-full"
                />
            </Card>

            {/* Admin Users Section */}
            <Typography variant="h6" fontWeight={600} className="!mb-4 !text-left">
                Admin User
            </Typography>
            <Stack spacing={2}>
                {adminUsers.map((user, _idx) => (
                    <Card
                        key={user.email}
                        className="!flex !items-center !justify-between !p-4 !bg-white !shadow-sm !rounded-xl !border !border-[#E6E6E9]"
                    >
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Avatar width={48} height={48} url={user.avatar} />
                            <Box>
                                <Stack direction="row" alignItems="center" spacing={1}>
                                    <Typography fontWeight={600} fontSize={18}>
                                        {user.name}
                                    </Typography>
                                    {user.tags.map((tag, tIdx) => (
                                        <TagChip
                                            key={tIdx}
                                            text={tag}
                                            color={tag === 'VOTR Connect' ? '#7C3AED' : '#EB8634'}
                                            bg={tag === 'VOTR Connect' ? '#F3F0FF' : '#FFF7ED'}
                                        />
                                    ))}
                                </Stack>
                                <Typography fontSize={14} color="#8C8E9C">
                                    {user.role}
                                </Typography>
                                <Stack direction="row" alignItems="center" spacing={1} className="!mt-1">
                                    <EmailIcon strokeColor="#8C8E9C" />
                                    <Typography fontSize={14}>{user.email}</Typography>
                                    <StatusChipInline icon={user.statusIcon} text={user.status} color={user.statusColor} bg={user.statusBg} />
                                    <VerticalDivider />
                                    <PhoneIcon sx={{ color: '#8C8E9C', fontSize: 18 }} />
                                    <Typography fontSize={14}>{user.phone}</Typography>
                                    <VerticalDivider />
                                    <AdminPanelSettingsIcon sx={{ color: '#8C8E9C', fontSize: 18 }} />
                                    <Typography fontSize={14}>
                                        Permissions : <span className="!text-[#27BE69] !font-semibold">{user.permissions}</span>
                                    </Typography>
                                </Stack>
                            </Box>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <CustomButton
                                title="Edit"
                                startIcon={<EditIcon />}
                                variant="outlined"
                                sx={{ minWidth: 100, color: '#5263FF', borderColor: '#5263FF' }}
                                onClick={() => {
                                    setSelectedUser(user);
                                    setModalOpen(true);
                                }}
                            />
                            <CustomButton
                                title={user.button.title}
                                startIcon={user.button.icon}
                                variant="contained"
                                sx={{ minWidth: 180, bgcolor: user.button.color, color: '#fff', '&:hover': { bgcolor: user.button.color } }}
                            />
                        </Stack>
                    </Card>
                ))}
            </Stack>
            <AdminUserModal
                open={modalOpen}
                onClose={() => setModalOpen(false)}
                initialValues={getInitialValues(selectedUser)}
                onSubmit={(_data) => {
                    // TODO: handle save logic
                    setModalOpen(false);
                }}
            />
        </Box>
    );
};

export default AccountSetup;
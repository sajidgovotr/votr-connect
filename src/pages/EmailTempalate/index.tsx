import { Box, Card, Typography, Tabs, Tab } from '@mui/material';
import Breadcrumbs from '@/components/Breadcrumbs';
import CustomButton from '@/components/CustomButton';
import BrandingForm from '@/components/EmailTemplates/BrandingForm';
import { useState } from 'react';
import SendingEmail from '@/components/EmailTemplates/SendingEmail';
import AutoReply from '@/components/EmailTemplates/AutoReply';

const breadcrumbData = [
    { name: 'Email Templates', active: false, url: '/email-templates' },
    { name: 'Regulatory Events', active: true, url: '' },
];

const tabLabels = [
    'Branding & Text',
    'Sending Email Address',
    'Auto-reply Details',
];

const EmailTemplate = () => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <Box className="w-full min-h-screen flex flex-col gap-8  !important p-8">
            <Breadcrumbs data={breadcrumbData} />
            <Box className="flex justify-between items-center mt-4 mb-6 !important">
                <Typography variant="h4" fontWeight={700} className="!text-[2rem] !leading-tight">Regulatory Events</Typography>
                <Box className="flex gap-3 !important">
                    <CustomButton
                        title="Open Preview"
                        variant="outlined"
                        sx={{ borderRadius: '8px', minWidth: 140, fontWeight: 500, color: '#111827', borderColor: '#E6E6E9' }}
                        className="!rounded-lg"
                    />
                    <CustomButton
                        title="Save & Publish"
                        variant="contained"
                        sx={{ borderRadius: '8px', minWidth: 160, fontWeight: 500, bgcolor: '#5263FF', color: '#fff', '&:hover': { bgcolor: '#3B4FC4' } }}
                        className="!rounded-lg"
                        type="submit"
                    />
                </Box>
            </Box>

            <Box className="flex flex-row gap-8 !important w-full">
                <Box className="flex-1 !important">
                    <Card className="!bg-white !shadow-md !rounded-2xl !p-0">
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', px: 4, pt: 2 }} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                            <Tabs
                                value={activeTab}
                                onChange={(_e, v) => setActiveTab(v)}
                                aria-label="email template tabs"
                                sx={{
                                    '& .MuiTab-root': {
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        fontWeight: 500,
                                        color: '#6B7280',
                                        minWidth: 0,
                                        mr: 4,
                                        px: 0,
                                        py: 1.5,
                                        '&.Mui-selected': {
                                            color: '#2563EB',
                                            fontWeight: 700,
                                        },
                                    },
                                    '& .MuiTabs-indicator': {
                                        backgroundColor: '#2563EB',
                                        height: 3,
                                        borderRadius: 2,
                                    },
                                }}
                            >
                                {tabLabels.map((label, _idx) => (
                                    <Tab key={label} label={label} disableRipple />
                                ))}
                            </Tabs>
                        </Box>
                        <Box className="!p-8">
                            {activeTab === 0 && <BrandingForm />}
                            {activeTab === 1 && <SendingEmail />}
                            {activeTab === 2 && <AutoReply />}
                        </Box>
                    </Card>
                </Box>

            </Box>
        </Box>
    );
};

export default EmailTemplate;
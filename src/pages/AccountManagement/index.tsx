import { Box, Typography } from "@mui/material";
import TabPanel from "@/components/TabPanel";
import CompanyForm from "@/components/CompanyForm";
import TeamManagement from "@/components/TeamManagement";
import APIKeys from "@/components/APIKeys";
import SecuritySettings from "@/components/SecuritySettings";

const AccountManagement = () => {
    const handleSubmit = (data: any) => {
        console.log('Form submitted:', data);
    };

    const tabs = [
        {
            label: "Profile",
            content: <CompanyForm onSubmit={handleSubmit} />
        },
        {
            label: "Team",
            content: <TeamManagement />
        },
        {
            label: "API Keys",
            content: <APIKeys />
        },
        {
            label: "Security Settings",
            content: <SecuritySettings />
        }
    ];

    return (
        <Box className="p-6">
            <Typography
                variant="h4"
                sx={{
                    fontSize: "1.75rem",
                    fontWeight: 600,
                    mb: 1
                }}
            >
                Account Management
            </Typography>
            <Typography
                sx={{
                    fontSize: "1rem",
                    mb: 4,
                    color: "#6B7280"
                }}
            >
                Manage your account settings and team members.
            </Typography>

            <TabPanel tabs={tabs} />
        </Box>
    );
};

export default AccountManagement;   
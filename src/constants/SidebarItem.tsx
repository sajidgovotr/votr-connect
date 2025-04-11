import {
    DashboardIcon,
    HelpCenterIcon,
    SettingsIcon,
} from "@/assets/images/sidebar/svg-icons";
import { ManageAccounts, IntegrationInstructions, Code, CheckCircle, People, Assessment, Email } from "@mui/icons-material";

const UserItems = {
    home: [
        {
            href: `/`,
            icon: <DashboardIcon color="#5263FF" />,
            iconInactive: <DashboardIcon color="#8C8E9C" />,
            title: "Dashboard"
        },
        {
            href: '/account-management',
            icon: <ManageAccounts sx={{ color: "#5263FF" }} />,
            iconInactive: <ManageAccounts sx={{ color: "#8C8E9C" }} />,
            title: "Account Management"
        },
        {
            href: '/integration-catalog',
            icon: <IntegrationInstructions sx={{ color: "#5263FF" }} />,
            iconInactive: <IntegrationInstructions sx={{ color: "#8C8E9C" }} />,
            title: "Integration Catalog"
        },
        {
            href: '/sandbox/rest-api',
            icon: <Code sx={{ color: "#5263FF" }} />,
            iconInactive: <Code sx={{ color: "#8C8E9C" }} />,
            title: "Sandbox Environment"
        },
        {
            href: '/production-approvals',
            icon: <CheckCircle sx={{ color: "#5263FF" }} />,
            iconInactive: <CheckCircle sx={{ color: "#8C8E9C" }} />,
            title: "Production Approvals"
        },
        {
            href: '/email-templates',
            icon: <Email sx={{ color: "#5263FF" }} />,
            iconInactive: <Email sx={{ color: "#8C8E9C" }} />,
            title: "Email Templates"
        },
        {
            href: '/audit-logs',
            icon: <Assessment sx={{ color: "#5263FF" }} />,
            iconInactive: <Assessment sx={{ color: "#8C8E9C" }} />,
            title: "Audit Logs"
        },
    ],
    others: []
};
const ConstantItems = [
    {
        href: `/settings`,
        icon: <SettingsIcon color="#5263FF" />,
        iconInactive: <SettingsIcon color="#8C8E9C" />,
        title: "Settings"
    },
    {
        href: `/help-center`,
        icon: <HelpCenterIcon color="#5263FF" />,
        iconInactive: <HelpCenterIcon color="#8C8E9C" />,
        title: "Help Center"
    }
];

export const SidebarItems = {
    UserItems: UserItems,
    ConstantItems: ConstantItems
};

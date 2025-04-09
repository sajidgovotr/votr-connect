import {
    DashboardIcon,
    HelpCenterIcon,
    SettingsIcon,
} from "@/assets/images/sidebar/svg-icons";
import { ManageAccounts, IntegrationInstructions, Code, CheckCircle, People } from "@mui/icons-material";

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
            href: '/client-management',
            icon: <People sx={{ color: "#5263FF" }} />,
            iconInactive: <People sx={{ color: "#8C8E9C" }} />,
            title: "Client Management"
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

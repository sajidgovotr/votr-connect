import {
    DashboardIcon,
    HelpCenterIcon,
    SettingsIcon,
} from "@/assets/images/sidebar/svg-icons";
import { ManageAccounts, IntegrationInstructions, Code, CheckCircle, Assessment, Email, Settings } from "@mui/icons-material";

const UserItems = {
    home: [
        {
            href: `/`,
            icon: <DashboardIcon color="#5263FF" />,
            iconInactive: <DashboardIcon color="#8C8E9C" />,
            title: "Dashboard"
        },
        {
            href: '/express-integration',
            icon: <IntegrationInstructions sx={{ color: "#5263FF" }} />,
            iconInactive: <IntegrationInstructions sx={{ color: "#8C8E9C" }} />,
            title: "Express Integration"
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
            href: '/configured-products',
            icon: <Settings sx={{ color: "#5263FF" }} />,
            iconInactive: <Settings sx={{ color: "#8C8E9C" }} />,
            title: "Configured Products"
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
        // {
        //     href: "/tradingview",
        //     icon: <ShowChartOutlined sx={{ color: "#5263FF" }} />,
        //     iconInactive: <ShowChartOutlined sx={{ color: "#8C8E9C" }} />,
        //     title: "TradingView Integration"
        // },
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

export const SIDEBAR_ITEMS = [
    ...UserItems.home,
    ...UserItems.others,
    ...ConstantItems,
    {
        id: "integration-catalog",
        title: "Integration Catalog",
        type: "group",
        icon: <IntegrationInstructions />,
        children: [
            {
                id: "rest-api-integration",
                title: "REST API Integration",
                type: "item",
                url: "/integration-catalog/rest-api-integration",
            },
            {
                id: "graphql-integration",
                title: "GraphQL Integration",
                type: "item",
                url: "/integration-catalog/graphql-integration",
            },
            {
                id: "file-upload-integration",
                title: "File Upload Integration",
                type: "item",
                url: "/integration-catalog/file-upload-integration",
            },
        ],
    },
];

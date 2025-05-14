import { IStatus } from "@/types/global";

const getStatusColor = (status: IStatus) => {
    const colors = {
        successful: "#34C75924",
        pending: "#FF9F3833",
        failed: "#FF3B3026"
    }
    return colors[status]
}

const getFontColor = (status: IStatus) => {
    const statusColors = {
        failed: "#EA4334",
        successful: "#34A853",
        pending: "#FF9F38",
    };

    return statusColors[status] || "";
};

const getRequiredChipsColor = (color: string = "Success") => {
    const colorStyles: Record<string, { background: string; color: string }> = {
        Success: {
            background: "#D0F5E1",
            color: "#34A853",
        },
        Danger: {
            background: "#FBD8D5",
            color: "#EA4334",
        },
        Warning: {
            background: "#eb8634",
            color: "#eb8634",
        },
    };

    return colorStyles[color] || colorStyles["Success"];
};

const getMapColor = (name: string, highlightedCountries: Record<string, number>): string =>
    highlightedCountries[name] ? "#5263FF" : "#E0E0E0";

const getEnvironmentColor = (environment: string) => {
    switch (environment.toLowerCase()) {
        case 'development':
            return {
                bg: '#E0F2FE',
                text: '#0369A1',
                border: '#BAE6FD'
            };
        case 'staging':
            return {
                bg: '#FEF3C7',
                text: '#92400E',
                border: '#FDE68A'
            };
        case 'production':
            return {
                bg: '#DCFCE7',
                text: '#166534',
                border: '#BBF7D0'
            };
        default:
            return {
                bg: '#F3F4F6',
                text: '#374151',
                border: '#E5E7EB'
            };
    }
};


export {
    getStatusColor,
    getFontColor,
    getRequiredChipsColor,
    getMapColor,
    getEnvironmentColor
}
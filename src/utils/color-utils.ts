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
    };

    return colorStyles[color] || colorStyles["Success"];
};

const getMapColor = (name: string, highlightedCountries: Record<string, number>): string =>
    highlightedCountries[name] ? "#5263FF" : "#E0E0E0";




export {
    getStatusColor,
    getFontColor,
    getRequiredChipsColor,
    getMapColor
}
import Chip from "@mui/material/Chip";
import { getFontColor, getStatusColor } from "../../utils/color-utils";
import { IStatus } from "@/types/global";

const StatusChip = ({
    status,
    label
}: {
    status: IStatus;
    label: string
}) => {
    return (
        <Chip
            sx={{
                textTransform: "capitalize",
                color: getFontColor(status),
                fontSize: 12,
                lineHeight: "13.02px",
                fontWeight: 500,
                width: "75px",
                background: getStatusColor(status),
            }}
            size="small"
            label={label}
        />
    );
}

export default StatusChip
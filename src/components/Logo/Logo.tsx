import { Box } from "@mui/material";
import logo from "@/assets/images/logo.png";
import logoFull from "@/assets/images/logo-full.png";
import useBreakPoint from "../../hooks/useBreakPoint";

const Logo = ({
    size,
    full,
    src,
}: {
    size?: number;
    full?: boolean;
    src?: string;
}): React.ReactNode => {
    const isMdUp = useBreakPoint('md')
    return (
        <Box
            onClick={() => {
                window.location.reload();
            }}
            className="cursor-pointer flex"
        >
            {full && isMdUp ? (
                <img src={src || logoFull} width={size || 160} />
            ) : (
                <img src={src || logo} width={size || 36} height={size || 36} />
            )}
        </Box>
    );
};

export default Logo
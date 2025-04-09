import { AvatarProps } from "@/types/proptype";
import { Avatar as MuiAvatar } from "@mui/material";


const Avatar = ({ url, width, height }: AvatarProps) => {
    return (
        <MuiAvatar
            data-testid="avatar"
            sx={{
                height: height,
                width: width
            }}
            src={url}
        />
    );
};

export default Avatar;

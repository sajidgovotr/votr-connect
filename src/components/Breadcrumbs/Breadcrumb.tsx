import { Breadcrumbs as MUIBreadcrumbs, Typography, Box } from "@mui/material";
import { BreadcrumbSeperator, HomeIcon } from "@/assets/svgs/custom-icons";
import { useNavigate } from "react-router";
import { BreadcrumbsProp } from "@/types/proptype";



const Breadcrumbs = ({ data }: BreadcrumbsProp) => {
    const navigate = useNavigate();
    return (
        <MUIBreadcrumbs separator={<BreadcrumbSeperator />} aria-label="breadcrumb">
            <Box
                className="flex justify-center items-center cursor-pointer"
                onClick={() => {
                    navigate("/");
                }}
            >
                <HomeIcon />
            </Box>
            {data?.map((item, idx) => {
                return (
                    <Box
                        key={item.name}
                        className={`${item.active ? "cursor-default" : "cursor-pointer"}`}
                        onClick={() => {
                            if (!item.active) {
                                if (item.onItemClick) {
                                    item.onItemClick();
                                } else {
                                    navigate(item.url);
                                }
                            }
                        }}
                    >
                        <Typography
                            color={item.active ? "neutral.500" : "text.primary"}
                            fontWeight={500}
                            fontSize={14}
                        >
                            {item.name}
                        </Typography>
                    </Box>
                );
            })}
        </MUIBreadcrumbs>
    );
};

export default Breadcrumbs;

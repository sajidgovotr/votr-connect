import { Add } from "@mui/icons-material";
import { Box, Stack, Typography } from "@mui/material";
import AddCalendarImage from "@/assets/images/add-calendar.png";
import CustomButton from "../CustomButton/CustomButton";

interface Props {
    title: string;
    subtitle: string;
    buttonText?: string;
    buttonHandler?: () => void;
}

const EmptyState = ({ title, subtitle, buttonText, buttonHandler }: Props) => {
    return (
        <Stack
            display={"flex"}
            alignItems={"center"}
            justifyContent={"center"}
            spacing={1}
            position={"absolute"}
            top={0}
            bottom={0}
            right={0}
            left={0}
            zIndex={-1}
        >
            <Box
                component={"img"}
                src={AddCalendarImage}
                width={230}
                sx={{ pb: 2 }}
            />
            <Typography
                variant="subtitle1"
                fontSize={"30px"}
                color={"#000000"}
                textAlign={"center"}
            >
                {title}
            </Typography>

            <Typography
                variant="body1"
                fontSize={"16px"}
                color={"neutral.500"}
                dangerouslySetInnerHTML={{ __html: subtitle }}
                textAlign={"center"}
            />

            {buttonText && (
                <Box sx={{ pt: 2 }}>
                    <CustomButton
                        startIcon={<Add />}
                        title={buttonText}
                        onClick={buttonHandler}
                        sx={{ width: "max-content" }}
                    />
                </Box>
            )}
        </Stack>
    );
};

export default EmptyState;

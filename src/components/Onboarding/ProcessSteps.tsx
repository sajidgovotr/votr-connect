import BrandingStepIMG from "@/assets/images/branding-step.png";
import AdminStepIMG from "@/assets/images/admin-step.png";
import BrokerStepIMG from "@/assets/images/broker-step.png";
import { Box, Stack, Typography } from "@mui/material";
import { useLocation } from "react-router";
import { InProgressStepIcon } from "@/assets/svgs/create-campaign-icons";
import { VerticalDivider } from "@/components";

const StepMobileComp = ({
    title,
    progress
}: {
    title: string;
    progress: string;
}) => {
    return (
        <Box
            sx={{
                display: { xs: "block", md: "none" },
                border: "1px solid #5263FF",
                background: "#F0F1FF",
                height: "65px",
                width: { xs: "100%", sm: "100%", md: "max-content" },
                borderRadius: "8px",
                py: 2,
                px: 1
            }}
        >
            <Stack
                sx={{ width: "100%", height: "100%", px: 0.8 }}
                direction={"row"}
                alignItems={"center"}
                justifyContent={"space-between"}
                spacing={1}
            >
                <Stack direction={"row"} alignItems={"center"} spacing={1}>
                    <InProgressStepIcon />
                    <Box>
                        <Typography fontWeight={500} fontSize={16}>
                            {title}
                        </Typography>
                        <Typography fontSize={13} color={"#8C8E9C"}>
                            Pending
                        </Typography>
                    </Box>
                </Stack>
                <VerticalDivider />
                <Typography
                    sx={{
                        background: "#5263FF",
                        p: 1,
                        borderRadius: "8px",
                        color: "#FFF"
                    }}
                    fontSize={16}
                >
                    {progress}
                </Typography>
            </Stack>
        </Box>
    );
};

const ProcessSteps = () => {
    const { pathname } = useLocation();
    const activeStep = pathname.split("/")[pathname.split("/").length - 1];
    console.log(activeStep, 'activeStep')
    if (activeStep === "step-1") {
        return (
            <Stack>
                <Box
                    component={"img"}
                    src={BrokerStepIMG}
                    width={"100%"}
                    sx={{ display: { xs: "none", md: "block" } }}
                />
                {/* <StepMobileComp title="Broker Dealer" progress="1/5" /> */}
            </Stack>
        );
    }
    if (activeStep === "step-2") {
        return (
            <Stack>
                <Box
                    component={"img"}
                    src={AdminStepIMG}
                    width={"100%"}
                    sx={{ display: { xs: "none", md: "block" } }}
                />
                {/* <StepMobileComp title="Admin User Creation" progress="2/5" /> */}
            </Stack>
        );
    }
    if (activeStep === "step-3") {
        return (
            <Stack>
                <Box
                    component={"img"}
                    src={BrandingStepIMG}
                    width={"100%"}
                    sx={{ display: { xs: "none", md: "block" } }}
                />
                <StepMobileComp title="Branding" progress="3/5" />
            </Stack>
        );
    }

    return null;
};

export default ProcessSteps;

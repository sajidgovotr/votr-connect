import OnboardingNavbar from "@/components/OnboardingNavbar";
import { Box } from "@mui/material";
import OnboardingBg from "@/assets/images/oboarding-bg.png";

const OnboardingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <Box sx={{ minHeight: "100vh", position: "relative", background: "#f5f6fa" }}>
            {/* Background image at the top */}
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: 340,
                    background: `url(${OnboardingBg}) center top / cover no-repeat`,
                    zIndex: 0,
                }}
            />
            {/* Content (navbar and steps) */}
            <Box sx={{ position: "relative", zIndex: 1 }}>
                <OnboardingNavbar />
                <Box className="flex justify-center items-center" marginTop={"80px"}>
                    <div className="w-[635px] !mt-38">
                        {children}
                    </div>
                </Box>
            </Box>
        </Box>
    );
};

export default OnboardingLayout;
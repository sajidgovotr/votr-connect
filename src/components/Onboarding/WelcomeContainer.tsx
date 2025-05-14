import OnboardingNavbar from "@/components/OnboardingNavbar";
import { Box } from "@mui/material";

const WelcomeContainer = ({ children }: { children: React.ReactNode }) => {
    return (

        <Box>
            <OnboardingNavbar />
            <Box className="flex justify-center items-center" marginTop={"80px"}>
                <div className="w-[635px]">
                    {children}
                </div>
            </Box>
        </Box>
    );
};

export default WelcomeContainer;
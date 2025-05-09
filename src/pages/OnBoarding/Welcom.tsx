import { Card } from "@/components";
import OnboardingNavbar from "@/components/OnboardingNavbar";
import { Box, Stack, Typography } from "@mui/material";
import WelcomeBg from "@/assets/images/welcome.png";
import { SecurityIcon } from "@/assets/svgs/custom-icons";

const steps = [
    {
        number: 1,
        title: "Broker Dealer Information",
        description:
            "Minim et mollit culpa non velit non excepteur sint ut reprehenderit excepteur sint nisi eiusmod officia. Magna Lorem officia nostrud",
    },
    {
        number: 2,
        title: "Admin User Creation",
        description:
            "Minim et mollit culpa non velit non excepteur sint ut reprehenderit excepteur sint nisi eiusmod officia. Magna Lorem officia nostrud",
    },
];
const OnBoarding = () => {
    return (
        <Box className="w-full h-svh">
            <OnboardingNavbar />
            <Box className="h-[calc(100vh-80px)] flex justify-center items-center">
                <Card className="w-[635px]">
                    <Box
                        sx={{
                            width: "100%",
                            height: 480,
                            borderRadius: "12px",
                            background: `url(${WelcomeBg}) center/cover no-repeat`,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Box component={"div"} className="flex flex-col items-center justify-center !px-11 !pt-[120px]">
                            <Typography variant="h2" color="white" sx={{ fontSize: 32, fontWeight: 500, lineHeight: '38px', mt: 4 }}>Welcome to VOTR Connect</Typography>
                            <Typography variant="caption" textAlign={"center"} color="#8C8E9C" sx={{ fontSize: 16, fontWeight: 400, lineHeight: '22px', mt: 2 }}>
                                Unlock an accurate projection of your event's success by filling in the details: Type of Communication
                            </Typography>

                            <Typography className="flex items-center gap-2" color="#8C8E9C" sx={{ fontSize: 16, fontWeight: 400, lineHeight: '22px', mt: 4 }}>
                                <SecurityIcon />
                                Irure ad duis laborum ullamco velit cupidatat
                            </Typography>
                        </Box>

                    </Box>
                    <Box sx={{ mt: 3 }}>
                        {steps.map((step) => (
                            <Box
                                key={step.number}
                                sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    border: "1px solid #E6E8EC",
                                    borderRadius: "12px",
                                    p: 2,
                                    mb: 2,
                                    background: "#fff",
                                }}
                            >
                                <Box
                                    sx={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",
                                        background: "#EEF0FF",
                                        color: "#6B7AFF",
                                        fontWeight: 700,
                                        fontSize: 18,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        mr: 2,
                                    }}
                                >
                                    {step.number}
                                </Box>
                                <Box>
                                    <Typography
                                        sx={{
                                            fontWeight: 600,
                                            fontSize: 18,
                                            color: "#23262F",
                                            lineHeight: "22px",
                                        }}
                                    >
                                        {step.title}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontWeight: 400,
                                            fontSize: 16,
                                            color: "#8C8E9C",
                                            lineHeight: "22px",
                                            mt: 0.5,
                                        }}
                                    >
                                        {step.description}
                                    </Typography>
                                </Box>
                            </Box>
                        ))}
                    </Box>
                </Card>
            </Box>

        </Box>
    )
}

export default OnBoarding;
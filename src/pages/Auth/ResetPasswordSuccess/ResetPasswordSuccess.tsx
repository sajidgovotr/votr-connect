import { JSX } from "react";
import { Box, Button, Stack, Typography } from "@mui/material";
import SuccessIcon from "@/assets/images/password-success-icon.png";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate } from "react-router";

const ResetPasswordSuccess = (): JSX.Element => {
    const navigate = useNavigate();

    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
        >
            <Box sx={{ width: { xs: "95%", sm: "70%" }, p: { xs: 2, md: 0 } }}>
                <Stack spacing={1}>
                    <img src={SuccessIcon} alt="" width={50} />
                    <Box>
                        <Typography fontSize={{ md: "32px", xs: "22px" }} fontWeight={600}>
                            Reset Password successfully
                        </Typography>
                        <Typography fontSize={14} color={"neutral.500"}>
                            Your password has been reset. Go back to login page and login with
                            your new password.
                        </Typography>
                    </Box>
                </Stack>
                <Box sx={{ my: 2 }}></Box>
                <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                        mt: 2,
                        py: 1.5,
                        fontSize: "16px",
                        fontWeight: 500,
                        color: "#030712",
                        border: "1px solid #D4D6D9"
                    }}
                    color="secondary"
                    onClick={() => navigate("/login")}
                    startIcon={<KeyboardBackspace />}
                >
                    Back to Login
                </Button>
            </Box>
        </Stack>
    );
};

export default ResetPasswordSuccess;

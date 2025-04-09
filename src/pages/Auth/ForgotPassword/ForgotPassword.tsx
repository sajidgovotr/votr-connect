import { Box, Button, Stack, Typography } from "@mui/material";
import { KeyboardBackspace } from "@mui/icons-material";
import { TextInput } from "@/components";
import { JSX, useContext, useState } from "react";
import ForgotPasswordIcon from "@/assets/images/forgot-password-icon.png";
import { MessageContext, IMessageContext } from "@/context/message-context";
import { useNavigate } from "react-router";

const ForgotPassword = (): JSX.Element => {
    const { showSnackbar } = useContext(MessageContext) as IMessageContext;
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        showSnackbar(
            `Reset Instruction sent to your email!`,
            "We’ve sent you a link where you can change your password.",
            "info"
        );
        setEmail("");
    };

    return (
        <Stack
            direction={"column"}
            justifyContent={"center"}
            alignItems={"center"}
            height={"100%"}
        >
            <Box sx={{ width: { xs: "95%", sm: "70%" }, p: { xs: 2, md: 0 } }}>
                <form onSubmit={handleSubmit}>
                    <Stack spacing={1}>
                        <img src={ForgotPasswordIcon} alt="" width={50} />
                        <Box>
                            <Typography
                                fontSize={{ md: "32px", xs: "22px" }}
                                fontWeight={600}
                            >
                                Forgot your password?
                            </Typography>
                            <Typography fontSize={14} color={"neutral.500"}>
                                Enter your email address below and we'll send you password reset
                                instructions.
                            </Typography>
                        </Box>
                    </Stack>

                    <Box sx={{ my: 2 }}>
                        <Stack spacing={2}>
                            <Box>
                                <TextInput
                                    label="Email"
                                    type="email"
                                    placeholder="hi@example.com"
                                    color="success"
                                    error={false}
                                    helperText={""}
                                    value={email}
                                    handleChangeValue={(val: string) => setEmail(val)}
                                />
                            </Box>
                        </Stack>
                    </Box>
                    <Button
                        variant="contained"
                        fullWidth
                        sx={{
                            mt: 2,
                            py: 1.5,
                            fontSize: "16px",
                            fontWeight: 500
                        }}
                        disabled={email === ""}
                        type="submit"
                        color="primary"
                    >
                        Send Reset Instructions
                    </Button>

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
                        onClick={() => navigate(-1)}
                        startIcon={<KeyboardBackspace />}
                    >
                        Go Back
                    </Button>
                    {/* <Divider sx={{ my: 4 }} />
          <Typography fontSize={14} color={"neutral.500"}>
            If you don't see your reset email be sure to check your spam filter
            for an email from{" "}
            <strong style={{ color: "#000424" }}>support@govotr.com</strong>
          </Typography> */}
                </form>
            </Box>
        </Stack>
    );
};

export default ForgotPassword;

import { Box, Button, Stack, Typography } from "@mui/material";
import { TextInput } from "@/components";
import { JSX, useState } from "react";
import SetNewPasswordIcon from "@/assets/images/set-password-icon.png";
import { KeyboardBackspace } from "@mui/icons-material";
import { useNavigate } from "react-router";

const SetNewPassword = (): JSX.Element => {
    const [password, setPassword] = useState<string>("");
    const [confirmPassword, setConfirmPassword] = useState<string>("");
    const navigate = useNavigate();
    const handleSubmit = (e: { preventDefault: () => void }) => {
        e.preventDefault();
        navigate("/reset-password-success");
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
                        <img src={SetNewPasswordIcon} alt="" width={50} />
                        <Box>
                            <Typography
                                fontSize={{ md: "32px", xs: "22px" }}
                                fontWeight={600}
                            >
                                Reset Password
                            </Typography>
                            <Typography fontSize={14} color={"neutral.500"}>
                                Create a new password for your account by filling out the form
                                below
                            </Typography>
                        </Box>
                    </Stack>

                    <Box sx={{ my: 2 }}>
                        <Stack spacing={2}>
                            <Box>
                                <TextInput
                                    label="New Password"
                                    type="password"
                                    placeholder="Create new password"
                                    color="success"
                                    error={false}
                                    helperText={""}
                                    value={password}
                                    handleChangeValue={(val: string) => setPassword(val)}
                                />
                            </Box>
                            <Box>
                                <TextInput
                                    label="Confirm New Password"
                                    type="password"
                                    placeholder="Re-enter new password"
                                    color="success"
                                    error={false}
                                    helperText={""}
                                    value={confirmPassword}
                                    handleChangeValue={(val: string) => setConfirmPassword(val)}
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
                        disabled={password === "" || confirmPassword === ""}
                        type="submit"
                        color="primary"
                    >
                        Change Password
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
                </form>
            </Box>
        </Stack>
    );
};

export default SetNewPassword;

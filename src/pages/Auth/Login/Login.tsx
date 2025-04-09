import { Box, Button, Stack, Typography } from "@mui/material";
import { Checkbox, TextInput } from "@/components";
import SigninIcon from "@/assets/images/signin-icon.png";
import useLogin from "./useLogin";

const Login = () => {
    const {
        state: { email, password, remember, isLoading },
        setState: { setEmail, setPassword, setRemember },
        handlers: { handleSubmit, gotoForgetPassword },
    } = useLogin();

    return (
        <Box
            sx={{
                height: "100%",
                width: "100%",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center"
            }}
        >
            <Stack
                direction={"column"}
                justifyContent={"center"}
                alignItems={"center"}
                width="100%"
                flex={1}
            >
                <Box sx={{ width: { xs: "95%", sm: "70%" }, p: { xs: 2, md: 0 } }}>
                    <form onSubmit={handleSubmit}>
                        <Stack spacing={1}>
                            <img src={SigninIcon} alt="" width={50} />
                            <Box>
                                <Typography
                                    fontSize={{ md: "32px", xs: "22px" }}
                                    fontWeight={600}
                                >
                                    Welcome to VOTR
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
                                <Box>
                                    <TextInput
                                        label="Password"
                                        placeholder="*************"
                                        color="success"
                                        type={"password"}
                                        error={false}
                                        helperText={""}
                                        value={password}
                                        handleChangeValue={(val: string) => setPassword(val)}
                                    />
                                </Box>
                                <Stack
                                    direction={"row"}
                                    alignItems={"center"}
                                    justifyContent={"space-between"}
                                    mt={3}
                                >
                                    <Checkbox
                                        label="Remember Me"
                                        color="primary"
                                        checked={remember}
                                        onChange={() => setRemember(!remember)}
                                    />
                                    <Typography
                                        variant="subtitle2"
                                        fontSize={14}
                                        color="primary"
                                        sx={{ cursor: "pointer", fontWeight: 500 }}
                                        onClick={gotoForgetPassword}
                                    >
                                        Forgot Password
                                    </Typography>
                                </Stack>
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
                            disabled={email === "" || password === ""}
                            type="submit"
                            color="primary"
                        >
                            {isLoading ? "Please Wait.." : "Login"}
                        </Button>
                    </form>
                </Box>
            </Stack>
        </Box>
    );
};

export default Login;

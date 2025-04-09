import { Box, Stack, Typography } from "@mui/material";
import { CustomButton } from "@/components";
import Modal from "..";
// need to make on Modal and reuse it for All
export default function LogoutConfirmModal({
    open,
    onClose,
    onConfirm
}: {
    open: boolean;
    onClose: () => void;
    onConfirm?: () => void;
}) {
    return (
        <Modal open={open} onClose={onClose} onConfirm={onConfirm} maxWidth="sm">
            <Box>
                <Box my={2}>
                    <Typography fontSize={20} noWrap fontWeight={500}>
                        Logout
                    </Typography>
                    <Typography fontSize={15} color={"#8C8E9C"} fontWeight={400}>
                        Are you sure you want to logout?
                    </Typography>
                </Box>
                <Stack spacing={2} direction={"row"} pt={3}>
                    <CustomButton
                        title="Cancel"
                        size="large"
                        onClick={onClose}
                        sx={{
                            border: "1px solid #E6E6E9",
                            flex: "1",
                            color: "black",
                            boxShadow:
                                "0px 1px 3px 0px rgba(16, 24, 32, 0.05), 0px 23px 44px 0px rgba(16, 24, 32, 0.05)"
                        }}
                        variant="outlined"
                        color="inherit"
                    />
                    <CustomButton
                        size="large"
                        title={"Confirm"}
                        color={"error"}
                        onClick={onConfirm}
                        sx={{ flex: 1, color: "#FFFFFF" }}
                    />
                </Stack>
            </Box>
        </Modal>

    );
}

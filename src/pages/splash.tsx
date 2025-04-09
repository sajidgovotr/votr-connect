import { Box, CircularProgress, Stack } from "@mui/material";
import logoFull from "@/assets/images/logo-full.png";

const Splash = () => {
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "fixed",
        background: "#000424",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <Box>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"center"}
          spacing={2}
          mt={3}
        >
          <Box component="img" src={logoFull} width={{ xs: 100, sm: 150 }} />
          <CircularProgress color="primary" size={30} />
        </Stack>
      </Box>
    </Box>
  );
};

export default Splash;

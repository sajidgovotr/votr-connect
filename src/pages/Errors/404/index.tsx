import { Box, Button, Container, Typography } from "@mui/material";
import { JSX } from "react";
import { Link as RouterLink } from "react-router";

function NotFound(): JSX.Element {
  return (
    <>
      <Box
        component="main"
        sx={{
          alignItems: "center",
          display: "flex",
          height: "100vh",
          overflow: "auto"
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              alignItems: "center",
              display: "flex",
              flexDirection: "column"
            }}
          >
            <Typography
              align="center"
              color="textPrimary"
              variant={"h2"}
              mt={5}
            >
              404: The page you are looking for isn’t here
            </Typography>
            <Typography align="center" color="textPrimary" variant="subtitle2">
              You either tried some shady route or you came here by mistake.
              Whichever it is, try using the navigation
            </Typography>
            <Button
              to="/"
              component={RouterLink}
              sx={{ mt: 3, mb: 3 }}
              variant="contained"
            >
              Go back to Home
            </Button>
          </Box>
        </Container>
      </Box>
    </>
  );
}

export default NotFound;

import { Box, SxProps } from "@mui/material";

const VerticalDivider = ({ sx }: { sx?: SxProps }) => {
  return (
    <Box
      sx={{
        width: "1px",
        height: "100%",
        opacity: "0.3",
        background:
          "radial-gradient(163199.99% 35.29% at 50% 50%, #979797 35.5%, rgba(151, 151, 151, 0.00) 100%)",
        ...sx
      }}
    />
  );
};

export default VerticalDivider;

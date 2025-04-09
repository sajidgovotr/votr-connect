import { SxProps, Typography } from "@mui/material";

//can be removed
const TableCellText = ({ text, sx }: { text: string; sx?: SxProps }) => {
  return (
    <Typography fontSize={14} fontWeight={500} sx={{ ...sx }}>
      {text}
    </Typography>
  );
};

export default TableCellText;

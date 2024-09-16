import { color } from "@/theme/color";
import { Box, Typography } from "@mui/material";

const Footer = () => {
  return (
    <Box sx={{ padding: "16px 0", display: "flex", justifyContent: "center" }}>
      <Typography
        sx={{ textAlign: "center" }}
        variant="element7"
        color={color.text.black_40}
      >
        © Copyright 2022 Hyundai Motor Company. All rights reserved.
      </Typography>
    </Box>
  );
};

export default Footer;

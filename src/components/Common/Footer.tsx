import { color } from '@/theme/color';
import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ padding: '16px 0', display: 'flex', justifyContent: 'center' }}>
      <Typography
        sx={{ textAlign: 'center' }}
        variant="h6"
        color={color.text.black_40}
      ></Typography>
    </Box>
  );
};

export default Footer;

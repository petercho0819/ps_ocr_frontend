import { useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Image from 'next/image';
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';
const NoDataBox = ({
  IconComponent = null,
  ImageComponent = PriorityHighIcon,
  titleText = 'nothing',
  subText = 'nothing',
}) => {
  const theme = useTheme();
  return (
    <Box
      textAlign={'center'}
      display="flex"
      flexDirection={'column'}
      justifyContent="center"
      alignItems={'center'}
      height="100%"
    >
      <PriorityHighIcon
        style={{
          width: 78,
          height: 78,
        }}
      />
      <Typography
        variant="h2"
        color="text.disabled"
        fontWeight={'400'}
        my={2}
        mt={4}
      >
        {titleText}
      </Typography>
      <Typography variant="body1" color={(theme) => `rgba(17,17,17,.15)`}>
        {subText}
      </Typography>
    </Box>
  );
};
export default NoDataBox;

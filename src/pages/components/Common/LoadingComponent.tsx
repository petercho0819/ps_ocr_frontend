import { Box, CircularProgress, Typography } from '@mui/material';
const LoadingComponent = () => {
  return (
    <Box
      height={'100%'}
      alignItems={'center'}
      justifyContent="center"
      display={'flex'}
      flexDirection="column"
    >
      <CircularProgress></CircularProgress>
      <Typography variant="body1" color="textdisabled" mt={3}>
        Loading...
      </Typography>
    </Box>
  );
};
export default LoadingComponent;

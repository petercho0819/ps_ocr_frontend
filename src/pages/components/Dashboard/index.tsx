//react
import React, { useEffect } from 'react';

//mui
import { Box, Card, Divider, Typography } from '@mui/material';

//component
//theme
import { useQuery } from 'react-query';
import { baseURL } from '@/common/constants';
import { MemberDetail } from '@/common/types/member';
import { color } from '@/theme/color';
import { font } from '@/theme/font';

const Dashboard = () => {
  return (
    <>
      <Box sx={{ height: '700px' }}>
        <Typography sx={{ ...font.h4, color: color.text.black }}>
          &nbsp; &nbsp; Dashboard &nbsp; &nbsp;
        </Typography>
      </Box>
    </>
  );
};

export default Dashboard;

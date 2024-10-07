// ** react
import React, { useState } from 'react';

// ** mui
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

// ** theme
import { t } from 'i18next';
import { color } from '@/theme/color';
import { font } from '@/theme/font';
import InputBox from '../Box/InputBox';
import { convertDateFormat } from '@/utils/common';
import { useQuery } from 'react-query';
import { getMemberDetail } from '@/queries/apis/member';
import useAuthStore from '@/store/auth.store';

const MyPageSetting = () => {
  const user = useAuthStore.getState().user;
  const {
    data: memberDetail,
    isLoading,
    isError,
    refetch,
  } = useQuery(['getMemberDetail'], async () => {
    const response = await getMemberDetail(user?.email);
    if (!response) {
      throw new Error('Failed to fetch Member Detail');
    }
    return response.data;
  });

  return (
    <Box sx={{ height: '100%' }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          gap: 15,
          width: '100%',
          borderBottom: '1px solid #F8F3F2',
          padding: '20px',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            contentAlign: 'center',
          }}
        >
          <Typography variant="h2" color={color.text.black}>
            {t('mypage:my_page')}
          </Typography>
        </Box>
      </Box>
      <Box sx={{ padding: '20px' }}>
        <Table>
          <TableBody>
            <TableRow sx={{ borderTop: '1px solid #11111126' }}>
              <TableCell
                sx={{
                  ...font.label2,
                  color: color.text.black,
                  width: '220px',
                  backgroundColor: '#f6f3f2',
                }}
              >
                {t('mypage:name')}
              </TableCell>
              <TableCell>
                <Typography variant="h6" color={color.text.black}>
                  {memberDetail?.name}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  ...font.label2,
                  color: color.text.black,
                  width: '220px',
                  backgroundColor: '#f6f3f2',
                }}
              >
                {t('mypage:company_name')}
              </TableCell>
              <TableCell>
                <Typography variant="h6" color={color.text.black}>
                  {memberDetail?.companyName}
                </Typography>
              </TableCell>
            </TableRow>
            <TableRow sx={{ borderTop: '1px solid #11111126' }}>
              <TableCell
                sx={{
                  ...font.label2,
                  color: color.text.black,
                  width: '220px',
                  backgroundColor: '#f6f3f2',
                }}
              >
                {t('mypage:email')}
              </TableCell>
              <TableCell>
                <Typography variant="h6" color={color.text.black}>
                  {memberDetail?.email}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  ...font.label2,
                  color: color.text.black,
                  width: '220px',
                  backgroundColor: '#f6f3f2',
                }}
              >
                {t('member:role')}
              </TableCell>
              <TableCell>
                <Typography variant="h6" color={color.text.black}>
                  {memberDetail?.role}
                </Typography>
              </TableCell>
            </TableRow>
            {/* <TableRow sx={{ borderTop: '1px solid #11111126' }}>
              <TableCell
                sx={{
                  ...font.label2,
                  color: color.text.black,
                  width: '220px',
                  backgroundColor: '#f6f3f2',
                }}
              >
                {t('member:created')}
              </TableCell>
              <TableCell>
                <Typography variant="h6" color={color.text.black}>
                  {convertDateFormat(memberInfo.createdAt)}
                </Typography>
              </TableCell>
              <TableCell
                sx={{
                  ...font.label2,
                  color: color.text.black,
                  width: '220px',
                  backgroundColor: '#f6f3f2',
                }}
              >
                {t('member:last_modified')}
              </TableCell>
              <TableCell>
                <Typography variant="h6" color={color.text.black}>
                  {convertDateFormat(memberInfo.updatedAt)}
                </Typography>
              </TableCell>
            </TableRow> */}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default MyPageSetting;

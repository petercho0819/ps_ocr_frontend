// ** react
import React, { useState } from 'react';

// ** mui
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  List,
  ListItem,
  MenuItem,
  Select,
} from '@mui/material';
// ** component

// ** i18n
import { t } from 'i18next';
import LightSandButton from '../Button/LightSandButton';
import { color } from '@/theme/color';
// import ConfirmDeleteModal from "../NscMember/Modal/ConfirmDeleteModal";

export interface ReceiptLeftSiderType {
  handleSelectedYear: (item: string) => void;
  handleSelectedMonth: (item: string) => void;
  selectedMonth: string;
  selectedYear: string;
  setIsSaveDisabled: (value: boolean) => void;
}

const ReceiptListLeftSider = ({
  handleSelectedYear,
  handleSelectedMonth,
  selectedMonth,
  selectedYear,
  setIsSaveDisabled,
}: ReceiptLeftSiderType) => {
  const years = ['2024', '2025', '2026', '2027'];
  const months = [
    { value: '01', label: 'January' },
    { value: '02', label: 'February' },
    { value: '03', label: 'March' },
    { value: '04', label: 'April' },
    { value: '05', label: 'May' },
    { value: '06', label: 'June' },
    { value: '07', label: 'July' },
    { value: '08', label: 'August' },
    { value: '09', label: 'September' },
    { value: '10', label: 'October' },
    { value: '11', label: 'November' },
    { value: '12', label: 'December' },
  ];
  const [selectedValue, setSelectedValue] = useState(selectedMonth); // 클릭된 버튼의 값 저장

  const handleYear = (event: any) => {
    handleSelectedYear(event.target.value as string);
  };
  const handleMonth = (event: any) => {
    setSelectedValue(event);
    handleSelectedMonth(event);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
      }}
    >
      <Box
        sx={{
          mt: 2,
          width: '200px',
          display: 'flex', // Flexbox 사용
          justifyContent: 'center', // 가로 가운데 정렬
          alignItems: 'center', // 세로 가운데 정렬
        }}
      >
        <FormControl>
          <InputLabel id="year-select-label">Year</InputLabel>
          <Select
            labelId="year-select-label"
            id="year-select"
            value={selectedYear}
            label="Year"
            onChange={handleYear}
            sx={{
              width: '100px',
              '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input': {
                padding: '0',
              },
              '& .MuiSelect-select.MuiInputBase-input.MuiOutlinedInput-input.MuiSelect-select':
                {
                  height: '10px',
                  padding: '10px',
                  fontSize: '14px',
                  lineHeight: '20px',
                },
            }}
          >
            {years.map((year) => (
              <MenuItem key={year} value={year}>
                {year}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ width: '220px' }}>
        <List sx={{ padding: '12px 10px' }}>
          <Box sx={{ overflowY: 'auto', height: '650px' }}>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {months.map((v) => (
                <Button
                  key={v.value}
                  sx={{
                    backgroundColor:
                      selectedValue === v.value ? color.primary.green : 'white',
                    color: selectedValue === v.value ? 'white' : 'black',
                    width: 'calc(50% - 5px)',
                  }} // 한 줄에 2개의 버튼이 들어가도록 설정
                  onClick={() => handleMonth(v.value)}
                >
                  {v.label}
                </Button>
              ))}
            </Box>
          </Box>
        </List>
      </Box>
    </Box>
  );
};

export default ReceiptListLeftSider;

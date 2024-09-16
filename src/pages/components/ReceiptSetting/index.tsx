// ** react
import React, { useState } from 'react';

// ** mui
import { Box } from '@mui/material';

// ** components
import ReceiptRightDetail from './ReceiptRightDetail';
import PrimaryBlueButton from '../Button/PrimaryBlueButton';
import { ContentHeadContainer, HeadText, SectionContainer } from './Container';

// ** theme
import { t } from 'i18next';
import moment from 'moment';
import ReceiptLeftSider from './ReceiptLeftSider';

const ReceiptSetting = () => {
  const [selectedYear, setSelectedYear] = useState<string>(
    moment().format('YYYY'),
  );
  const [selectedMonth, setSelectedMonth] = useState<string>(
    moment().format('MM'),
  );
  const [isSaveDisabled, setIsSaveDisabled] = useState<boolean>(true);

  const handleSelectedYear = (item: string) => {
    setSelectedYear(item);
  };
  const handleSelectedMonth = (item: string) => {
    setSelectedMonth(item);
  };

  return (
    <Box sx={{ height: '100%' }}>
      <ContentHeadContainer>
        <HeadText>{t('receipt:receipt')}</HeadText>
      </ContentHeadContainer>

      <SectionContainer>
        <ReceiptLeftSider
          handleSelectedYear={handleSelectedYear}
          handleSelectedMonth={handleSelectedMonth}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          setIsSaveDisabled={setIsSaveDisabled}
        />
        <ReceiptRightDetail
          handleSelectedYear={handleSelectedYear}
          handleSelectedMonth={handleSelectedMonth}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </SectionContainer>
    </Box>
  );
};

export default ReceiptSetting;

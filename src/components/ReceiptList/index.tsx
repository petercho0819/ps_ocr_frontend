// ** react
import React, { useState } from 'react';

// ** mui
import { Box } from '@mui/material';

// ** components

// ** theme
import { t } from 'i18next';
import moment from 'moment';
import { ContentHeadContainer, HeadText, SectionContainer } from './Container';
import ReceiptListLeftSider from './ReceiptListLeftSider';
import ReceiptListRightDetail from './ReceiptListRightDetail';

const ReceiptList = () => {
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
        <ReceiptListLeftSider
          handleSelectedYear={handleSelectedYear}
          handleSelectedMonth={handleSelectedMonth}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          setIsSaveDisabled={setIsSaveDisabled}
        />
        <ReceiptListRightDetail
          handleSelectedYear={handleSelectedYear}
          handleSelectedMonth={handleSelectedMonth}
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
        />
      </SectionContainer>
    </Box>
  );
};

export default ReceiptList;

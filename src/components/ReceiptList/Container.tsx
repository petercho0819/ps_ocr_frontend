import { color } from '@/theme/color';
import { font } from '@/theme/font';
import {
  Box,
  Button,
  TableCell,
  TableRow,
  Typography,
  styled,
} from '@mui/material';

const MainContainer = styled(Box)(() => ({
  height: '100%',
}));

export default MainContainer;

export const ContentHeadContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  contentAlign: 'center',
  gap: 15,
  width: '100%',
  borderBottom: '1px solid #F8F3F2',
  padding: '20px',
}));

export const ContentHeadTitle = styled(Box)(() => ({
  display: 'flex',
  width: 585,
  alignItems: 'center',
  contentAlign: 'center',
  gap: '10px',
}));

export const ContentHeadBtn = styled(Box)(() => ({
  display: 'flex',
  gap: '10px',
  alignItems: 'center',
}));

export const HeadText = styled(Typography)(() => ({
  ...font.h2,
  color: color.text.black,
}));

export const SectionContainer = styled(Box)(() => ({
  minHeight: '900px',
  display: 'flex',
}));

export const TableCellTitleText = styled(TableCell)(() => ({
  ...font.label1,
  color: color.text.black,
  width: '220px',
  backgroundColor: '#f6f3f2',
  padding: '0 10px',
}));

//modelright
export const ModelRightContainer = styled(Box)(() => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  borderLeft: '1px solid rgba(17, 17, 17, 0.15)',
}));

export const ModelRightHead = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '20px',
}));

export const ModelRightHeadTextBox = styled(Box)(() => ({
  display: 'flex',
  gap: '8px',
  alignItems: 'center',
}));

export const ModelRightHeadText = styled(Typography)(() => ({
  ...font.h5,
  color: color.text.black,
}));

export const ModelRightHeadNum = styled(Typography)(() => ({
  ...font.h5,
  color: color.grey[400],
}));

export const ModelRightTableCell = styled(TableCell)(() => ({
  ...font.label3,
  color: color.text.black,
  textTransform: 'uppercase',
}));

export const ModelRightTableBodyCell = styled(TableCell)(() => ({
  ...font.sub_element1,
  color: color.text.black_70,
}));

//model left
export const ModelLeftMoreBtn = styled(Button)(() => ({
  color: 'white',
  position: 'relative',
  right: '60px',
  '&:hover': {
    background: 'none',
  },
}));

//page
export const ModelPageContainer = styled(Box)(() => ({
  height: '48px',
  display: 'flex',
  justifyContent: 'flex-end',
  alignItems: 'center',
  gap: '18px',
}));

//model detail
export const ModelDetailRow = styled(TableRow)(() => ({
  borderTop: `1px solid ${color.text.black_15}`,
}));

export const ModelCategoryCell = styled(TableCell)(() => ({
  ...font.sub_element1,
  color: color.text.black,
  minWidth: '200px',
}));

export const ModelDetailValueText = styled(Typography)(() => ({
  ...font.sub_element1,
  color: color.text.black,
}));

export const ModelDetailRequiredFields = styled(Typography)(() => ({
  ...font.sub_element2,
  color: '#BEBEBE',
  paddingTop: '12px',
}));

export const ModelDetailBrochureValue = styled(Typography)(() => ({
  ...font.sub_element1,
  color: color.text.black_70,
}));

export const ModelDetailImageSize = styled(Typography)(() => ({
  ...font.sub_element2,
  color: color.text.black_40,
}));

export const ModelDetailImageBox = styled(Box)(() => ({
  width: '364px',
  height: '180px',
  background: color.secondary.light_sand,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}));

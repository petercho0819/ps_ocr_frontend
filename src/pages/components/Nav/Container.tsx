import { color } from "@/theme/color";
import { font } from "@/theme/font";
import {
  Box,
  Button,
  Grid,
  ListItem,
  Modal,
  TableCell,
  TableRow,
  Typography,
  styled,
} from "@mui/material";

export const MainNavBox = styled(Box)(() => ({
  width: "100vw",
  height: "64px",
  background: color.secondary.light_sand,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 24px",
  borderBottom: `1px solid ${color.secondary.hyundai_and}`,
}));

export const MainNavIconBox = styled(Box)(() => ({
  display: "flex",
  gap: "8px",
}));

export const SubNavBox = styled(Box)(() => ({
  width: "100vw",
  height: "64px",
  background: color.secondary.light_sand,
  display: "flex",
  alignItems: "center",
  padding: "0 24px",
  gap: "8px",
}));

//ProfileModal
export const ProfileModalContainer = styled(Modal)(() => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  top: "60px",
  left: "-2px",
  width: "100%",
  height: "100%",
}));

export const ProfileModalBox = styled(Box)(() => ({
  maxWidth: "400px",
  height: "120px",
  background: color.secondary.light_sand,
  borderRadius: "10px",
}));

export const ProfileModalSection = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  padding: "14px 20px",
}));

export const ProfileInfocontainer = styled(Box)(() => ({
  overflow: "hidden",
  textOverflow: "ellipsis",
}));

export const ProfileInfoEmail = styled(Typography)(() => ({
  ...font.body1,
  color: color.text.black_70,
  whiteSpace: "nowrap",
}));

export const ProfileInfoRole = styled(Typography)(() => ({
  ...font.sub_element2,
  color: color.text.black_70,
  whiteSpace: "nowrap",
}));
export const ProfileLogOut = styled(Typography)(() => ({
  ...font.element4,
  color: color.text.black_70,
}));

//LogOutSureModal
export const LogOutSureModalBox = styled(Box)(() => ({
  width: "600px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  borderRadius: "10px",
  background: color.grey.white,
  padding: "20px",
}));

export const ModalHeadText = styled(Typography)(() => ({
  ...font.h2,
  color: color.text.black,
}));

export const ModalBodyText = styled(Typography)(() => ({
  ...font.element3,
  color: color.text.black,
  padding: "20px 0",
}));

export const ModalActionTextBox = styled(Box)(() => ({
  display: "flex",
  justifyContent: "end",
}));

export const ModalActionGrayText = styled(Typography)(() => ({
  ...font.body1,
  padding: "10px",
  color: color.text.black_40,
  textAlign: "end",
  cursor: "pointer",
  textTransform: "uppercase",
}));

export const ModalActionBlueText = styled(Typography)(() => ({
  ...font.body1,
  padding: "10px",
  color: color.primary.green,
  textAlign: "end",
  cursor: "pointer",
  textTransform: "uppercase",
}));

//LanguageChangeModal
export const LanguageChangeModalContainer = styled(Modal)(() => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-end",
  top: "60px",
  left: "-120px",
  width: "100%",
  height: "100%",
}));

export const LanguageChangeModalBox = styled(Box)(() => ({
  maxWidth: "400px",
  background: color.secondary.light_sand,
  borderRadius: "10px",
  padding: "8px 0",
  display: "grid",
  gap: "12px",
}));

export const LanguageText = styled(Typography)(() => ({
  ...font.sub_element5,
  color: color.text.black_70,
  width: "100px",
  padding: "6px 16px",
  cursor: "pointer",
  "&:hover": {
    background: "#EAEAEA",
  },
}));

//NotificationModal
export const NotificationModalContainer = styled(Box)(() => ({
  maxWidth: "380px",
  maxHeight: "550px",
  background: "#fff",
  borderRadius: "10px",
}));

export const NotificationModalHead = styled(Box)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "14px 20px",
}));

export const NotiHeadText = styled(Box)(() => ({
  ...font.label2,
  color: color.text.black,
}));

export const NotificationModalBox = styled(Box)(() => ({
  height: "450px",
  overflowY: "auto",
}));

export const NotificationModalListItem = styled(ListItem)(() => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "end",
  padding: "15px 20px",
  borderTop: "1px solid #EAEAEA",
  gap: "20px",
  "&:hover": {
    background: "#F6F3F2",
  },
}));

export const ListItemTextBox = styled(Box)(() => ({
  maxWidth: "266px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
}));

export const DetailText = styled(Typography)(() => ({
  ...font.element6,
  color: color.primary.green,
  cursor: "pointer",
}));

//NotiDropdownMenu
export const NotiDropdownMenuContainer = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
}));

//noti detail
export const NotiDetailModalContainer = styled(Box)(() => ({
  padding: "24px 30px",
  background: "#fff",
  borderRadius: "10px",
}));
export const NotiDetailSort = styled(Typography)(() => ({
  color: color.grey[600],
  ...font.element6,
}));
export const NotiDetailSubTitle = styled(Typography)(() => ({
  color: color.text.black,
  ...font.element6,
}));
export const NotiDetaildate = styled(Typography)(() => ({
  color: color.text.black_40,
  ...font.element7,
}));

export const NotiDetailText = styled(Typography)(() => ({
  color: color.grey[900],
  ...font.sub_element1,
}));

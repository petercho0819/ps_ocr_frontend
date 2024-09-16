import { color } from "@/theme/color";
import { font } from "@/theme/font";
import { Box, Grid, TableCell, Typography, styled } from "@mui/material";

export const LoginGrid = styled(Grid)(() => ({
  height: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
}));
export const LoginMainBox = styled(Box)(() => ({
  flex: 1,
  overflowY: "auto",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const LoginFormBox = styled(Box)(() => ({
  width: "500px",
  height: "100%",
  padding: "70px 53px",
  background: "white",
  margin: "auto",
  borderRadius: "10px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
}));

export const LoginFormContainer = styled(Box)(() => ({
  width: "394px",
  display: "grid",
  gap: "5px",
}));

export const LoginFormErrorText = styled(Typography)(() => ({
  ...font.sub_element1,
  width: "100%",
  textAlign: "start",
  color: color.secondary.active_red,
}));

//verify
export const VerifyMainBox = styled(Box)(() => ({
  width: "100vw",
  height: "100vh",
  background: "#E4DCD3",
}));

export const VerifySubBox = styled(Box)(() => ({
  position: "relative",
  top: "128px",
  width: "100vw",
  height: "calc(100% - 128px)",
}));

export const VerifyContainer = styled(Box)(() => ({
  background: "#E4DCD3",
  position: "relative",
  width: "100vw",
  height: "100%",
}));

export const VerifyLoading = styled(Box)(() => ({
  width: "100%",
  height: "100vh",
  top: "-128px",
  position: "absolute",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "rgba(141, 139, 139, 0.6)",
}));

export const VerifyContentMainBox = styled(Box)(() => ({
  height: "100%",
  width: "100%",
}));
export const VerifyFormContainer = styled(Box)(() => ({
  width: "394px",
  display: "flex",
  justifyContent: "space-between",
}));

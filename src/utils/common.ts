import { t } from "i18next";

export const weekDayTemplate = (dayType: string) => {
  switch (dayType) {
    case "monday":
      return "Monday";
    case "tuesday":
      return "Tuesday";
    case "wednesday":
      return "Wednesday";
    case "thursday":
      return "Thursday";
    case "friday":
      return "Friday";
    case "saturday":
      return "Saturday";
    case "sunday":
      return "Sunday";
    default:
      return "";
  }
};

export const convertDateFormat = (dateStr: any) => {
  if (dateStr) {
    const date = new Date(dateStr);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
  return "";
};

export const convertDateFormat3 = (dateStr: any) => {
  if (dateStr) {
    const parts = dateStr.split(" ");
    const dateParts = parts[0].split("-");

    const year = dateParts[0].padStart(2, "0");
    const month = dateParts[1].padStart(2, "0");
    const day = dateParts[2];

    const newDateStr = `${day}/${month}/${year}`;

    return newDateStr;
  }
};

export const convertToHHMMSS = (chatTotalDuration: number | undefined) => {
  if (!chatTotalDuration) return "00:00";
  const minutes = Math.floor((chatTotalDuration % 3600) / 60);
  const seconds = chatTotalDuration % 60;

  const formattedTime =
    ("0" + minutes).slice(-2) + ":" + ("0" + seconds).slice(-2);
  return formattedTime;
};

export const USER_ROLES = ["manager", "consultant"];

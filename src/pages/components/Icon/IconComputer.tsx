import { SvgIconProps } from "@mui/material";

export const IconComputer = (props: SvgIconProps) => {
  return (
    <svg
      width="40"
      height="39"
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M28.5 20L28.5 22C28.5 23.1046 27.6046 24 26.5 24L13.5 24C12.3954 24 11.5 23.1046 11.5 22L11.5 13C11.5 11.8954 12.3954 11 13.5 11L26.5 11C27.6046 11 28.5 11.8954 28.5 13L28.5 15"
        stroke="#002C5F"
        strokeWidth="2"
      />
      <rect x="15.5" y="27" width="9" height="2" rx="1" fill="#002C5F" />
      <rect
        width="6"
        height="2"
        rx="1"
        transform="matrix(-0.707107 0.707107 0.707107 0.707107 22.7422 13.1719)"
        fill="#002C5F"
      />
      <rect
        width="6"
        height="2"
        rx="1"
        transform="matrix(-0.707107 -0.707107 -0.707107 0.707107 24.1562 20.2422)"
        fill="#002C5F"
      />
      <rect
        width="7"
        height="2"
        rx="1"
        transform="matrix(-1 0 0 1 28.1562 16.5)"
        fill="#002C5F"
      />
    </svg>
  );
};

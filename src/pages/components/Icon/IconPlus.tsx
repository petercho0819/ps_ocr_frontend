import { SvgIcon, SvgIconProps } from "@mui/material";

export const IconPlus = (props: SvgIconProps & { status: "blue" | "gray" }) => {
  const blueIcon = (
    <SvgIcon {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2430_86217)">
          <path
            d="M15.8337 10.8327H10.8337V15.8327H9.16699V10.8327H4.16699V9.16602H9.16699V4.16602H10.8337V9.16602H15.8337V10.8327Z"
            fill="#00AAD2"
          />
        </g>
        <defs>
          <clipPath id="clip0_2430_86217">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );

  const grayIcon = (
    <SvgIcon {...props}>
      <svg
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clip-path="url(#clip0_2430_87881)">
          <path
            d="M15.8327 10.8327H10.8327V15.8327H9.16602V10.8327H4.16602V9.16602H9.16602V4.16602H10.8327V9.16602H15.8327V10.8327Z"
            fill="#B7B7B7"
          />
        </g>
        <defs>
          <clipPath id="clip0_2430_87881">
            <rect width="20" height="20" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </SvgIcon>
  );
  return props.status === "blue" ? blueIcon : grayIcon;
};

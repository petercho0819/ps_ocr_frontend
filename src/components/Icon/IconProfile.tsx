import { SvgIcon, SvgIconProps } from '@mui/material';
const IconProfile = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_2290_120502"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="41"
          height="41"
        >
          <circle cx="20.001" cy="20.001" r="20.001" fill="#00AAD2" />
        </mask>
        <g mask="url(#mask0_2290_120502)">
          <rect y="-0.5" width="58.0028" height="41.502" fill="#E4DCD3" />
        </g>
        <path
          d="M20.0004 20.0004C22.4868 20.0004 24.5006 17.9866 24.5006 15.5002C24.5006 13.0138 22.4868 11 20.0004 11C17.5141 11 15.5002 13.0138 15.5002 15.5002C15.5002 17.9866 17.5141 20.0004 20.0004 20.0004ZM20.0004 22.2505C16.9965 22.2505 11 23.7581 11 26.7507V29.0008H29.0008V26.7507C29.0008 23.7581 23.0043 22.2505 20.0004 22.2505Z"
          fill="white"
        />
      </svg>
    </SvgIcon>
  );
};
export default IconProfile;

import { SvgIcon, SvgIconProps } from '@mui/material';

const IconReorder = (props: SvgIconProps) => {
  return (
    <SvgIcon {...props}>
      <svg
        width="10"
        height="20"
        viewBox="0 0 10 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="3" cy="4" r="1" fill="#1C1B1B" fill-opacity="0.2" />
        <circle cx="3" cy="8" r="1" fill="#1C1B1B" fill-opacity="0.2" />
        <circle cx="3" cy="12" r="1" fill="#1C1B1B" fill-opacity="0.2" />
        <circle cx="3" cy="16" r="1" fill="#1C1B1B" fill-opacity="0.2" />
        <circle cx="7" cy="4" r="1" fill="#1C1B1B" fill-opacity="0.2" />
        <circle cx="7" cy="8" r="1" fill="#1C1B1B" fill-opacity="0.2" />
        <circle cx="7" cy="12" r="1" fill="#1C1B1B" fill-opacity="0.2" />
        <circle cx="7" cy="16" r="1" fill="#1C1B1B" fill-opacity="0.2" />
      </svg>
    </SvgIcon>
  );
};
export default IconReorder;

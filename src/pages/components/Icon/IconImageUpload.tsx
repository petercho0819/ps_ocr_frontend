export const IconImageUpload = () => {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_ddd_9_22526)">
        <rect x="5" y="4" width="32" height="32" rx="16" fill="#00AAD2" />
        <path
          d="M15.75 26H26.25V24.5H15.75V26ZM15.75 18.5H18.75V23H23.25V18.5H26.25L21 13.25L15.75 18.5Z"
          fill="white"
        />
      </g>
      <defs>
        <filter
          id="filter0_ddd_9_22526"
          x="0"
          y="0"
          width="42"
          height="42"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="1" />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.298039 0 0 0 0 0.305882 0 0 0 0 0.392157 0 0 0 0.12 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow_9_22526"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feOffset dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.298039 0 0 0 0 0.305882 0 0 0 0 0.392157 0 0 0 0.14 0"
          />
          <feBlend
            mode="normal"
            in2="effect1_dropShadow_9_22526"
            result="effect2_dropShadow_9_22526"
          />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
            result="hardAlpha"
          />
          <feMorphology
            radius="2"
            operator="erode"
            in="SourceAlpha"
            result="effect3_dropShadow_9_22526"
          />
          <feOffset dy="3" />
          <feGaussianBlur stdDeviation="0.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.298039 0 0 0 0 0.305882 0 0 0 0 0.392157 0 0 0 0.2 0"
          />
          <feBlend
            mode="normal"
            in2="effect2_dropShadow_9_22526"
            result="effect3_dropShadow_9_22526"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect3_dropShadow_9_22526"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};

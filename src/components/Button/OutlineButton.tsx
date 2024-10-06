import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ButtonProps } from '@mui/material';
import { color } from '@/theme/color';
import IconDownload from '../Icon/IconDownload';

type ButtonSize = 'default';
interface ColorButtonProps extends Omit<ButtonProps, 'size'> {
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: ButtonProps['type'];
}

const styleObj: Record<ButtonSize, Record<string, string>> = {
  default: {
    width: '114px',
    height: '38px',
    borderRadius: '8px',
    fontFamily: 'Hyundai Sans Head Regular',
    fontSize: '12px',
    padding: '7px 10px',
  },
};

const OutlineButton: React.FC<ColorButtonProps> = ({
  fullWidth = false,
  size = 'default',
  disabled = false,
  text,
  type,
  ...props
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleBlur = () => {
    if (!isFocused) {
      setIsHovered(false);
    }
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlurFocus = () => {
    setIsFocused(false);
    setIsHovered(false);
  };

  return (
    <Button
      fullWidth={fullWidth}
      disabled={disabled}
      type={type}
      onMouseEnter={handleHover}
      onMouseLeave={handleBlur}
      onFocus={handleFocus}
      onBlur={handleBlurFocus}
      sx={{
        ...styleObj[size],
        background: '#FFFFFF',
        color: '#00AAD2',
        border: '1px solid #00AAD2',
        '&:disabled': {
          color: '#FFFFFF',
          background: '#B7B7B7',
        },
        textTransform: 'none',
      }}
      {...props}
    >
      <Box sx={{ display: 'flex', gap: '8px' }}>{text}</Box>
      {text === 'DOWNLOAD' && <IconDownload />}
    </Button>
  );
};
OutlineButton.propTypes = {
  size: PropTypes.oneOf(['default']),
};

export default OutlineButton;

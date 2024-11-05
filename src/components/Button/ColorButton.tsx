import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ButtonProps } from '@mui/material';
import { color } from '@/theme/color';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import IconDashboardGray from '../Icon/IconDashboardGray';
import IconDashboardWhite from '../Icon/IconDashboardWhite';
import IconNavMember from '../Icon/IconNavMember';
import IconNavMemberWhite from '../Icon/IconNavMemberWhite';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import SettingsIcon from '@mui/icons-material/Settings';

type ButtonSize = 'maxl' | 'xl' | 'default' | 'small' | 'xs';
interface ColorButtonProps extends Omit<ButtonProps, 'size'> {
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  text?: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type: ButtonProps['type'];
  isActive?: boolean;
}

const styleObj: Record<ButtonSize, Record<string, string>> = {
  maxl: {
    width: '300px',
    height: '48px',
    fontFamily: 'Hyundai Sans Head Regular',
    fontSize: '16px',
    justifyContent: 'start',
    borderRadius: '8px',
    padding: '12px',
  },
  xl: {
    width: '216px',
    height: '48px',
    fontFamily: 'Hyundai Sans Head Regular',
    fontSize: '16px',
    justifyContent: 'start',
    borderRadius: '8px',
    padding: '12px',
  },
  default: {
    width: '148px',
    height: '48px',
    fontFamily: 'Hyundai Sans Head Regular',
    fontSize: '16px',
    borderRadius: '8px',
    padding: '12px',
  },
  small: {
    height: '50px',
    fontSize: '12px',
    borderRadius: '8px',
    padding: '12px',
  },
  xs: {
    height: '26px',
    fontSize: '12px',
    borderRadius: '4px',
    padding: '4px',
  },
};

const ColorButton: React.FC<ColorButtonProps> = ({
  fullWidth = false,
  size = 'default',
  disabled = false,
  text,
  type,
  isActive,
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
        color: '#11111166',
        '&:hover': {
          color: '#11111166',
          background: color.secondary.light_sand,
        },
        '&:focus': {
          color: '#FFFFFF',
          background: '#002C5F',
        },
        ...(isActive && {
          color: '#FFFFFF',
          background: '#002C5F',
        }),
        textTransform: 'none',
      }}
      {...props}
    >
      <Box sx={{ display: 'flex', gap: '8px' }}>
        {text === 'Dashboard' &&
          (isActive || isFocused ? (
            <IconDashboardWhite />
          ) : (
            <IconDashboardGray />
          ))}
        {text === 'Receipt' &&
          (isActive || isFocused ? <ReceiptLongIcon /> : <ReceiptLongIcon />)}
        {text === 'My Page' &&
          (isActive || isFocused ? <IconNavMemberWhite /> : <IconNavMember />)}
        {text === 'Setting' &&
          (isActive || isFocused ? <SettingsIcon /> : <SettingsIcon />)}
        {text === 'Member' &&
          (isActive || isFocused ? <PersonSearchIcon /> : <PersonSearchIcon />)}
        {text}
      </Box>
    </Button>
  );
};
ColorButton.propTypes = {
  size: PropTypes.oneOf(['maxl', 'xl', 'default', 'small', 'xs']),
};

export default ColorButton;

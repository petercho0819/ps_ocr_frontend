import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Box, Button, ButtonProps } from '@mui/material';
import { IconDashboardWhite } from '@/pages/components/Icon/IconDashboardWhite';
import { IconDashboardGray } from '@/pages/components/Icon/IconDashboardGray';
import { IconCalendarWhite } from '@/pages/components/Icon/IconCalendarWhite';
import { IconNavSchedule } from '@/pages/components/Icon/IconNavSchedule';
import { IconNavMemberWhite } from '@/pages/components/Icon/IconNavMemberWhite';
import { IconNavMember } from '@/pages/components/Icon/IconNavMember';
import { IconNavDealershipWhite } from '@/pages/components/Icon/IconNavDealershipWhite';
import { IconNavDealership } from '@/pages/components/Icon/IconNavDealership';
import { IconDownload } from '@/pages/components/Icon/IconDownload';
import { IconNavPoliciesWhite } from '@/pages/components/Icon/IconNavPoliciesWhite';
import { IconNavPolicies } from '@/pages/components/Icon/IconNavPolicies';
import { IconNavSubscription } from '../Icon/IconNavSubscription';
import { IconNavModelsetting } from '../Icon/IconNavModelsetting';
import { IconNavApisetting } from '../Icon/IconNavApisetting';
import { IconNavLaivsetting } from '../Icon/IconNavLaivsetting';
import { IconNavTranslation } from '../Icon/IconNavTranslation';
import { IconNavApisettingWhite } from '../Icon/IconNavApisettingWhite';
import { IconNavLaivsettingWhite } from '../Icon/IconNavLaivsettingWhite';
import { IconNavModelsettingWhite } from '../Icon/IconNavModelsettingWhite';
import { IconNavSubscriptionWhite } from '../Icon/IconNavSubscriptionWhite';
import { color } from '@/theme/color';

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
          (isActive || isFocused ? <IconCalendarWhite /> : <IconNavSchedule />)}
        {text === 'My Page' &&
          (isActive || isFocused ? <IconNavMemberWhite /> : <IconNavMember />)}
        {text}
      </Box>
    </Button>
  );
};
ColorButton.propTypes = {
  size: PropTypes.oneOf(['maxl', 'xl', 'default', 'small', 'xs']),
};

export default ColorButton;

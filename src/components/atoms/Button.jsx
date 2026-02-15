import MuiButton from '@mui/material/Button';
import { shapeTokens } from '../../utils/shapes.js';

/** Standard sizing: M3 component heights (px). */
const SIZES = {
  extraSmall: { minHeight: 28, paddingInline: 12, fontSize: '0.75rem' },
  small: { minHeight: 32, paddingInline: 16, fontSize: '0.8125rem' },
  medium: { minHeight: 40, paddingInline: 20, fontSize: '0.875rem' },
  large: { minHeight: 48, paddingInline: 24, fontSize: '0.875rem' },
  extraLarge: { minHeight: 56, paddingInline: 28, fontSize: '1rem' },
};

const MUI_SIZE_MAP = {
  extraSmall: 'small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'large',
};

/**
 * Button atom - MUI Button with MD3 theme.
 * Variants: filled (contained), outlined, text.
 * Sizes: extraSmall, small, medium, large, extraLarge (standard sizing).
 * Shape: pill (full radius), rounded (corner-large).
 */
export const Button = ({
  variant = 'contained',
  size = 'medium',
  color = 'primary',
  disabled = false,
  shape = 'rounded',
  disableElevation = false,
  children,
  startIcon,
  endIcon,
  sx,
  ...props
}) => {
  const sizeConfig = SIZES[size] ?? SIZES.medium;
  const muiSize = MUI_SIZE_MAP[size] ?? 'medium';
  const borderRadius =
    shape === 'pill' ? shapeTokens['corner-full'] : shapeTokens['corner-large'];

  return (
    <MuiButton
      variant={variant}
      size={muiSize}
      color={color}
      disabled={disabled}
      disableElevation={disableElevation}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={{
        minHeight: sizeConfig.minHeight,
        paddingLeft: sizeConfig.paddingInline,
        paddingRight: sizeConfig.paddingInline,
        borderRadius,
        fontSize: sizeConfig.fontSize,
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

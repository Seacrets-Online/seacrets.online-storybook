import MuiButton from '@mui/material/Button';
import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { shapeTokens } from '../../utils/shapes';

export type ButtonSize = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
type ButtonShape = 'pill' | 'rounded';

const SIZES: Record<ButtonSize, { minHeight: number; paddingInline: number; fontSize: string }> = {
  extraSmall: { minHeight: 28, paddingInline: 12, fontSize: '0.75rem' },
  small: { minHeight: 32, paddingInline: 16, fontSize: '0.8125rem' },
  medium: { minHeight: 40, paddingInline: 20, fontSize: '0.875rem' },
  large: { minHeight: 48, paddingInline: 24, fontSize: '0.875rem' },
  extraLarge: { minHeight: 56, paddingInline: 28, fontSize: '1rem' },
};

const MUI_SIZE_MAP: Record<ButtonSize, 'small' | 'medium' | 'large'> = {
  extraSmall: 'small',
  small: 'small',
  medium: 'medium',
  large: 'large',
  extraLarge: 'large',
};

export interface ButtonProps extends Omit<MuiButtonProps, 'size'> {
  size?: ButtonSize;
  shape?: ButtonShape;
}

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
}: ButtonProps) => {
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
        px: { xs: Math.max(8, sizeConfig.paddingInline / 2), sm: sizeConfig.paddingInline }, // Responsive padding
        borderRadius,
        fontSize: sizeConfig.fontSize,
        maxWidth: '100%', // Ensure button doesn't overflow container
        ...sx,
      }}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

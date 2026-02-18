import { Button as MuiButton } from '@mui/material';
import type { ButtonProps as MuiButtonProps, SxProps, Theme } from '@mui/material';
import { shapeTokens } from '../../utils/shapes';

export type ButtonSize = 'extraSmall' | 'small' | 'medium' | 'large' | 'extraLarge';
export type ButtonShape = 'pill' | 'rounded' | 'square';

const SIZES: Record<ButtonSize, { minHeight: number; paddingInline: number; paddingBlock: number; fontSize: string }> = {
  extraSmall: { minHeight: 28, paddingInline: 12, paddingBlock: 4, fontSize: '0.75rem' },
  small: { minHeight: 32, paddingInline: 12, paddingBlock: 4, fontSize: '0.8125rem' },
  medium: { minHeight: 40, paddingInline: 12, paddingBlock: 4, fontSize: '0.875rem' },
  large: { minHeight: 48, paddingInline: 12, paddingBlock: 4, fontSize: '0.875rem' },
  extraLarge: { minHeight: 48, paddingInline: 12, paddingBlock: 4, fontSize: '1rem' },
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
    shape === 'pill'
      ? shapeTokens['corner-full']
      : shape === 'square'
        ? shapeTokens['corner-small']
        : shapeTokens['corner-large'];

  const baseButtonSx = {
    minHeight: sizeConfig.minHeight,
    px: { xs: Math.max(8, sizeConfig.paddingInline / 2), sm: sizeConfig.paddingInline },
    py: `${sizeConfig.paddingBlock}px`,
    borderRadius,
    fontSize: sizeConfig.fontSize,
    maxWidth: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <MuiButton
      variant={variant}
      size={muiSize}
      color={color}
      disabled={disabled}
      disableElevation={disableElevation}
      startIcon={startIcon}
      endIcon={endIcon}
      sx={[baseButtonSx, ...(sx ? [sx] : [])] as SxProps<Theme>}
      {...props}
    >
      {children}
    </MuiButton>
  );
};

export default Button;

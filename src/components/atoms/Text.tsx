import { Typography as MuiTypography } from '@mui/material';
import type { TypographyProps } from '@mui/material';
import type { TypographyTokenName } from '../../utils/typography';

/** Typography wrapper using MD3 tokens from typography.generated.ts. Named AppText to avoid shadowing DOM Text constructor. */
type TextProps = Omit<TypographyProps, 'variant'> & {
  variant?: TypographyTokenName | TypographyProps['variant'];
};

const AppText = ({ variant = 'body-medium', ...props }: TextProps) => (
  <MuiTypography variant={variant} {...props} />
);

export { AppText as Text };
export default AppText;

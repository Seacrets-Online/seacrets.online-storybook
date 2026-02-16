import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import Link from '../atoms/Link';

export interface LegalLinksProps extends Omit<BoxProps, 'children'> {
  termsHref?: string;
  privacyHref?: string;
  cookiesHref?: string;
  contactHref?: string;
}

const defaultHref = '#';

const baseLegalLinksSx = {
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  columnGap: 2,
  rowGap: 1,
  '& a': { color: 'text.secondary', fontSize: '0.75rem', textDecoration: 'none' },
};

export const LegalLinks = ({
  termsHref = defaultHref,
  privacyHref = defaultHref,
  cookiesHref = defaultHref,
  contactHref = defaultHref,
  sx,
  ...boxProps
}: LegalLinksProps) => (
  <Box sx={[baseLegalLinksSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...boxProps}>
    <Link href={termsHref} underline="hover">
      Terms of Service
    </Link>
    <Link href={privacyHref} underline="hover">
      Privacy
    </Link>
    <Link href={cookiesHref} underline="hover">
      Cookies Policy
    </Link>
    <Link href={contactHref} underline="hover">
      Contact
    </Link>
  </Box>
);

export default LegalLinks;

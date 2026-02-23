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

const baseLegalLinksSx: SxProps<Theme> = (theme) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
  columnGap: theme.layout.space16,
  rowGap: theme.layout.space8,
  '& a': {
    color: 'var(--md-sys-color-outline)',
    textDecoration: 'none',
    fontFamily: 'var(--md-sys-typescale-label-small-font-family)',
    fontSize: '10px',
    fontWeight: 'var(--md-sys-typescale-label-small-font-weight)',
    lineHeight: 1.4,
    letterSpacing: 'var(--md-sys-typescale-label-small-letter-spacing)',
  },
});

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

import { Container, Box } from '@mui/material';
import AuthForm from '../organisms/AuthForm';
import SocialAuthRow from '../organisms/SocialAuthRow';
import Button from '../atoms/Button';
import Link from '../atoms/Link';
import LegalLinks from '../molecules/LegalLinks';
import Icon from '../atoms/Icon';
import Text from '../atoms/Text';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import type { AuthFormCredentials } from '../organisms/AuthForm';
import type { SocialAuthProvider } from '../organisms/SocialAuthRow';
import { Star } from '../../icons';
import logoSvg from '../../assets/seacrets-logo.svg';
import paymentBadgesSvg from '../../assets/payment-badges.svg';

export interface LoginTemplateProps extends BoxProps {
  /** Which screen to show: login form or forgot-password (email only) */
  screen?: 'login' | 'forgotPassword';
  title?: string;
  subtitle?: string;
  onLogin?: (credentials: AuthFormCredentials) => void;
  onForgotPassword?: () => void;
  /** Called when user submits email on forgot-password screen */
  onRequestReset?: (email: string) => void;
  /** Called when user clicks "Back to sign in" on forgot-password screen */
  onBackToLogin?: () => void;
  /** LOGIN layout: show language selector, logo, OR divider, Google login, reCAPTCHA, footer */
  variant?: 'default' | 'login';
  logoSrc?: string;
  languageLabel?: string;
  onLanguageClick?: () => void;
  providers?: SocialAuthProvider[];
  dividerLabel?: string;
  onCreateAccount?: () => void;
  onPrivacyTermsClick?: () => void;
  createAccountLabel?: string;
  sendResetLabel?: string;
  backToLoginLabel?: string;
}

export const LoginTemplate = ({
  screen = 'login',
  title = 'Sign in',
  subtitle,
  onLogin,
  onForgotPassword,
  onRequestReset,
  onBackToLogin,
  variant = 'login',
  logoSrc,
  languageLabel = 'Idiom : ENGLISH',
  onLanguageClick,
  providers = [],
  dividerLabel = 'OR',
  onCreateAccount,
  onPrivacyTermsClick,
  createAccountLabel = 'Create an Account?',
  sendResetLabel = 'Send reset link',
  backToLoginLabel = 'Back to sign in',
  sx,
  ...props
}: LoginTemplateProps) => {
  const isLogin = variant === 'login';
  const isForgotPassword = screen === 'forgotPassword';
  const logoSrcResolved = logoSrc ?? (isLogin ? logoSvg : undefined);

  const baseLoginTemplateSx = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    bgcolor: 'background.default',
  };

  return (
    <Box sx={[baseLoginTemplateSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
      <Container maxWidth="xs" sx={{ px: 4, py: 3 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', alignItems: 'center' }}>
          {isForgotPassword ? (
            <>
              <Text variant="h4" component="h1" gutterBottom align="center">
                {title}
              </Text>
              {subtitle && (
                <Text
                  variant="body2"
                  color="text.secondary"
                  align="center"
                  sx={{ mb: 3 }}
                >
                  {subtitle}
                </Text>
              )}
              <AuthForm
                mode="forgotPassword"
                onRequestReset={onRequestReset}
                sendResetLabel={sendResetLabel}
                sx={{ width: '100%' }}
              />
              {onBackToLogin && (
                <Button
                  variant="text"
                  onClick={onBackToLogin}
                  sx={{ mt: 3, textTransform: 'none', fontWeight: 500, color: 'primary.main', fontSize: '1rem' }}
                >
                  {backToLoginLabel}
                </Button>
              )}
            </>
          ) : (
            <>
              {isLogin && (
                <>
                  {logoSrcResolved && (
                    <Box
                      component="img"
                      src={logoSrcResolved}
                      alt="Seacrets"
                      sx={{
                        height: 80,
                        width: 'auto',
                        mb: 4,
                        mt: 2,
                        filter: 'none',
                      }}
                    />
                  )}
                  {onLanguageClick && (
                    <Button
                      variant="text"
                      onClick={onLanguageClick}
                      startIcon={<Icon icon={Star} sx={{ fontSize: 18 }} />}
                      sx={{
                        color: 'text.primary',
                        alignSelf: 'center',
                        mb: 5,
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        textTransform: 'none',
                        '& .MuiButton-startIcon': { marginRight: 1 },
                      }}
                    >
                      {languageLabel}
                    </Button>
                  )}
                </>
              )}
              {!isLogin && (
                <>
                  <Text variant="h4" component="h1" gutterBottom align="center">
                    {title}
                  </Text>
                  {subtitle && (
                    <Text
                      variant="body2"
                      color="text.secondary"
                      align="center"
                      sx={{ mb: 3 }}
                    >
                      {subtitle}
                    </Text>
                  )}
                </>
              )}
              <AuthForm
                onSubmit={onLogin}
                onForgotPassword={onForgotPassword}
                submitLabel={isLogin ? 'Login' : 'Sign in'}
                showRememberMe={isLogin}
                sx={{ width: '100%' }}
              />
              {isLogin && (
            <>
              <SocialAuthRow
                providers={providers}
                dividerLabel={dividerLabel}
                sx={{
                  width: '100%',
                  mt: 4
                }}
              />
              <Text
                variant="caption"
                sx={{ color: 'text.secondary', mt: 3, textAlign: 'center', fontSize: '0.75rem' }}
              >
                protected by reCAPTCHA{' '}
                {onPrivacyTermsClick && (
                  <Link component="button" onClick={onPrivacyTermsClick} sx={{ cursor: 'pointer', fontSize: 'inherit', fontWeight: 400, color: 'primary.main', textDecoration: 'none' }}>
                    Privacy - Terms
                  </Link>
                )}
              </Text>
              {onCreateAccount && (
                <Button
                  variant="text"
                  onClick={onCreateAccount}
                  sx={{ mt: 4, textTransform: 'none', fontWeight: 500, color: 'primary.main', fontSize: '1rem' }}
                >
                  {createAccountLabel}
                </Button>
              )}
              <Box
                component="img"
                src={paymentBadgesSvg}
                alt="Payment methods"
                sx={{ mt: 6, height: 32, width: 'auto' }}
              />
              <LegalLinks sx={{ mt: 3, pb: 2 }} />
            </>
              )}
            </>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default LoginTemplate;

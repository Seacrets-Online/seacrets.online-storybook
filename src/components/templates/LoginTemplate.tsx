import { useState, useEffect } from 'react';
import { Container, Box, useTheme } from '@mui/material';
import AuthForm from '../organisms/AuthForm';
import SocialAuthRow from '../organisms/SocialAuthRow';
import Button from '../atoms/Button';
import Link from '../atoms/Link';
import LegalLinks from '../molecules/LegalLinks';
import LanguagePopper, { type LanguageOption } from '../molecules/LanguagePopper';
import Text from '../atoms/Text';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import type { AuthFormCredentials } from '../organisms/AuthForm';
import type { SocialAuthProvider } from '../organisms/SocialAuthRow';
import logoSvg from '../../assets/seacrets-logo.svg';
import paymentBadgesSvg from '../../assets/payment-badges.svg';

export interface LoginTemplateProps extends BoxProps {
  /** Optional header (e.g. GlobalHeader) for app consistency */
  header?: React.ReactNode;
  /** Which screen to show: login form or forgot-password (email only) */
  screen?: 'login' | 'forgotPassword';
  title?: string;
  subtitle?: string;
  /** Title when on forgot-password screen (default: "Forgot password?") */
  forgotPasswordTitle?: string;
  /** Subtitle when on forgot-password screen */
  forgotPasswordSubtitle?: string;
  onLogin?: (credentials: AuthFormCredentials) => void;
  onForgotPassword?: () => void;
  /** Called when user submits email on forgot-password screen */
  onRequestReset?: (email: string) => void;
  /** Called when user clicks "Back to sign in" on forgot-password screen */
  onBackToLogin?: () => void;
  /** LOGIN layout: show language selector, logo, OR divider, Google login, reCAPTCHA, footer */
  variant?: 'default' | 'login';
  logoSrc?: string;
  languageValue?: string;
  languageOptions?: LanguageOption[];
  onLanguageChange?: (code: string) => void;
  providers?: SocialAuthProvider[];
  dividerLabel?: string;
  onCreateAccount?: () => void;
  onPrivacyTermsClick?: () => void;
  createAccountLabel?: string;
  sendResetLabel?: string;
  backToLoginLabel?: string;
}

export const LoginTemplate = ({
  header,
  screen = 'login',
  title = 'Sign in',
  subtitle,
  forgotPasswordTitle = 'Forgot password?',
  forgotPasswordSubtitle = "Enter your email and we'll send you a reset link.",
  onLogin,
  onForgotPassword,
  onRequestReset,
  onBackToLogin,
  variant = 'login',
  logoSrc,
  languageValue = 'en',
  languageOptions,
  onLanguageChange,
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
  const [currentScreen, setCurrentScreen] = useState(screen);
  useEffect(() => setCurrentScreen(screen), [screen]);
  const isLogin = variant === 'login';
  const isForgotPassword = currentScreen === 'forgotPassword';

  const handleForgotPassword = () => {
    setCurrentScreen('forgotPassword');
    onForgotPassword?.();
  };

  const handleBackToLogin = () => {
    setCurrentScreen('login');
    onBackToLogin?.();
  };
  const logoSrcResolved = logoSrc ?? (isLogin ? logoSvg : undefined);
  const theme = useTheme();
  const layout = theme.layout;

  const baseLoginTemplateSx = {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    bgcolor: 'background.default',
  };

  return (
    <Box sx={[baseLoginTemplateSx, ...(header ? [{ justifyContent: 'flex-start' }] : []), ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
      <Container
        maxWidth="sm"
        sx={(t) => ({
          px: t.layout.space16,
          py: t.layout.space16,
          ...(header ? { flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-start' } : {}),
        })}
      >
        {header && <Box sx={(t) => ({ flexShrink: 0, width: '100%', mb: t.layout.space24 })}>{header}</Box>}
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: '100%',
            alignItems: 'center',
            ...(header ? { flex: 1, justifyContent: 'center' } : {}),
          }}
        >
          {isForgotPassword ? (
            <Box sx={{ width: '100%', mt: layout.contentBlockMt }}>
              <Text variant="pageTitle" component="h1" align="center">
                {forgotPasswordTitle}
              </Text>
              {forgotPasswordSubtitle && (
                <Text
                  variant="pageSubtitle"
                  color="text.secondary"
                  align="center"
                >
                  {forgotPasswordSubtitle}
                </Text>
              )}
              <AuthForm
                mode="forgotPassword"
                onRequestReset={onRequestReset}
                sendResetLabel={sendResetLabel}
                sx={{ width: '100%' }}
              />
              <Button
                variant="text"
                onClick={handleBackToLogin}
                sx={{ mt: layout.afterForm, color: 'primary.main' }}
              >
                <Text variant="title-medium" sx={{ color: 'inherit' }}>
                  {backToLoginLabel}
                </Text>
              </Button>
            </Box>
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
                        mb: layout.space32,
                        mt: layout.space16,
                        filter: 'none',
                      }}
                    />
                  )}
                  {onLanguageChange && (
                    <Box sx={{ mb: layout.space32, alignSelf: 'center' }}>
                      <LanguagePopper
                        value={languageValue}
                        options={languageOptions}
                        onChange={onLanguageChange}
                      />
                    </Box>
                  )}
                </>
              )}
              {!isLogin && (
                <>
                  <Text variant="pageTitle" component="h1" align="center">
                    {title}
                  </Text>
                  {subtitle && (
                    <Text
                      variant="pageSubtitle"
                      color="text.secondary"
                      align="center"
                    >
                      {subtitle}
                    </Text>
                  )}
                </>
              )}
              <AuthForm
                onSubmit={onLogin}
                onForgotPassword={onForgotPassword ? handleForgotPassword : undefined}
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
                  mt: layout.space32
                }}
              />
              <Text
                variant="label-small"
                sx={{ color: 'text.disabled', mt: layout.space24, textAlign: 'center' }}
              >
                protected by reCAPTCHA{' '}
                {onPrivacyTermsClick && (
                  <Link component="button" onClick={onPrivacyTermsClick} sx={{ cursor: 'pointer', fontSize: 'inherit', color: 'text.disabled', textDecoration: 'none' }}>
                    Privacy - Terms
                  </Link>
                )}
              </Text>
              {onCreateAccount && (
                <Button
                  variant="text"
                  onClick={onCreateAccount}
                  sx={{ mt: layout.space32, color: 'primary.main' }}
                >
                  <Text variant="title-medium" sx={{ color: 'inherit' }}>
                    {createAccountLabel}
                  </Text>
                </Button>
              )}
              <Box
                component="img"
                src={paymentBadgesSvg}
                alt="Payment methods"
                sx={{ mt: layout.space48, height: 32, width: 'auto' }}
              />
              <LegalLinks sx={{ mt: layout.space24, pb: layout.space16 }} />
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

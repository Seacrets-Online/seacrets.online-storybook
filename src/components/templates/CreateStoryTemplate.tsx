import { Box, Container } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { ChevronLeft, PlayCircleOutline } from '@mui/icons-material';
import CreateStoryForm from '../organisms/CreateStoryForm';
import Text from '../atoms/Text';

export interface CreateStoryTemplateProps extends Omit<BoxProps, 'onSubmit'> {
  /** Optional header (e.g. GlobalHeader) for app consistency */
  header?: React.ReactNode;
  onBack?: () => void;
  onSubmit?: (data: { file?: File; description: string }) => void;
  title?: string;
  backLabel?: string;
}

const rootSx: SxProps<Theme> = {
  width: '100%',
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.default',
};

export const CreateStoryTemplate = ({
  header,
  onBack,
  onSubmit,
  title = 'Crear Historia',
  backLabel = 'Volver',
  sx,
  ...props
}: CreateStoryTemplateProps) => (
  <Box sx={[rootSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
    <Container
      maxWidth={false}
      sx={(t) => ({
        flex: 1,
        width: '100%',
        maxWidth: '100%',
        px: t.layout.space16,
        py: t.layout.space16,
        display: 'flex',
        flexDirection: 'column',
      })}
    >
      {header && <Box sx={(t) => ({ flexShrink: 0, width: '100%', mb: t.layout.space24 })}>{header}</Box>}
      {onBack && (
        <Box
          component="button"
          type="button"
          onClick={onBack}
          aria-label={backLabel}
          sx={(t) => ({
          display: 'flex',
          alignItems: 'center',
          gap: t.layout.space4,
          mb: t.layout.space16,
          p: 0,
          border: 0,
          background: 'none',
          font: 'inherit',
          color: 'text.secondary',
          cursor: 'pointer',
          '&:hover': { color: 'text.primary' },
        })}
      >
        <ChevronLeft sx={{ fontSize: 24 }} />
        <Text variant="body2" sx={{ color: 'inherit' }}>
          {backLabel}
        </Text>
      </Box>
      )}

      <Box
        sx={(t) => ({
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: t.layout.space8,
          mb: t.layout.space24,
        })}
      >
        <PlayCircleOutline sx={{ fontSize: 32, color: 'text.primary' }} />
        <Text variant="h6" component="h1" sx={{ fontWeight: 500, color: 'text.primary' }}>
          {title}
        </Text>
      </Box>

      <CreateStoryForm onSubmit={onSubmit} sx={{ flex: 1 }} />
    </Container>
  </Box>
);

export default CreateStoryTemplate;

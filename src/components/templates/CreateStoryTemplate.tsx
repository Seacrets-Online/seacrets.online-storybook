import { Box, Container } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { ChevronLeft, PlayCircleOutline } from '@mui/icons-material';
import CreateStoryForm from '../organisms/CreateStoryForm';
import Text from '../atoms/Text';

export interface CreateStoryTemplateProps extends Omit<BoxProps, 'onSubmit'> {
  onBack?: () => void;
  onSubmit?: (data: { file?: File; description: string }) => void;
  title?: string;
  backLabel?: string;
}

const rootSx: SxProps<Theme> = {
  flex: 1,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  bgcolor: 'background.default',
};

export const CreateStoryTemplate = ({
  onBack,
  onSubmit,
  title = 'Crear Historia',
  backLabel = 'Volver',
  sx,
  ...props
}: CreateStoryTemplateProps) => (
  <Box sx={[rootSx, ...(sx ? [sx] : [])] as SxProps<Theme>} {...props}>
    <Container maxWidth="xs" sx={{ flex: 1, minHeight: 0, width: '100%', px: 4, py: 3, display: 'flex', flexDirection: 'column' }}>
      {onBack && (
        <Box
          component="button"
          type="button"
          onClick={onBack}
          aria-label={backLabel}
          sx={{
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          mb: 2,
          p: 0,
          border: 0,
          background: 'none',
          font: 'inherit',
          color: 'text.secondary',
          cursor: 'pointer',
          '&:hover': { color: 'text.primary' },
        }}
      >
        <ChevronLeft sx={{ fontSize: 24 }} />
        <Text variant="body2" sx={{ color: 'inherit' }}>
          {backLabel}
        </Text>
      </Box>
      )}

      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          mb: 3,
        }}
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

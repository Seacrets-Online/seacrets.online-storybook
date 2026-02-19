import { useState } from 'react';
import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import Button from '../atoms/Button';
import Text from '../atoms/Text';
import TextField from '../molecules/TextField';
import UploadArea from '../molecules/UploadArea';
import LegalLinks from '../molecules/LegalLinks';

export interface CreateStoryFormProps extends Omit<BoxProps, 'onSubmit'> {
  onSubmit?: (data: { file?: File; description: string }) => void;
  infoLabel?: string;
  uploadLabel?: string;
  descriptionPlaceholder?: string;
  submitLabel?: string;
}

export const CreateStoryForm = ({
  onSubmit,
  infoLabel = 'Recuerda que estamos analizando todo el contenido subido.',
  uploadLabel = 'Subir Foto o Video',
  descriptionPlaceholder = 'Descripción',
  submitLabel = 'Subir',
  sx,
  ...props
}: CreateStoryFormProps) => {
  const [file, setFile] = useState<File | undefined>();
  const [description, setDescription] = useState('');

  const handleSubmit = () => {
    onSubmit?.({ file, description });
  };

  return (
    <Box
      component="form"
      onSubmit={(e: React.FormEvent) => {
        e.preventDefault();
        handleSubmit();
      }}
      sx={[
        {
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          mt: 1,
          flex: 1,
          minHeight: 0,
        },
        ...(sx ? [sx] : []),
      ] as SxProps<Theme>}
      {...props}
    >
      <Text variant="body2" color="text.secondary" align="center" sx={{ mb: 0.5 }}>
        {infoLabel}
      </Text>

      <UploadArea
        id="create-story-upload"
        label={uploadLabel}
        fileName={file?.name}
        onSelect={setFile}
        accept="image/*,video/*"
      />

      <TextField
        placeholder={descriptionPlaceholder}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        multiline
        minRows={2}
      />

      <Button
        type="submit"
        variant="contained"
        fullWidth
        size="large"
        sx={{
          bgcolor: 'var(--seacrets-online-schemes-surface-container-low)',
          color: 'text.primary',
          '&:hover': { bgcolor: 'var(--seacrets-online-schemes-surface-container)' },
        }}
      >
        {submitLabel}
      </Button>

      <LegalLinks sx={{ mt: 'auto', pt: 4, pb: 2 }} />
    </Box>
  );
};

export default CreateStoryForm;

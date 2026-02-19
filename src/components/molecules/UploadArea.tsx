import { useRef } from 'react';
import { Box } from '@mui/material';
import type { BoxProps, SxProps, Theme } from '@mui/material';
import { CloudUpload } from '@mui/icons-material';
import Text from '../atoms/Text';

export interface UploadAreaProps extends Omit<BoxProps, 'onSelect'> {
  label?: string;
  fileName?: string;
  onSelect?: (file: File) => void;
  accept?: string;
  id?: string;
}

const surfaceSx: SxProps<Theme> = {
  bgcolor: 'var(--seacrets-online-schemes-surface-container-low)',
  borderRadius: '10px',
};

const areaSx: SxProps<Theme> = {
  ...surfaceSx,
  minHeight: 140,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 1.5,
  cursor: 'pointer',
  border: '1px dashed',
  borderColor: 'divider',
  '&:hover': {
    borderColor: 'primary.main',
    bgcolor: 'action.hover',
  },
};

export const UploadArea = ({
  label = 'Subir Foto o Video',
  fileName,
  onSelect,
  accept = 'image/*,video/*',
  id = 'upload-area',
  sx,
  ...props
}: UploadAreaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleClick = () => inputRef.current?.click();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) onSelect?.(f);
    e.target.value = '';
  };

  return (
    <Box
      component="label"
      htmlFor={id}
      sx={[areaSx, ...(sx ? [sx] : [])] as SxProps<Theme>}
      onClick={handleClick}
      {...props}
    >
      <input ref={inputRef} id={id} type="file" accept={accept} hidden onChange={handleChange} />
      <CloudUpload sx={{ fontSize: 40, color: 'text.secondary' }} />
      <Text variant="body1" sx={{ color: 'text.primary', fontWeight: 500 }}>
        {label}
      </Text>
      {fileName && (
        <Text variant="caption" color="text.secondary">
          {fileName}
        </Text>
      )}
    </Box>
  );
};

export default UploadArea;

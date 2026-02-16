import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '../atoms/Button';
import Typography from '@mui/material/Typography';
import type { BoxProps } from '@mui/material/Box';

export interface FileUploadProps extends Omit<BoxProps, 'onSelect'> {
  onSelect?: (files: File | File[]) => void;
  accept?: string;
  multiple?: boolean;
  label?: string;
  hint?: string;
}

export const FileUpload = ({
  onSelect,
  accept,
  multiple = false,
  label = 'Choose file',
  hint,
  ...props
}: FileUploadProps) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files?.length) {
      setFileName(
        multiple ? `${files.length} files` : files[0]!.name
      );
      onSelect?.(multiple ? Array.from(files) : files[0]!);
    }
  };

  return (
    <Box {...props}>
      <Button variant="outlined" component="label">
        {label}
        <input
          type="file"
          hidden
          accept={accept}
          multiple={multiple}
          onChange={handleChange}
        />
      </Button>
      {fileName && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          {fileName}
        </Typography>
      )}
      {hint && (
        <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 0.5 }}>
          {hint}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;

import { useState } from 'react';
import { Box, Typography } from '@mui/material';
import type { BoxProps } from '@mui/material';
import Button from '../atoms/Button';

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
        <Typography variant="body2" color="text.secondary" sx={(t) => ({ mt: t.layout.space8 })}>
          {fileName}
        </Typography>
      )}
      {hint && (
        <Typography variant="caption" color="text.secondary" display="block" sx={(t) => ({ mt: t.layout.space4 })}>
          {hint}
        </Typography>
      )}
    </Box>
  );
};

export default FileUpload;

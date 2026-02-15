import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '../atoms/Button.jsx';
import Typography from '@mui/material/Typography';

/**
 * FileUpload organism - Upload area wrapper.
 * Composes Button atom.
 */
export const FileUpload = ({
  onSelect,
  accept,
  multiple = false,
  label = 'Choose file',
  hint,
  ...props
}) => {
  const [fileName, setFileName] = useState('');

  const handleChange = (e) => {
    const files = e.target.files;
    if (files?.length) {
      setFileName(
        multiple ? `${files.length} files` : files[0].name
      );
      onSelect?.(multiple ? Array.from(files) : files[0]);
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

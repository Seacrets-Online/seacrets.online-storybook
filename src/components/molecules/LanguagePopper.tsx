import { useState, useRef } from 'react';
import { Popper, Paper, ClickAwayListener, ToggleButton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';

export interface LanguageOption {
  code: string;
  label: string;
}

const defaultOptions: LanguageOption[] = [
  { code: 'en', label: 'ENGLISH' },
  { code: 'es', label: 'ESPAÑOL' },
  { code: 'pt', label: 'PORTUGUÊS' },
  { code: 'fr', label: 'FRANÇAIS' },
];

export interface LanguagePopperProps {
  value?: string;
  options?: LanguageOption[];
  onChange?: (code: string) => void;
  label?: string;
  sx?: SxProps<Theme>;
}

const buttonSx: SxProps<Theme> = {
  color: 'text.primary',
  alignSelf: 'center',
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  border: 'none',
  '&.Mui-selected, &.Mui-selected:hover': {
    border: 'none',
  },
};

const paperSx: SxProps<Theme> = {
  mt: 1,
  minWidth: 160,
  py: 0.5,
  boxShadow: 3,
};

const optionSx: SxProps<Theme> = {
  display: 'block',
  width: '100%',
  px: 2,
  py: 1.25,
  textAlign: 'center',
  fontSize: '0.875rem',
  fontWeight: 500,
  textTransform: 'none',
  color: 'text.primary',
  '&:hover': {
    bgcolor: 'action.hover',
  },
};

export const LanguagePopper = ({
  value = 'en',
  options = defaultOptions,
  onChange,
  label,
  sx,
}: LanguagePopperProps) => {
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLButtonElement>(null);

  const selected = options.find((o) => o.code === value) ?? options[0];
  const displayLabel = label ?? `Idiom : ${selected?.label ?? 'ENGLISH'}`;

  const handleToggle = () => setOpen((prev) => !prev);

  const handleClose = (event: Event | React.SyntheticEvent) => {
    if (anchorRef.current?.contains(event.target as Node)) return;
    setOpen(false);
  };

  const handleSelect = (code: string) => {
    onChange?.(code);
    setOpen(false);
  };

  return (
    <>
      <ToggleButton
        ref={anchorRef}
        value="language"
        selected={open}
        onChange={() => handleToggle()}
        aria-expanded={open}
        aria-haspopup="listbox"
        sx={[buttonSx, ...(sx ? [sx] : [])] as SxProps<Theme>}
      >
        <Icon icon={LanguageIcon} sx={{ fontSize: 18, mr: 1 }} />
        {displayLabel}
      </ToggleButton>
      <Popper open={open} anchorEl={anchorRef.current} placement="bottom">
        <ClickAwayListener onClickAway={handleClose}>
          <Paper sx={paperSx} elevation={0}>
            {options.map((opt) => (
              <Button
                key={opt.code}
                variant="text"
                onClick={() => handleSelect(opt.code)}
                sx={optionSx}
              >
                {opt.label}
              </Button>
            ))}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default LanguagePopper;

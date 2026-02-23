import { useState, useRef } from 'react';
import { Popper, Paper, ClickAwayListener, ToggleButton } from '@mui/material';
import type { SxProps, Theme } from '@mui/material';
import { Language as LanguageIcon } from '@mui/icons-material';
import Icon from '../atoms/Icon';
import Button from '../atoms/Button';
import Text from '../atoms/Text';

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
  border: 'none',
  '&.Mui-selected, &.Mui-selected:hover': {
    border: 'none',
  },
};

const paperSx: SxProps<Theme> = (theme) => ({
  mt: theme.layout.space8,
  minWidth: 160,
  py: theme.layout.space4,
  boxShadow: 3,
});

const optionSx: SxProps<Theme> = (theme) => ({
  display: 'block',
  width: '100%',
  px: theme.layout.space16,
  py: theme.layout.space12,
  textAlign: 'center',
  color: 'text.primary',
  '&:hover': {
    bgcolor: 'action.hover',
  },
});

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
        <Icon icon={LanguageIcon} sx={{ fontSize: 18, mr: (t) => t.layout.space8 }} />
        <Text variant="label-large" sx={{ color: 'inherit' }}>
          {displayLabel}
        </Text>
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
                <Text variant="label-large" sx={{ color: 'inherit' }}>
                  {opt.label}
                </Text>
              </Button>
            ))}
          </Paper>
        </ClickAwayListener>
      </Popper>
    </>
  );
};

export default LanguagePopper;

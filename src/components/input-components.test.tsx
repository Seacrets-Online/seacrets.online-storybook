import { useState } from 'react';
import { ThemeProvider } from '@mui/material';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import type { ReactElement } from 'react';

import { lightTheme } from '../theme/mui/createTheme';
import Checkbox from './atoms/Checkbox';
import RadioGroup from './molecules/RadioGroup';
import Select from './molecules/Select';
import TextField from './molecules/TextField';

const renderWithTheme = (node: ReactElement) => {
  return render(<ThemeProvider theme={lightTheme}>{node}</ThemeProvider>);
};

describe('Input components', () => {
  it('handles text input typing and password visibility toggle', async () => {
    const user = userEvent.setup();

    renderWithTheme(<TextField label="Username" />);
    const input = screen.getByRole('textbox', { name: /username/i }) as HTMLInputElement;
    expect(input).toHaveAccessibleName('Username');

    await user.click(input);
    await user.type(input, 'hello');
    expect(input.value).toBe('hello');

    renderWithTheme(<TextField label="Password" type="password" />);
    const passwordInput = screen.getByLabelText('Password') as HTMLInputElement;
    const toggleButton = screen.getByRole('button', { name: /show password/i });

    expect(toggleButton).toHaveAttribute('aria-label', 'Show password');
    expect(passwordInput.type).toBe('password');
    await user.click(toggleButton);
    expect(screen.getByRole('button', { name: /hide password/i })).toBeInTheDocument();
    expect(passwordInput.type).toBe('text');
  });

  it('keeps Select synchronized with keyboard and click interactions', async () => {
    const user = userEvent.setup();
    const options = [
      { value: 'small', label: 'Small' },
      { value: 'medium', label: 'Medium' },
      { value: 'large', label: 'Large' },
    ];

    const SelectHarness = () => {
      const [value, setValue] = useState('small');
      return (
        <>
          <Select
            label="Size"
            value={value}
            options={options}
            onChange={(event) => setValue((event.target as HTMLInputElement).value)}
          />
          <div data-testid="selected-size">{value}</div>
        </>
      );
    };

    renderWithTheme(<SelectHarness />);
    const trigger = screen.getByRole('combobox', { name: /size/i }) as HTMLButtonElement;
    await user.click(trigger);
    const option = await screen.findByRole('option', { name: 'Medium' });

    await user.click(option);
    expect(screen.getByTestId('selected-size').textContent).toBe('medium');
  });

  it('toggles checkbox through pointer and keyboard interaction', async () => {
    const user = userEvent.setup();

    const CheckboxHarness = () => {
      const [checked, setChecked] = useState(false);

      return (
        <Checkbox
          checked={checked}
          inputProps={{ 'aria-label': 'accept terms' }}
          onChange={(event) => setChecked((event.target as HTMLInputElement).checked)}
        />
      );
    };

    renderWithTheme(<CheckboxHarness />);
    const checkbox = screen.getByRole('checkbox', { name: /accept terms/i }) as HTMLInputElement;

    await user.click(checkbox);
    expect(checkbox.checked).toBe(true);

    checkbox.focus();
    await user.keyboard('{Space}');
    expect(checkbox).toHaveFocus();
  });

  it('updates radio selection using click and keyboard', async () => {
    const user = userEvent.setup();
    const options = [
      { value: 'light', label: 'Light' },
      { value: 'dark', label: 'Dark' },
      { value: 'auto', label: 'Auto' },
    ];

    const RadioHarness = () => {
      const [value, setValue] = useState('light');
      return (
        <>
          <RadioGroup
            name="appearance"
            value={value}
            options={options}
            onChange={(event) => setValue((event.target as HTMLInputElement).value)}
          />
          <div data-testid="selected-appearance">{value}</div>
        </>
      );
    };

    renderWithTheme(<RadioHarness />);
    expect(screen.getByRole('radiogroup')).toBeInTheDocument();
    const darkOption = screen.getByRole('radio', { name: /dark/i }) as HTMLInputElement;
    await user.click(darkOption);
    expect(darkOption.checked).toBe(true);
    expect(screen.getByTestId('selected-appearance').textContent).toBe('dark');

    darkOption.focus();
    await user.keyboard('{ArrowRight}');
    const autoOption = screen.getByRole('radio', { name: /auto/i }) as HTMLInputElement;
    expect(autoOption.checked).toBe(true);
  });
});

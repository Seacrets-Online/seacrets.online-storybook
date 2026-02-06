import { fn } from '@storybook/test';
import { useState } from 'react';
import { TextField } from '../components/TextField';

/**
 * TextField component following Material Design 3 Expressive guidelines.
 * 
 * ## Definition of Done
 * - ✅ Token-based: Uses design tokens (no hardcoded hex values)
 * - ✅ M3 States: Supports hover, focus, active, and disabled states
 * - ✅ Accessibility: Keyboard navigable and ARIA-compliant
 * - ✅ Storybook: Includes stories for all variants and states
 */
export default {
  title: 'Primitives/TextField',
  component: TextField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A Material Design 3 compliant text input component with multiple variants and states. All styling uses design tokens - no hardcoded colors.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['filled', 'outlined'],
      description: 'TextField variant style',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'tel', 'url'],
      description: 'Input type',
    },
    label: {
      control: 'text',
      description: 'Label text',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Whether the field is disabled',
    },
    required: {
      control: 'boolean',
      description: 'Whether the field is required',
    },
    error: {
      control: 'boolean',
      description: 'Whether the field has an error',
    },
    helperText: {
      control: 'text',
      description: 'Helper text to display below the field',
    },
    errorText: {
      control: 'text',
      description: 'Error text to display below the field',
    },
    onChange: {
      action: 'changed',
      description: 'Change handler',
    },
    onFocus: {
      action: 'focused',
      description: 'Focus handler',
    },
    onBlur: {
      action: 'blurred',
      description: 'Blur handler',
    },
  },
};

export const Filled = {
  args: {
    variant: 'filled',
    label: 'Label',
    placeholder: 'Placeholder',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const Outlined = {
  args: {
    variant: 'outlined',
    label: 'Label',
    placeholder: 'Placeholder',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
};

export const WithValue = {
  args: {
    variant: 'filled',
    label: 'Email',
    defaultValue: 'user@example.com',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'TextField with a default value.',
      },
    },
  },
};

export const Required = {
  args: {
    variant: 'filled',
    label: 'Required Field',
    placeholder: 'This field is required',
    required: true,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Required fields show an asterisk (*) next to the label.',
      },
    },
  },
};

export const WithHelperText = {
  args: {
    variant: 'filled',
    label: 'Password',
    type: 'password',
    placeholder: 'Enter your password',
    helperText: 'Must be at least 8 characters',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Helper text provides additional context or instructions.',
      },
    },
  },
};

export const ErrorState = {
  args: {
    variant: 'filled',
    label: 'Email',
    defaultValue: 'invalid-email',
    error: true,
    errorText: 'Please enter a valid email address',
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Error state with error text. The label and border turn red, and error text is displayed.',
      },
    },
  },
};

export const Disabled = {
  args: {
    variant: 'filled',
    label: 'Disabled Field',
    defaultValue: 'Cannot edit this',
    disabled: true,
    onChange: fn(),
    onFocus: fn(),
    onBlur: fn(),
  },
  parameters: {
    docs: {
      description: {
        story: 'Disabled fields cannot be edited and have reduced opacity.',
      },
    },
  },
};

export const States = {
  render: () => {
    const [focusedValue, setFocusedValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start', width: '100%', maxWidth: '400px' }}>
        <div style={{ width: '100%' }}>
          <h3 style={{ marginBottom: '8px', fontFamily: 'var(--md-sys-typescale-title-medium-font-family)', fontSize: 'var(--md-sys-typescale-title-medium-font-size)' }}>
            Default
          </h3>
          <TextField
            variant="filled"
            label="Default State"
            placeholder="Click to focus"
            onChange={fn()}
            onFocus={fn()}
            onBlur={fn()}
          />
        </div>
        <div style={{ width: '100%' }}>
          <h3 style={{ marginBottom: '8px', fontFamily: 'var(--md-sys-typescale-title-medium-font-family)', fontSize: 'var(--md-sys-typescale-title-medium-font-size)' }}>
            Focus
          </h3>
          <p style={{ fontSize: 'var(--md-sys-typescale-body-small-font-size)', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '8px' }}>
            Click or Tab to focus - border color changes to primary
          </p>
          <TextField
            variant="filled"
            label="Focus State"
            placeholder="Tab or click here"
            onChange={fn()}
            onFocus={fn()}
            onBlur={fn()}
          />
        </div>
        <div style={{ width: '100%' }}>
          <h3 style={{ marginBottom: '8px', fontFamily: 'var(--md-sys-typescale-title-medium-font-family)', fontSize: 'var(--md-sys-typescale-title-medium-font-size)' }}>
            With Value
          </h3>
          <TextField
            variant="filled"
            label="With Value"
            defaultValue="Some text"
            onChange={fn()}
            onFocus={fn()}
            onBlur={fn()}
          />
        </div>
        <div style={{ width: '100%' }}>
          <h3 style={{ marginBottom: '8px', fontFamily: 'var(--md-sys-typescale-title-medium-font-family)', fontSize: 'var(--md-sys-typescale-title-medium-font-size)' }}>
            Disabled
          </h3>
          <TextField
            variant="filled"
            label="Disabled State"
            defaultValue="Cannot edit"
            disabled
            onChange={fn()}
            onFocus={fn()}
            onBlur={fn()}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'TextField component supports all M3 states: default, focus, with value, and disabled. States are implemented using design tokens.',
      },
    },
  },
};

export const InputTypes = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', alignItems: 'flex-start', width: '100%', maxWidth: '400px' }}>
      <TextField
        variant="filled"
        type="text"
        label="Text"
        placeholder="Enter text"
        onChange={fn()}
        onFocus={fn()}
        onBlur={fn()}
      />
      <TextField
        variant="filled"
        type="email"
        label="Email"
        placeholder="user@example.com"
        onChange={fn()}
        onFocus={fn()}
        onBlur={fn()}
      />
      <TextField
        variant="filled"
        type="password"
        label="Password"
        placeholder="Enter password"
        onChange={fn()}
        onFocus={fn()}
        onBlur={fn()}
      />
      <TextField
        variant="filled"
        type="number"
        label="Number"
        placeholder="Enter number"
        onChange={fn()}
        onFocus={fn()}
        onBlur={fn()}
      />
      <TextField
        variant="filled"
        type="tel"
        label="Phone"
        placeholder="+1 (555) 123-4567"
        onChange={fn()}
        onFocus={fn()}
        onBlur={fn()}
      />
      <TextField
        variant="filled"
        type="url"
        label="URL"
        placeholder="https://example.com"
        onChange={fn()}
        onFocus={fn()}
        onBlur={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'TextField supports various HTML input types: text, email, password, number, tel, and url.',
      },
    },
  },
};

export const Accessibility = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start', maxWidth: '600px' }}>
      <div style={{ width: '100%' }}>
        <h3 style={{ marginBottom: '8px', fontFamily: 'var(--md-sys-typescale-title-medium-font-family)', fontSize: 'var(--md-sys-typescale-title-medium-font-size)' }}>
          Keyboard Navigation
        </h3>
        <p style={{ fontSize: 'var(--md-sys-typescale-body-medium-font-size)', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px' }}>
          TextFields are keyboard accessible. Use Tab to navigate between fields, Enter to submit forms.
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%' }}>
          <TextField
            variant="filled"
            label="First Field"
            placeholder="Tab to focus"
            onChange={fn()}
            onFocus={fn()}
            onBlur={fn()}
          />
          <TextField
            variant="filled"
            label="Second Field"
            placeholder="Then Tab here"
            onChange={fn()}
            onFocus={fn()}
            onBlur={fn()}
          />
        </div>
      </div>
      <div style={{ width: '100%' }}>
        <h3 style={{ marginBottom: '8px', fontFamily: 'var(--md-sys-typescale-title-medium-font-family)', fontSize: 'var(--md-sys-typescale-title-medium-font-size)' }}>
          ARIA Labels
        </h3>
        <p style={{ fontSize: 'var(--md-sys-typescale-body-medium-font-size)', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px' }}>
          TextFields automatically associate labels with inputs. aria-label can be used when a visible label is not present.
        </p>
        <TextField
          variant="filled"
          aria-label="Search query"
          placeholder="Search..."
          onChange={fn()}
          onFocus={fn()}
          onBlur={fn()}
        />
      </div>
      <div style={{ width: '100%' }}>
        <h3 style={{ marginBottom: '8px', fontFamily: 'var(--md-sys-typescale-title-medium-font-family)', fontSize: 'var(--md-sys-typescale-title-medium-font-size)' }}>
          Error Announcement
        </h3>
        <p style={{ fontSize: 'var(--md-sys-typescale-body-medium-font-size)', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px' }}>
          Error messages are announced to screen readers via aria-describedby and role="alert".
        </p>
        <TextField
          variant="filled"
          label="Email"
          defaultValue="invalid"
          error
          errorText="Please enter a valid email address"
          onChange={fn()}
          onFocus={fn()}
          onBlur={fn()}
        />
      </div>
      <div style={{ width: '100%' }}>
        <h3 style={{ marginBottom: '8px', fontFamily: 'var(--md-sys-typescale-title-medium-font-family)', fontSize: 'var(--md-sys-typescale-title-medium-font-size)' }}>
          Required Fields
        </h3>
        <p style={{ fontSize: 'var(--md-sys-typescale-body-medium-font-size)', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px' }}>
          Required fields have aria-required="true" and show an asterisk (*) next to the label.
        </p>
        <TextField
          variant="filled"
          label="Required Field"
          placeholder="This field is required"
          required
          onChange={fn()}
          onFocus={fn()}
          onBlur={fn()}
        />
      </div>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Accessibility features: keyboard navigation, ARIA labels, error announcements, and required field indicators.',
      },
    },
  },
};

export const Controlled = {
  render: () => {
    const [value, setValue] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
        <TextField
          variant="filled"
          label="Controlled Input"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Type something..."
        />
        <p style={{ fontSize: 'var(--md-sys-typescale-body-medium-font-size)', color: 'var(--md-sys-color-on-surface-variant)' }}>
          Current value: <strong>{value || '(empty)'}</strong>
        </p>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Controlled TextField example - the value is managed by React state.',
      },
    },
  },
};

export const AllVariants = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', alignItems: 'flex-start', width: '100%', maxWidth: '400px' }}>
      <TextField
        variant="filled"
        label="Filled TextField"
        placeholder="Filled variant"
        onChange={fn()}
        onFocus={fn()}
        onBlur={fn()}
      />
      <TextField
        variant="outlined"
        label="Outlined TextField"
        placeholder="Outlined variant"
        onChange={fn()}
        onFocus={fn()}
        onBlur={fn()}
      />
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Both Material Design 3 TextField variants: Filled and Outlined.',
      },
    },
  },
};

export const InteractiveStates = {
  render: () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', width: '100%', maxWidth: '400px' }}>
        <div>
          <h3 style={{ marginBottom: '8px', fontFamily: 'var(--md-sys-typescale-title-medium-font-family)', fontSize: 'var(--md-sys-typescale-title-medium-font-size)' }}>
            Interactive Demo
          </h3>
          <p style={{ fontSize: 'var(--md-sys-typescale-body-small-font-size)', color: 'var(--md-sys-color-on-surface-variant)', marginBottom: '16px' }}>
            Type in the fields below to see how they handle different states. The component tracks focus and value states internally.
          </p>
          <TextField
            variant="filled"
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="user@example.com"
            helperText={email ? 'Valid email format' : 'Enter your email address'}
          />
          <TextField
            variant="filled"
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            helperText={password.length > 0 ? `${password.length} characters` : 'Must be at least 8 characters'}
            error={password.length > 0 && password.length < 8}
            errorText={password.length > 0 && password.length < 8 ? 'Password too short' : undefined}
          />
        </div>
      </div>
    );
  },
  parameters: {
    docs: {
      description: {
        story: 'Interactive demo showing how TextField handles focus, value, and error states dynamically. The component internally tracks whether it has a value for potential future enhancements.',
      },
    },
  },
};

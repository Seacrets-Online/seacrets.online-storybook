import SocialAuthRow from '../../components/organisms/SocialAuthRow.jsx';

export default {
  title: 'Organisms/SocialAuthRow',
  component: SocialAuthRow,
  parameters: { layout: 'centered' },
  decorators: [(Story) => <div style={{ width: 320 }}><Story /></div>],
};

export const Default = {
  args: {
    providers: [
      { id: 'google', label: 'Continue with Google', onClick: () => {} },
      { id: 'apple', label: 'Continue with Apple', onClick: () => {} },
    ],
  },
};

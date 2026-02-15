import ProfileTemplate from '../../components/templates/ProfileTemplate.jsx';

export default {
  title: 'Templates/ProfileTemplate',
  component: ProfileTemplate,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: {
    name: 'User Name',
    subtitle: 'user@example.com',
    children: <p>Profile content</p>,
  },
};

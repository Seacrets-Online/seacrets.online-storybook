import Link from '../../components/atoms/Link.jsx';

export default {
  title: 'Atoms/Link',
  component: Link,
  parameters: {
    layout: 'centered',
  },
};

export const Default = {
  args: {
    href: '#',
    children: 'Link',
  },
};

export const Primary = {
  args: {
    href: '#',
    children: 'Primary link',
    color: 'primary',
  },
};

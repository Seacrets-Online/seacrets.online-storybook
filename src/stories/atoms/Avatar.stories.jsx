import Avatar from '../../components/atoms/Avatar.jsx';

export default {
  title: 'Atoms/Avatar',
  component: Avatar,
  parameters: { layout: 'centered' },
};

export const WithLetter = { args: { children: 'A' } };
export const WithImage = { args: { src: 'https://i.pravatar.cc/150', alt: 'User' } };

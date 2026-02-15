import FileUpload from '../../components/organisms/FileUpload.jsx';

export default {
  title: 'Organisms/FileUpload',
  component: FileUpload,
  parameters: { layout: 'centered' },
};

export const Default = {
  args: {
    onSelect: (f) => console.log('Selected', f),
    label: 'Choose file',
    hint: 'PNG, JPG up to 5MB',
  },
};

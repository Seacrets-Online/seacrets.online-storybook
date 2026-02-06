import React from 'react';
import { TokenTester } from './TokenTester';

export default {
  title: 'System/TokenTester',
  component: TokenTester,
};

const Template = (args) => <TokenTester {...args} />;

export const Paleta = Template.bind({});
Paleta.args = {};
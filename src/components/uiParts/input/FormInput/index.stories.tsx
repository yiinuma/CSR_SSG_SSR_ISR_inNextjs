import { action } from '@storybook/addon-actions';
import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { FormInput, FormInputProps } from 'components/uiParts/input/FormInput';

// eslint-disable-next-line storybook/story-exports
export default {
  title: 'FormInput',
  component: FormInput,
} as ComponentMeta<typeof FormInput>;

type Story = ComponentStoryObj<typeof FormInput>;

const defaultInput: FormInputProps = {
  id: 'category',
  required: false,
  type: 'text',
  value: '',
  onChange: action('clicked!'),
};

export const Default: Story = {
  args: {
    ...defaultInput,
  },
};

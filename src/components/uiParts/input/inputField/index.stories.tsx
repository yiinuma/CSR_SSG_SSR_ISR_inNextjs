import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { FormInput, FormInputProps } from 'components/uiParts/input/FormInput';
import * as FormInputStories from 'components/uiParts/input/FormInput/index.stories';
import { InputField } from '.';

// eslint-disable-next-line storybook/story-exports
export default {
  title: 'InputField',
  component: InputField,
} as ComponentMeta<typeof InputField>;

type Story = ComponentStoryObj<typeof InputField>;
const defaultField = FormInputStories.Default as FormInputProps;

export const Short: Story = {
  args: { htmlFor: 'title', label: 'Title' },
  render: (args) => (
    <div className='w-2/12'>
      <InputField {...args}>
        <FormInput {...defaultField} />
      </InputField>
    </div>
  ),
};

export const Middle: Story = {
  args: { htmlFor: 'title', label: 'Title' },
  render: (args) => (
    <div className='w-5/12'>
      <InputField {...args}>
        <FormInput {...defaultField} />
      </InputField>
    </div>
  ),
};

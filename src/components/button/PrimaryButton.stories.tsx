import { action } from '@storybook/addon-actions';
import type { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { PrimaryButton } from './PrimaryButton';

// eslint-disable-next-line storybook/story-exports
export default {
  title: 'PrimaryButton',
  component: PrimaryButton,
} as ComponentMeta<typeof PrimaryButton>;

type Story = ComponentStoryObj<typeof PrimaryButton>;

export const Default: Story = {
  args: { children: 'Primary', onClick: action('clicked!') },
};

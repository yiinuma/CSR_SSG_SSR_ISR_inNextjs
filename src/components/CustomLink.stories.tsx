import { ComponentMeta, ComponentStoryObj } from '@storybook/react';

import { CustomLink } from 'components/CustomLink';
import { RecoilRoot } from 'recoil';

// eslint-disable-next-line storybook/story-exports
export default {
  title: 'Link',
  component: CustomLink,
  decorators: [(story) => <RecoilRoot>{story()}</RecoilRoot>],
} as ComponentMeta<typeof CustomLink>;

type Story = ComponentStoryObj<typeof CustomLink>;

export const Default: Story = {
  args: { href: '/', testId: 'home' },
  render: (args) => (
    <nav className='max-w-fit bg-primary-600 px-6 font-mono'>
      <div className='flex h-12 items-center'>
        <div className='flex space-x-1 text-sm'>
          <CustomLink {...args}>Home</CustomLink>
        </div>
      </div>
    </nav>
  ),
};

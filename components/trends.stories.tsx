import type { Meta, StoryObj } from '@storybook/react';

import Trends from './trends';

const meta = {
  component: Trends,
} satisfies Meta<typeof Trends>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
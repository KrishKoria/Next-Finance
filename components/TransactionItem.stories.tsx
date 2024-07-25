import type { Meta, StoryObj } from '@storybook/react';

import TransactionItem from './TransactionItem';

const meta = {
  component: TransactionItem,
} satisfies Meta<typeof TransactionItem>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
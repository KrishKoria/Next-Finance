import type { Meta, StoryObj } from "@storybook/react";

import PageHeader from "@/components/PageHeader";

const meta = {
  component: PageHeader,
} satisfies Meta<typeof PageHeader>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

import type { Meta, StoryObj } from "@storybook/react";

import Dashboardpage from "./page";

const meta = {
  component: Dashboardpage,
} satisfies Meta<typeof Dashboardpage>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};

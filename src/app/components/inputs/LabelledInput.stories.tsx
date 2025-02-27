import type { Meta, StoryObj } from "@storybook/react";

import { LabelledInput } from "./LabelledInput";

const meta = {
  component: LabelledInput,
  parameters: {
    layout: "centered",
    backgrounds: {
      default: "dark",
    },
  },
  tags: ["autodocs"],
} satisfies Meta<typeof LabelledInput>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Text: Story = {
  args: {
    label: "username",
    id: "id",
    name: "name",
    type: "text",
  },
};

export const Password: Story = {
  args: {
    label: "password",
    id: "id",
    name: "name",
    type: "password",
  },
};

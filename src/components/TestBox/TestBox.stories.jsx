import { TestBox } from "./TestBox";
import tokens from "../../tokens/test-tokens.json";

export default {
  title: "Examples/TestBox",
  component: TestBox,
  parameters: {
    layout: "centered",
  },
};

export const Default = {
  render: () => <TestBox />,
};

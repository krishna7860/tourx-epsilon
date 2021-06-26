/* eslint-disable react/jsx-props-no-spreading */
import React from "react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { Story, Meta } from "@storybook/react";

import { Header, HeaderProps } from "./Header";

export default {
  title: "Example/Header",
  component: Header,
} as Meta;

const Template: Story<HeaderProps> = (args) => <Header {...args} />;

export const LoggedIn = Template.bind({});
LoggedIn.args = {
  user: {},
};

export const LoggedOut = Template.bind({});
LoggedOut.args = {};

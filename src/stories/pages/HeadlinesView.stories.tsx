import React from 'react';
import { Meta, Story } from '@storybook/react';
import { mockHeadlines } from '../../mocks/mockHeadlines';
import { HeadlinesView } from '../../pages/Headlines/HeadlinesView';

export default {
  title: 'Pages/Headlines',
  component: HeadlinesView,
} as Meta;

const Template: Story = (args) => <HeadlinesView headlines={args.headlines} />;

export const HeadlinesViewStory = Template.bind({});
HeadlinesViewStory.storyName = 'HeadlinesView';
HeadlinesViewStory.args = { headlines: mockHeadlines };

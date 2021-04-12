import React from 'react';
import { Meta, Story } from '@storybook/react';
import { mockStandings } from '../../mocks/mockStandings';
import { StandingsView } from '../../pages/Sports/StandingsView';

export default {
  title: 'Pages/Sports',
  component: StandingsView,
} as Meta;

const Template: Story = (args) => <StandingsView standings={args.standings} />;

export const StandingsViewStory = Template.bind({});
StandingsViewStory.storyName = 'StandingsView';
StandingsViewStory.args = { standings: mockStandings };

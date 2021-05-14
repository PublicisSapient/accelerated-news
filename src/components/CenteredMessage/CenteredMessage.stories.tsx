import React from 'react';
import { Meta } from '@storybook/react';
import { ViewVerticalContainer } from '../Containers';
import { SimpleHeader } from '../Header';
import { CenteredMessage } from './CenteredMessage';
import { ViewCenteredMessage } from './ViewCenteredMessage';

export default {
  title: 'Components/CenteredMessage',
  component: CenteredMessage,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const CenteredMessageStory = () => (
  <ViewVerticalContainer>
    <SimpleHeader />
    <CenteredMessage>Hello!</CenteredMessage>
  </ViewVerticalContainer>
);
CenteredMessageStory.storyName = 'CenteredMessage';

export const ViewCenteredMessageStory = () => (
  <ViewCenteredMessage>Hello!</ViewCenteredMessage>
);
ViewCenteredMessageStory.storyName = 'ViewCenteredMessage';

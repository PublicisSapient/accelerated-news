import React from 'react';
import { Meta } from '@storybook/react';
import { Loading, SimpleHeader, ViewVerticalContainer } from '../../components';

export default {
  title: 'Components/Loading',
  component: Loading,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const LoadingStory = () => (
  <ViewVerticalContainer>
    <SimpleHeader />
    <Loading />
  </ViewVerticalContainer>
);
LoadingStory.storyName = 'Loading';

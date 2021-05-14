import React from 'react';
import { Meta } from '@storybook/react';
import { ViewVerticalContainer } from '../Containers';
import { SimpleHeader } from '../Header';
import { Loading } from './Loading';

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

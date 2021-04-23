import React from 'react';
import { addDecorator } from '@storybook/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider } from '../src/contexts';
import '../src/styles/main.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Style Guide', 'Components', 'Pages'],
    },
  },
};

const StoryDecorator = (Story: any) => (
  <AuthContextProvider>
    <Router>
      <Story />
    </Router>
  </AuthContextProvider>
);

addDecorator(StoryDecorator);

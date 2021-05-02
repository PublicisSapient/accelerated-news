import React from 'react';
import { addDecorator } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContextProvider, EnvProvider } from '../src/contexts';
import '../src/services/AxiosInterceptors';
import '../src/styles/main.css';

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  options: {
    storySort: {
      order: ['Style Guide', 'Components', 'Pages'],
    },
  },
};

// Start mock service worker
const { worker } = require('../src/mocks/browser');
worker.start();
worker.printHandlers();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

const StoryDecorator = (Story: any) => (
  <EnvProvider>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <Router>
          <Story />
        </Router>
      </AuthContextProvider>
    </QueryClientProvider>
  </EnvProvider>
);

addDecorator(StoryDecorator);

import React from 'react';
import { Meta } from '@storybook/react';

export default {
  title: 'Style Guide/Typography',
} as Meta;

export const TypographyStory = () => (
  <main>
    <p className="title">Typography</p>
    <h1 className="mt-3">h1 Heading 1</h1>
    <h2 className="mt-2">h2 Heading 2</h2>
    <h3 className="mt-2">h3 Heading 3</h3>
    <h4 className="mt-2">h4 Heading 4</h4>
    <h5 className="mt-2">h5 Heading 5</h5>
    <h6 className="mt-2">h6 Heading 6</h6>
    <p className="title mt-2">Title</p>
    <p className="title2 mt-2">Title2</p>
    <p>
      body - Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
      eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
      minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
      ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate
      velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
      cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id
      est laborum.
    </p>
  </main>
);
TypographyStory.storyName = 'Typography';

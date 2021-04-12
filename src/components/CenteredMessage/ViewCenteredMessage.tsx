import React from 'react';
import { ViewCenteredContainer } from '../Containers';

export const ViewCenteredMessage: React.FC = ({ children }) => {
  return (
    <ViewCenteredContainer className="p-3">
      <h1 className="title">{children}</h1>
    </ViewCenteredContainer>
  );
};

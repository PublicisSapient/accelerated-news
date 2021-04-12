import React from 'react';

export interface ContainerProps {
  testId?: string;
  className?: string;
  children: React.ReactNode;
}

/**
 * HorizontalContainer
 * - flex: 1
 * - flexDirection: row
 */
export const HorizontalContainer = ({
  testId = 'horizontal-container',
  className = '',
  children,
}: ContainerProps) => {
  return (
    <div data-testid={testId} className={`flex-1 flex flex-row ${className}`}>
      {children}
    </div>
  );
};

/**
 * ViewHorizontalContainer
 * - height: 100vh
 * - flexDirection: row
 */
export const ViewHorizontalContainer = ({
  testId = 'view-horizontal-container',
  className = '',
  children,
}: ContainerProps) => {
  return (
    <div data-testid={testId} className={`h-screen flex flex-row ${className}`}>
      {children}
    </div>
  );
};

/**
 * VerticalContainer
 * - flex: 1
 * - flexDirection: column
 */
export const VerticalContainer = ({
  testId = 'vertical-container',
  className = '',
  children,
}: ContainerProps) => {
  return (
    <div data-testid={testId} className={`flex-1 flex flex-col ${className}`}>
      {children}
    </div>
  );
};

/**
 * ViewVerticalContainer
 * - height: 100vh
 * - flexDirection: column
 */
export const ViewVerticalContainer = ({
  testId = 'view-vertical-container',
  className = '',
  children,
}: ContainerProps) => {
  return (
    <div data-testid={testId} className={`h-screen flex flex-col ${className}`}>
      {children}
    </div>
  );
};

/**
 * CenteredContainer
 * - Centers content inside a flex container
 * - flex: 1
 */
export const CenteredContainer = ({
  testId = 'centered-container',
  className = '',
  children,
}: ContainerProps) => {
  return (
    <div
      data-testid={testId}
      className={`flex-1 flex justify-center items-center text-center ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * ViewCenteredContainer
 * - Centers content in the entire view
 * - height: 100vh
 */
export const ViewCenteredContainer = ({
  testId = 'centered-container',
  className = '',
  children,
}: ContainerProps) => {
  return (
    <div
      data-testid={testId}
      className={`h-screen flex justify-center items-center text-center ${className}`}
    >
      {children}
    </div>
  );
};

/**
 * ScrollingContainer
 * - overflow: 'auto'
 */
export const ScrollingContainer = ({
  testId = 'scrolling-container',
  className = '',
  children,
}: ContainerProps) => {
  return (
    <div data-testid={testId} className={`overflow-auto ${className}`}>
      {children}
    </div>
  );
};

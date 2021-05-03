import React, { Fragment } from 'react';
import { ErrorMessage } from './ErrorMessage';

interface TextAreaInjectedProps {
  id?: string;
  'data-testid'?: string;
  name?: string;
  ref?: React.Ref<any>;
  rows?: number;
  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export interface TextAreaFieldProps {
  /** used to make label and errorText accessible for screen readers */
  id?: string;

  /** used to create data-testid property on element for testing */
  testId?: string;

  /** passed directly to the textarea element */
  name?: string;

  /** the label content */
  label?: React.ReactNode;

  /** passed directly to the textarea element */
  ref?: React.Ref<any>;

  /** error text */
  error?: string;

  /** # of rows */
  rows?: number;

  renderContainer?: (props: TextAreaInjectedProps) => JSX.Element;

  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

/**
 * Uses the "Render Prop" pattern to pass through arbitrary props that it
 * doesn't understand.
 * See https://blog.andrewbran.ch/polymorphic-react-components/
 */
export const TextAreaField = React.forwardRef(
  (
    {
      id,
      testId,
      name,
      label,
      error,
      rows = 2,
      renderContainer = (props) => <textarea {...props} />,
      onBlur,
      onChange,
    }: TextAreaFieldProps,
    ref
  ) => {
    return (
      <Fragment>
        {label !== undefined ? <label htmlFor={id}>{label}</label> : null}
        {renderContainer({
          id,
          'data-testid': testId,
          name,
          ref,
          rows,
          onBlur,
          onChange,
        })}
        <ErrorMessage error={error} />
      </Fragment>
    );
  }
);

import React, { Fragment } from 'react';
import { ErrorMessage } from './ErrorMessage';

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

  onBlur?: (e: React.FocusEvent<HTMLTextAreaElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

export const TextAreaField = React.forwardRef<
  HTMLTextAreaElement,
  TextAreaFieldProps
>(({ id, testId, name, label, error, rows = 2, onBlur, onChange }, ref) => {
  return (
    <Fragment>
      {label !== undefined ? <label htmlFor={id}>{label}</label> : null}
      <textarea
        id={id}
        data-testid={testId}
        name={name}
        ref={ref}
        rows={rows}
        onBlur={onBlur}
        onChange={onChange}
      />
      <ErrorMessage error={error} />
    </Fragment>
  );
});

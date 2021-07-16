import React, { Fragment } from 'react';
import { ErrorMessage } from './ErrorMessage';
import './TextField.css';

interface InputInjectedProps {
  id?: string;
  'data-testid'?: string;
  name?: string;
  type?: string;
  ref?: React.Ref<any>;
  className: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export interface TextFieldPolymorphicProps {
  /** used to make label and errorText accessible for screen readers */
  id?: string;

  /** used to create data-testid property on element for testing */
  testId?: string;

  /** passed directly to the input element */
  name?: string;

  /** the label content */
  label?: React.ReactNode;

  /** the input type (defaults to text) */
  type?: string;

  /** passed directly to the input element */
  ref?: React.Ref<any>;

  /** error text */
  error?: string;

  renderContainer?: (props: InputInjectedProps) => JSX.Element;

  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

/**
 * This is a more flexible but complex implementation of TextField. It uses the
 * "Render Prop" pattern to pass through arbitrary props that it doesn't
 * understand. For details, see
 * https://blog.andrewbran.ch/polymorphic-react-components/
 */
export const TextFieldPolymorphic = React.forwardRef(
  (
    {
      id,
      testId,
      name,
      label,
      type = 'text',
      error,
      renderContainer = (props) => <input {...props} />,
      onBlur,
      onChange,
    }: TextFieldPolymorphicProps,
    ref
  ) => {
    return (
      <Fragment>
        {label !== undefined ? <label htmlFor={id}>{label}</label> : null}
        {renderContainer({
          id,
          'data-testid': testId,
          name,
          type,
          ref,
          className: 'text-field__input',
          onBlur,
          onChange,
        })}
        <ErrorMessage error={error} />
      </Fragment>
    );
  }
);

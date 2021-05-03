import React from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { TextAreaField, TextField } from '../../components';
import { Headline } from '../../models';

const schema = yup.object().shape({
  title: yup.string().required(),
  attribution: yup.string().required(),
  teaser: yup.string().required(),
});

export interface HeadlineFormProps {
  isNew: boolean;
  headline: Headline;
  onSubmit: (headline: Headline) => void;
}

export const HeadlineForm = ({
  isNew,
  headline,
  onSubmit,
}: HeadlineFormProps) => {
  const { formState, register, reset, handleSubmit } = useForm<Headline>({
    mode: 'onBlur',
    defaultValues: headline,
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  return (
    <form className="p-2" onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-3">
        <TextAreaField
          id="title"
          {...register('title')}
          label="Title"
          error={errors.title?.message}
          rows={2}
        />
      </div>

      <div className="mb-3">
        <TextField
          id="attribution"
          {...register('attribution')}
          label="Attribution"
          error={errors.attribution?.message}
        />
      </div>

      <div className="mb-5">
        <TextAreaField
          id="teaser"
          {...register('teaser')}
          label="Teaser"
          error={errors.teaser?.message}
          rows={8}
        />
      </div>

      <button className="btn" type="submit">
        {isNew ? 'Add' : 'Update'}
      </button>

      <button className="btn ml-1" onClick={() => reset()}>
        Reset
      </button>
    </form>
  );
};

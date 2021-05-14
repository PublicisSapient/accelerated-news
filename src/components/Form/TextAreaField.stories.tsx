import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { TextAreaField } from './TextAreaField';

// ---------- TestForm ----------
const schema = yup.object().shape({
  bio: yup.string().required(),
});

interface Person {
  bio: string;
}

interface TestFormProps {
  onSubmit: (person: Person) => void;
}

function TestForm({ onSubmit }: TestFormProps) {
  const { formState, register, handleSubmit } = useForm<Person>({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const { errors } = formState;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="mb-5">
        <TextAreaField
          id="bio"
          {...register('bio')}
          label="Bio"
          error={errors.bio?.message}
          rows={3}
        />
      </div>

      <button className="btn-lg w-full" type="submit">
        Submit
      </button>
    </form>
  );
}

export default {
  title: 'Forms/TextAreaField',
  component: TextAreaField,
} as Meta;

const Template: Story = () => {
  const [person, setPerson] = useState<Person>();

  return (
    <div style={{ width: 320 }}>
      <TestForm onSubmit={setPerson} />
      <div className="mt-5">
        <h4>Form value</h4>
        <p>{person?.bio}</p>
      </div>
    </div>
  );
};

export const TextAreaFieldStory = Template.bind({});
TextAreaFieldStory.storyName = 'TextAreaField';
TextAreaFieldStory.args = {};

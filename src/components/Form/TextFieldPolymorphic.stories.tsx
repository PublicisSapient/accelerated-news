import React, { useState } from 'react';
import { Story, Meta } from '@storybook/react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { TextFieldPolymorphic } from './TextFieldPolymorphic';

// ---------- TestForm ----------
const schema = yup.object().shape({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
});

interface Person {
  firstName: string;
  lastName: string;
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
      <div className="mb-3">
        <TextFieldPolymorphic
          id="firstName"
          {...register('firstName')}
          label="First Name"
          error={errors.firstName?.message}
        />
      </div>

      <div className="mb-5">
        <TextFieldPolymorphic
          id="lastName"
          {...register('lastName')}
          label="Last Name"
          error={errors.lastName?.message}
        />
      </div>

      <button className="btn-primary btn-lg w-full" type="submit">
        Submit
      </button>
    </form>
  );
}

export default {
  title: 'Forms/TextFieldPolymorphic',
  component: TextFieldPolymorphic,
} as Meta;

const Template: Story = () => {
  const [person, setPerson] = useState<Person>();

  return (
    <div style={{ width: 320 }}>
      <TestForm onSubmit={setPerson} />
      <div className="mt-2">
        <h4 className="m-0">Form value</h4>
        <p>
          {person?.firstName} {person?.lastName}
        </p>
      </div>
    </div>
  );
};

export const TextFieldPolymorphicStory = Template.bind({});
TextFieldPolymorphicStory.storyName = 'TextFieldPolymorphic';
TextFieldPolymorphicStory.args = {};

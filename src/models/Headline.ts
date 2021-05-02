import { v4 as uuidv4 } from 'uuid';

export interface Headline {
  id: string;
  title: string;
  attribution: string;
  teaser: string;
}

const create = () => {
  return {
    id: uuidv4(),
    title: '',
    attribution: '',
    teaser: '',
  };
};

/* eslint-disable @typescript-eslint/no-redeclare */
export const Headline = {
  create,
};

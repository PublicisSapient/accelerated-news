import React, { Fragment } from 'react';
import { Meta } from '@storybook/react';
import {
  MasterDetail,
  MasterDetailChildProps,
  ViewVerticalContainer,
} from '../../components';
import { HeadlineForm } from '../../pages';
import { mockHeadlines } from '../../mocks/mockHeadlines';
import { Headline } from '../../models';

export default {
  title: 'Components/MasterDetail',
  component: MasterDetail,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

const Master = ({ selectionState, onItemSelected }: MasterDetailChildProps) => {
  return (
    <Fragment>
      {mockHeadlines.map((headline) => {
        const selectionClass =
          selectionState.itemId === headline.id ? 'card--selected' : '';
        return (
          <div
            key={headline.id}
            className={`card card--primary m-2 ${selectionClass}`}
            onClick={() => onItemSelected(headline.id)}
          >
            {headline.title}
          </div>
        );
      })}
    </Fragment>
  );
};

const Detail = ({ selectionState }: MasterDetailChildProps) => {
  const { isNew, itemId } = selectionState;
  const handleSubmit = (headline: Headline) => {
    console.log(headline);
  };

  let headline = isNew
    ? Headline.create()
    : mockHeadlines.find((headline) => headline.id === itemId);

  if (headline === undefined) {
    headline = Headline.create();
  }

  return (
    <HeadlineForm isNew={isNew} headline={headline} onSubmit={handleSubmit} />
  );
};

export const MasterDetailStory = () => {
  return (
    <ViewVerticalContainer>
      <MasterDetail
        MasterComponent={Master}
        DetailComponent={Detail}
        masterContainerClassName="w-320 bg-primary-50"
        detailContainerClassName="flex-1 bg-secondary-50"
      />
    </ViewVerticalContainer>
  );
};
MasterDetailStory.storyName = 'MasterDetail';

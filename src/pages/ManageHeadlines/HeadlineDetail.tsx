import React from 'react';
import { CenteredMessage, MasterDetailChildProps } from '../../components';
import { Headline } from '../../models';
import { HeadlineForm } from './HeadlineForm';
import {
  useHeadlineQuery,
  useHeadlineCreate,
  useHeadlineUpdate,
} from '../../services';

export const HeadlineDetailNew = ({
  selectionState,
  onStartNewItem,
}: MasterDetailChildProps) => {
  const createHeadlineMutation = useHeadlineCreate();
  const { isNew } = selectionState;
  const headline = Headline.create();

  const handleSubmit = (headline: Headline) => {
    createHeadlineMutation.mutate(headline);
    onStartNewItem();
  };

  return (
    <HeadlineForm isNew={isNew} headline={headline} onSubmit={handleSubmit} />
  );
};

export const HeadlineDetailExisting = ({
  selectionState,
  onItemSelected,
}: MasterDetailChildProps) => {
  const { isNew, itemId: headLineId } = selectionState;
  const {
    isLoading,
    isError,
    error,
    data: headline,
  } = useHeadlineQuery(headLineId);
  const updateHeadlineMutation = useHeadlineUpdate(headLineId);

  const handleSubmit = (headline: Headline) => {
    updateHeadlineMutation.mutate(headline);
    onItemSelected(headline.id);
  };

  if (isLoading) {
    return null;
  }

  /* istanbul ignore next */
  if (isError) {
    throw error;
  }

  if (headline === undefined) {
    return <CenteredMessage>Error: No Data</CenteredMessage>;
  }

  return (
    <HeadlineForm isNew={isNew} headline={headline} onSubmit={handleSubmit} />
  );
};

export const HeadlineDetail = (props: MasterDetailChildProps) => {
  return props.selectionState.isNew ? (
    <HeadlineDetailNew {...props} />
  ) : (
    <HeadlineDetailExisting {...props} />
  );
};

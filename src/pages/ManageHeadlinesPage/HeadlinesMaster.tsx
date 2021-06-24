import React, { Fragment } from 'react';
import { CenteredMessage, MasterDetailChildProps } from '../../components';
import { useHeadlinesQuery } from '../../services';

export const HeadlinesMaster = ({
  selectionState,
  onItemSelected,
}: MasterDetailChildProps) => {
  const { isLoading, isError, error, data: headlines } = useHeadlinesQuery();

  if (isLoading) {
    return null;
  }

  /* istanbul ignore next */
  if (isError) {
    throw error;
  }

  if (headlines === undefined) {
    return <CenteredMessage>Error: No Data</CenteredMessage>;
  }

  return (
    <Fragment>
      {headlines.map((headline) => {
        const selectionClass =
          selectionState.itemId === headline.id ? 'card--selected' : '';
        return (
          <div
            key={headline.id}
            data-testid="headline-card"
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

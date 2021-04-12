import React, { Fragment } from 'react';
import { Header } from '../../components';
import { useHeadlines } from '../../services';
import { HeadlinesView } from './HeadlinesView';

export const Headlines = () => {
  const { isLoading, isError, error, data: headlines } = useHeadlines();

  if (isLoading) {
    return null;
  }

  if (isError) {
    throw error;
  }

  return (
    <Fragment>
      <Header />
      <main>
        <div className="container">
          <h2>Headlines</h2>
          {headlines === undefined || headlines.length === 0 ? (
            <h4>There are no headlines yet!</h4>
          ) : (
            <HeadlinesView headlines={headlines} />
          )}
        </div>
      </main>
    </Fragment>
  );
};

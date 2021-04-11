import React, { Fragment } from 'react';
import { Header, Loading } from '../../components';
import { useHeadlines } from '../../services';
import { StringUtils } from '../../utils';

export const Headlines = () => {
  const { isLoading, isError, error, data: headlines } = useHeadlines();

  if (isLoading) {
    return <Loading />;
  }

  if (isError) {
    return (
      <main>
        <h1>{StringUtils.errorToString(error)}</h1>
      </main>
    );
  }

  if (headlines === undefined || headlines.length === 0) {
    return (
      <main>
        <h1>There are no headlines yet!</h1>
      </main>
    );
  }

  return (
    <Fragment>
      <Header />
      <main>
        <div className="container">
          <h2>Headlines</h2>
          {headlines.map((headline) => (
            <div key={headline.title} data-testid="headline">
              <h4 className="headline__title">{headline.title}</h4>
              <p className="headline__attribution">{headline.attribution}</p>
              <p className="headline__teaser">{headline.teaser}</p>
            </div>
          ))}
        </div>
      </main>
    </Fragment>
  );
};

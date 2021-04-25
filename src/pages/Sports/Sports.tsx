import React, { Fragment } from 'react';
import { Header, HorizontalContainer } from '../../components';
import { StandingsView } from './StandingsView';
import { useStandings } from './useStandings';

export const Sports = () => {
  const { isLoading, isError, error, data: standings } = useStandings();

  if (isLoading) {
    return null;
  }

  /* istanbul ignore next */
  if (isError) {
    throw error;
  }

  return (
    <Fragment>
      <Header />
      <main>
        <div className="container">
          <HorizontalContainer className="items-center mt-2 mb-3">
            <h2 className="title">Sports</h2>
          </HorizontalContainer>
          {standings === undefined || standings.length === 0 ? (
            <h4>There are no standings yet!</h4>
          ) : (
            <StandingsView standings={standings} />
          )}
        </div>
      </main>
    </Fragment>
  );
};

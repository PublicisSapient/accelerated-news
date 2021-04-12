import React, { Fragment } from 'react';
import { Header } from '../../components';
import { useStandings } from '../../services';
import { StandingsView } from './StandingsView';

export const Sports = () => {
  const { isLoading, isError, error, data: standings } = useStandings();

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
          <h2>Sports</h2>
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

import React, { Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { Header, HorizontalContainer } from '../../components';
import { useAuthContext } from '../../contexts';
import { useHeadlinesQuery } from '../../services';
import { HeadlinesView } from './HeadlinesView';

export const HeadlinesPage = () => {
  const navigate = useNavigate();
  const { authState } = useAuthContext();
  const { isLoading, isError, error, data: headlines } = useHeadlinesQuery();

  if (isLoading) {
    return null;
  }

  /* istanbul ignore next */
  if (isError) {
    throw error;
  }

  const handleManageHeadlines = () => {
    navigate('/manage/headlines');
  };

  return (
    <Fragment>
      <Header />
      <main>
        <div className="container">
          <HorizontalContainer className="items-center mt-2 mb-3">
            <h1 className="title flex-1">Headlines</h1>
            {authState.user !== undefined ? (
              <button
                className="btn-secondary btn-sm"
                onClick={handleManageHeadlines}
              >
                Manage Headlines
              </button>
            ) : null}
          </HorizontalContainer>
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

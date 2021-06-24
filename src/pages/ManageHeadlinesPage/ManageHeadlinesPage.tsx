import React from 'react';
import {
  Header,
  MasterDetail,
  VerticalContainer,
  ViewVerticalContainer,
} from '../../components';
import { HeadlineDetail } from './HeadlineDetail';
import { HeadlinesMaster } from './HeadlinesMaster';

export const ManageHeadlinesPage = () => {
  return (
    <ViewVerticalContainer>
      <Header />
      <VerticalContainer className="container min-h-0">
        <div className="mt-2">
          <h1 className="title">Manage Headlines</h1>
        </div>
        <MasterDetail
          MasterComponent={HeadlinesMaster}
          DetailComponent={HeadlineDetail}
          masterContainerClassName="w-320 bg-primary-50"
          detailContainerClassName="flex-1 paper"
        />
      </VerticalContainer>
    </ViewVerticalContainer>
  );
};

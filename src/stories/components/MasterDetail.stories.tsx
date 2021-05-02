import React from 'react';
import { Meta } from '@storybook/react';
import { MasterDetail, ViewVerticalContainer } from '../../components';
import { HeadlineDetail, HeadlinesMaster } from '../../pages';

export default {
  title: 'Components/MasterDetail',
  component: MasterDetail,
  parameters: {
    layout: 'fullscreen',
  },
} as Meta;

export const MasterDetailStory = () => {
  return (
    <ViewVerticalContainer>
      <MasterDetail
        MasterComponent={HeadlinesMaster}
        DetailComponent={HeadlineDetail}
        masterContainerClassName="w-320 bg-primary-50"
        detailContainerClassName="flex-1 paper"
      />
    </ViewVerticalContainer>
  );
};
MasterDetailStory.storyName = 'MasterDetail';

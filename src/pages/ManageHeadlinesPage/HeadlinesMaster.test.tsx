import React from 'react';
import { mockHeadlines } from '../../mocks/mockHeadlines';
import { render } from '../../test/test-utils';
import { HeadlinesMaster } from './HeadlinesMaster';

const handleStartNewItem = jest.fn();
const handleItemSelected = jest.fn();
const handleItemUpdated = jest.fn();

describe('<HeadlinesMaster />', () => {
  test('renders correctly', async () => {
    const selectionState = { isNew: true, itemId: '', version: 0 };

    const { findAllByTestId } = render(
      <HeadlinesMaster
        selectionState={selectionState}
        onStartNewItem={handleStartNewItem}
        onItemSelected={handleItemSelected}
        onItemUpdated={handleItemUpdated}
      />
    );

    // expect 4 headlines
    const headlines = await findAllByTestId('headline-card');
    expect(headlines.length).toBe(4);
  });

  test('clicking on a headline calls handleItemSelected', async () => {
    const selectionState = { isNew: true, itemId: '', version: 0 };

    const { findAllByTestId } = render(
      <HeadlinesMaster
        selectionState={selectionState}
        onStartNewItem={handleStartNewItem}
        onItemSelected={handleItemSelected}
        onItemUpdated={handleItemUpdated}
      />
    );

    // click on headline[1]
    const headlines = await findAllByTestId('headline-card');
    headlines[1].click();
    expect(handleItemSelected).toBeCalledWith(mockHeadlines[1].id);
  });
});

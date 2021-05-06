import React, { Fragment } from 'react';
import { fireEvent, getByText, render } from '../../test/test-utils';
import { MasterDetail } from './MasterDetail';
import { MasterDetailChildProps } from './MasterDetailChildProps';
import { mockHeadlines } from '../../mocks/mockHeadlines';
import { Headline } from '../../models';

export const HeadlinesMaster = ({
  selectionState,
  onItemSelected,
}: MasterDetailChildProps) => {
  return (
    <Fragment>
      {mockHeadlines.map((headline) => {
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

export const HeadlineDetail = ({
  selectionState,
  onItemSelected,
  onItemUpdated,
}: MasterDetailChildProps) => {
  const { isNew, itemId: headLineId } = selectionState;

  // When isNew is true, we return an existing product. This is bit of
  // a cheating, however it is required for this example to work. If
  // we don't return a saved heading, the detail component will render
  // as blank.
  const headline = isNew
    ? mockHeadlines[0]
    : mockHeadlines.find((headline) => headline.id === headLineId);
  if (!headline) return null;

  const handleSubmit = (headline: Headline) => {
    if (isNew) {
      onItemSelected(headline.id);
    } else {
      onItemUpdated();
    }
  };

  return (
    <Fragment>
      <h1>{isNew ? 'New' : 'Existing'}</h1>
      <h2>{headline.title}</h2>
      <button aria-label="Submit" onClick={() => handleSubmit(headline)}>
        Submit
      </button>
    </Fragment>
  );
};

describe('MasterDetail', () => {
  it('clicking on an item in master shows it in detail', () => {
    const { getByTestId } = render(
      <MasterDetail
        MasterComponent={HeadlinesMaster}
        DetailComponent={HeadlineDetail}
        masterContainerClassName="w-320 bg-primary-50"
        detailContainerClassName="flex-1 paper"
      />
    );

    // Select an item in master
    const master = getByTestId('master-container');
    fireEvent.click(getByText(master, mockHeadlines[1].title));

    // Make sure detail says "Existing" along with the correct title
    const detail = getByTestId('detail-container');
    const h1List = detail.getElementsByTagName('h1');
    expect(h1List[0].textContent).toBe('Existing');

    const h2List = detail.getElementsByTagName('h2');
    expect(h2List[0].textContent).toBe(mockHeadlines[1].title);
  });

  it('allows to add a new item', () => {
    const { getByText, getByTestId } = render(
      <MasterDetail
        MasterComponent={HeadlinesMaster}
        DetailComponent={HeadlineDetail}
        masterContainerClassName="w-320 bg-primary-50"
        detailContainerClassName="flex-1 paper"
      />
    );

    // Add a new item
    fireEvent.click(getByText('Add'));

    // Make sure heading says "New"
    const detail = getByTestId('detail-container');
    const h1List = detail.getElementsByTagName('h1');
    expect(h1List[0].textContent).toBe('New');

    // Submit the new item
    fireEvent.click(getByText('Submit'));

    // Make sure heading says "Existing"
    expect(h1List[0].textContent).toBe('Existing');

    // Make sure detail renders the item name
    // Note: This is because handleSubmit() selects mockHeadlines[0] (see above)
    const h2List = detail.getElementsByTagName('h2');
    expect(h2List[0].textContent).toBe(mockHeadlines[0].title);
  });

  it('allows to update an existing item', async () => {
    const { container, getByTestId } = render(
      <MasterDetail
        MasterComponent={HeadlinesMaster}
        DetailComponent={HeadlineDetail}
        masterContainerClassName="w-320 bg-primary-50"
        detailContainerClassName="flex-1 paper"
      />
    );

    // Select an item in master
    const master = getByTestId('master-container');
    fireEvent.click(getByText(master, mockHeadlines[1].title));

    // Submit the existing item
    fireEvent.click(getByText(container, 'Submit'));

    // Make sure detail renders the item name
    // Note: This is because handleSubmit() selects mockHeadlines[0] (see above)
    const detail = getByTestId('detail-container');
    const h2List = detail.getElementsByTagName('h2');
    expect(h2List[0].textContent).toBe(mockHeadlines[1].title);
  });
});

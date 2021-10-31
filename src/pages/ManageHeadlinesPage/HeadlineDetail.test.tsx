import React from 'react';
import axios from 'axios';
import { render, screen, userEvent, waitFor } from '../../test/test-utils';
import { mockHeadlines } from '../../mocks/mockHeadlines';
import { HeadlineDetail } from './HeadlineDetail';

const handleStartNewItem = jest.fn();
const handleItemSelected = jest.fn();
const handleItemUpdated = jest.fn();

// In this test suite, we are mocking axios.
// This allows us to create and update headlines without having to pass
// an access token to the APIs.
// An alternate approach would be to not mock axios and let MSW accept
// a test token.
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const headline = {
  title: 'My headline',
  attribution: 'My attribution',
  teaser: 'My teaser',
};

beforeEach(() => {
  jest.resetAllMocks();
});

describe('<HeadlineDetail />', () => {
  test('allows to add a new item', async () => {
    const selectionState = { isNew: true, itemId: '', version: 0 };
    mockedAxios.post.mockReturnValue(
      Promise.resolve({
        status: 200,
        data: headline,
      })
    );

    render(
      <HeadlineDetail
        selectionState={selectionState}
        onStartNewItem={handleStartNewItem}
        onItemSelected={handleItemSelected}
        onItemUpdated={handleItemUpdated}
      />
    );

    // add a new item
    userEvent.type(screen.getByLabelText('Title'), headline.title);
    userEvent.type(screen.getByLabelText('Attribution'), headline.attribution);
    userEvent.type(screen.getByLabelText('Teaser'), headline.teaser);
    userEvent.click(screen.getByText('Add'));

    // expect axios.post() to be called
    await waitFor(() =>
      expect(mockedAxios.post).toHaveBeenCalledWith(
        '/headlines',
        expect.objectContaining(headline)
      )
    );

    // expect handleStartNewItem() to be called to start adding new item
    await waitFor(() => expect(handleStartNewItem).toHaveBeenCalledTimes(1));
  });

  test('allows to update existing items', async () => {
    const selectionState = {
      isNew: false,
      itemId: mockHeadlines[1].id,
      version: 0,
    };
    mockedAxios.get.mockReturnValue(
      Promise.resolve({
        status: 200,
        data: mockHeadlines[1],
      })
    );
    mockedAxios.put.mockReturnValue(
      Promise.resolve({
        status: 200,
        data: mockHeadlines[1],
      })
    );

    render(
      <HeadlineDetail
        selectionState={selectionState}
        onStartNewItem={handleStartNewItem}
        onItemSelected={handleItemSelected}
        onItemUpdated={handleItemUpdated}
      />
    );

    // Wait until Update button appears (i.e. headline has been fetched)
    const titleField = await screen.findByLabelText('Title');
    const updateButton = await screen.findByText('Update');

    // change the item
    userEvent.clear(titleField);
    userEvent.type(titleField, headline.title);
    userEvent.click(updateButton);

    const updatedHeadline = { ...mockHeadlines[1], title: headline.title };

    // expect axios.put() to be called
    await waitFor(() =>
      expect(mockedAxios.put).toHaveBeenCalledWith(
        `/headlines/${updatedHeadline.id}`,
        expect.objectContaining(updatedHeadline)
      )
    );

    // expect handleItemSelected() to be called
    await waitFor(() => expect(handleItemSelected).toHaveBeenCalledTimes(1));
  });
});

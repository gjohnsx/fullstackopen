import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import CreateNewBlog from './CreateNewBlog';

describe('<CreateNewBlog />', () => {
  const mockCallback  = jest.fn();
  let container;

  container = render(
    <CreateNewBlog createBlog={mockCallback} />
  ).container;

  test('The form calls the event handlers with the right details when new blog is created', async () => {
    container.querySelector('.create-new-blog--title').value = 'fart';

    const button = container.querySelector('.create-new-blog--btn');
    const jestUser = userEvent.setup();
    screen.debug(button);
    await jestUser.click(button);

    expect(mockCallback.mock.calls.length).toBe(1);
    console.log('this is the arg at index 0 of the first call:', mockCallback.mock.calls[0][0]);
    const keys = Object.keys(mockCallback.mock.calls[0][0]);
    console.log(keys);

    expect(mockCallback).toHaveBeenCalledWith({ 'author': '', 'title': '', 'url': '' });
  });
});

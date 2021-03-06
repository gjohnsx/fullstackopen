import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

describe('<Blog />', () => {
  let container;

  beforeEach(() => {
    const user = {
      username: 'tester',
      id: '12345'
    };

    const blog = {
      author: 'Mr. Test',
      title: 'Testing With Jest',
      url: 'www.test.com/jest',
      likes: 0,
      user: user
    };

    const mockHandler = jest.fn();

    container = render(
      <Blog blog={blog} user={user} addLike={mockHandler} />
    ).container;
  });

  test('Renders title and author, but not likes and url by default', () => {
    const author = screen.queryByText('Mr. Test', { exact: false });
    const title = screen.queryByText('Testing With Jest');
    const url = screen.queryByText('www.test.com/jest');
    const likes = screen.queryByText('Likes:', { exact: false });

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).toBeNull();
    expect(likes).toBeNull();
  });

  test('Renders title, author, likes and url when button clicked', async () => {
    const user = userEvent.setup();
    const button = container.querySelector('.blog--btn-display');

    await user.click(button);

    const author = screen.queryByText('Mr. Test', { exact: false });
    const title = screen.queryByText('Testing With Jest');
    const url = screen.queryByText('www.test.com/jest');
    const likes = screen.queryByText('Likes:', { exact: false });

    expect(title).toBeDefined();
    expect(author).toBeDefined();
    expect(url).not.toBeNull();
    expect(likes).not.toBeNull();
  });

  test('Adds 2 likes if the Like button is clicked twice', async () => {
    const user = {
      username: 'tester',
      id: '12345'
    };

    const blog = {
      author: 'Mr. Test',
      title: 'Testing With Jest',
      url: 'www.test.com/jest',
      likes: 0,
      user: user
    };

    const mockHandler = jest.fn();

    container = render(
      <Blog blog={blog} user={user} addLike={mockHandler} />
    ).container;

    const jestUser = userEvent.setup();
    const showButton = container.querySelector('.blog--btn-display');
    await jestUser.click(showButton);

    const likeButton = container.querySelector('.blog--btn-like');
    await jestUser.click(likeButton);
    await jestUser.click(likeButton);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
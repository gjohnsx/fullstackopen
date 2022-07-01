import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Blog from './Blog';

test('Renders title and author, but not likes and url by default', () => {
  const user = {
    username: 'tester',
    id: '12345'
  };

  const blog = {
    author: 'Mr. Test',
    title: 'Testing With Jest',
    url: 'www.test.com/jest',
    likes: 0,
  };

  render(<Blog blog={blog} user={user} />);
  const author = screen.queryByText('Mr. Test', { exact: false });
  const title = screen.queryByText('Testing With Jest');
  const url = screen.queryByText('www.test.com/jest');
  const likes = screen.queryByText('Likes:', { exact: false });

  expect(title).toBeDefined();
  expect(author).toBeDefined();
  expect(url).toBeNull();
  expect(likes).toBeNull();
});
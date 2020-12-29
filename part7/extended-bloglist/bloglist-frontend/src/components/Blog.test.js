import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Blog from './Blog';

test('renders blog list view', () => {
    const blog = {
        title: 'test blog title',
        author: 'vinura',
        likes: 4,
        url: 'example.com',
        user: {
            username: 'jsx',
            name: 'alex',
        },
    };

    const component = render(
        <Blog
            blog={blog}
            loggedInUser={blog.user}
            deleteBlog={jest.fn()}
            updateBlogLikes={jest.fn()}
        />
    );
    // const blogE
    const blogListDataRegex = new RegExp(`^${blog.title} - ${blog.author}`);
    const blogListView = component.container.querySelector('.blogListView');
    const blogDetails = component.container.querySelector('.blogDetails');
    expect(blogListView).toHaveTextContent(blogListDataRegex);
    expect(blogListView).not.toHaveTextContent(blog.url);
    expect(blogListView).not.toHaveTextContent(blog.likes);
    expect(blogDetails).toHaveStyle('display: none');
});

test('renders blog likes and url when details are shown', () => {
    const blog = {
        title: 'test blog title',
        author: 'vinura',
        likes: 4,
        url: 'example.com',
        user: {
            username: 'jsx',
            name: 'alex',
        },
    };

    const component = render(
        <Blog
            blog={blog}
            loggedInUser={blog.user}
            deleteBlog={jest.fn()}
            updateBlogLikes={jest.fn()}
        />
    );

    const blogDetails = component.container.querySelector('.blogDetails');
    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    expect(blogDetails).not.toHaveStyle('display: none');
    expect(blogDetails).toHaveTextContent(blog.url);
    expect(blogDetails).toHaveTextContent(blog.likes);
});

test('clicking like button twice calls the event handler twice', () => {
    const blog = {
        title: 'test blog title',
        author: 'vinura',
        likes: 4,
        url: 'example.com',
        user: {
            username: 'jsx',
            name: 'alex',
        },
    };

    const likesMockHandler = jest.fn();
    const component = render(
        <Blog
            blog={blog}
            loggedInUser={blog.user}
            deleteBlog={jest.fn()}
            updateBlogLikes={likesMockHandler}
        />
    );

    const viewButton = component.getByText('view');
    fireEvent.click(viewButton);

    const likeButton = component.getByText('like');
    fireEvent.click(likeButton);
    fireEvent.click(likeButton);

    expect(likesMockHandler.mock.calls).toHaveLength(2);
});

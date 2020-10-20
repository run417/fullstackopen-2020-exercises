import React from 'react';
import { render } from '@testing-library/react';
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

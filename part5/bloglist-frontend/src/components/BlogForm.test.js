import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import BlogForm from './BlogForm';

test('<BlogForm /> updates parent state and calls onSubmit with user supplied data', () => {
    const blog = {
        title: 'test title from fireEvent',
        author: 'exigent',
        url: 'example.com',
    };

    const addBlog = jest.fn();

    const component = render(<BlogForm addBlog={addBlog} />);

    const form = component.container.querySelector('form');
    const titleInput = component.container.querySelector('input[name="title"]');
    const authorInput = component.container.querySelector(
        'input[name="author"]'
    );
    const urlInput = component.container.querySelector('input[name="url"]');
    fireEvent.change(titleInput, {
        target: { value: blog.title },
    });
    fireEvent.change(authorInput, {
        target: { value: blog.author },
    });
    fireEvent.change(urlInput, {
        target: { value: blog.url },
    });

    fireEvent.submit(form);
    expect(addBlog.mock.calls).toHaveLength(1);
    const userInputBlog = addBlog.mock.calls[0][0];
    expect(userInputBlog.title).toBe(blog.title);
    expect(userInputBlog.author).toBe(blog.author);
    expect(userInputBlog.url).toBe(blog.url);
});

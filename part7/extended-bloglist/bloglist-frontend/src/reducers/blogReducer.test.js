import blogReducer from './blogReducer';
import deepFreeze from 'deep-freeze';

describe('blogReducer', () => {
    test('returns initialized state from action type INIT_BLOGS', () => {
        const initialBlogs = [
            {
                id: 1,
                title: 'blog title',
                author: 'someone',
                likes: 3,
                url: 'ex.com/blog-title',
            },
            {
                id: 2,
                title: 'blog title 2',
                author: 'anotherone',
                likes: 8,
                url: 'ex.com/blog-title-2',
            },
        ];
        const state = [];
        const action = {
            type: 'INIT_BLOGS',
            data: initialBlogs,
        };

        deepFreeze(state);
        const newState = blogReducer(state, action);
        expect(newState).not.toContainEqual(action.data);
    });

    test('a new blog is saved to existing state', () => {
        const blog = {
            id: 2,
            title: 'second blog',
            url: 'ex.com/second-blog',
            author: 'exos',
            likes: 4,
            user: {
                id: 1,
                username: 'axos',
                name: 'axos b',
            },
        };
        const state = [
            {
                id: 1,
                title: 'some title',
                url: 'ex.com',
                author: 'user',
                likes: 3,
                user: {
                    id: 1,
                    username: 'vin',
                    name: 'vinura',
                },
            },
        ];

        const action = {
            type: 'NEW_BLOG',
            data: blog,
        };
        deepFreeze(state);

        const newState = blogReducer(state, action);
        expect(newState).toContainEqual(action.data);
    });
});

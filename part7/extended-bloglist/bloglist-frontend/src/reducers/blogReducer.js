const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data;
        case 'NEW_BLOG':
            return [...state, action.data];
        case 'UPDATE_BLOG':
            return state.map((blog) =>
                blog.id === action.data.id ? action.data : blog
            );
        case 'DELETE_BLOG':
            return state.filter((blog) => blog.id !== action.data.id);
        default:
            return state;
    }
};

export const initializeBlogs = (blogs) => {
    return {
        type: 'INIT_BLOGS',
        data: blogs,
    };
};

export const saveBlog = (blog) => {
    return {
        type: 'NEW_BLOG',
        data: blog,
    };
};

export const updateBlog = (blog) => {
    return {
        type: 'UPDATE_BLOG',
        data: blog,
    };
};

export const deleteBlogFromState = (blog) => {
    return {
        type: 'DELETE_BLOG',
        data: blog,
    };
};

export default blogReducer;

const { get } = require('mongoose');

const dummy = (blogs) => {
    return 1;
};

const totalLikes = (blogs) => {
    return blogs.reduce((likes, blog) => likes + blog.likes, 0);
};

const favouriteBlog = (blogs) => {
    let maxLikes = -1; // assuming the no. of likes are always positive
    let theFavouriteBlog = null; // the last blog with most likes
    blogs.forEach((blog) => {
        if (blog.likes > maxLikes) {
            theFavouriteBlog = blog;
            maxLikes = blog.likes;
        }
    });

    return theFavouriteBlog
        ? {
              title: theFavouriteBlog.title,
              author: theFavouriteBlog.author,
              likes: theFavouriteBlog.likes,
          }
        : {};
};

const mostBlogs = (blogs) => {
    const mostBlogCountNAuthor = { author: null, blogs: null };

    if (blogs.length === 0) return mostBlogCountNAuthor;

    const authorsWithBlogCount = {};

    const hasProperty = (author) => Boolean(authorsWithBlogCount[author]);
    const getBlogCount = (author) => authorsWithBlogCount[author];
    const incrementBlogCount = (author) => {
        authorsWithBlogCount[author] += 1;
    };
    const initializeBlogCount = (author) => {
        authorsWithBlogCount[author] = 1;
    };

    const setMostBlogs = (blogCount, author) => {
        mostBlogCountNAuthor.blogs = blogCount;
        mostBlogCountNAuthor.author = author;
    };

    blogs.forEach((blog) => {
        const { author } = blog;
        if (hasProperty(author)) {
            incrementBlogCount(author);
        } else {
            initializeBlogCount(author);
        }
        if (getBlogCount(author) >= mostBlogCountNAuthor.blogs) {
            setMostBlogs(getBlogCount(author), author);
        }
    });
    return mostBlogCountNAuthor;
};

const mostLikes = (blogs) => {
    const authorLikes = { author: null, likes: null };
    if (blogs.length === 0) return authorLikes;

    const authorsAndLikes = {};

    const hasProperty = (author) => Boolean(authorsAndLikes[author]);
    const getLikes = (author) => authorsAndLikes[author];
    const addLikes = (author, likes) => {
        authorsAndLikes[author] += likes;
    };
    const initializeLikes = (author, likes) => {
        authorsAndLikes[author] = likes;
    };

    const setMostLikes = (likes, author) => {
        authorLikes.likes = likes;
        authorLikes.author = author;
    };

    blogs.forEach((blog) => {
        const { author, likes } = blog;
        if (hasProperty(author)) {
            addLikes(author, likes);
        } else {
            initializeLikes(author, likes);
        }
        // number >= null === true
        if (getLikes(author) >= authorLikes.likes) {
            setMostLikes(getLikes(author), author);
        }
    });
    return authorLikes;
};

module.exports = { dummy, totalLikes, favouriteBlog, mostBlogs, mostLikes };

const listHelper = require('../utils/for_testing');

const emptyBlogList = [];

const listWithOneBlog = [
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
            'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
];

const blogList = [
    {
        _id: '5a422a851b54a676234d17f7',
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
        __v: 0,
    },
    {
        _id: '5a422aa71b54a676234d17f8',
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url:
            'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
        __v: 0,
    },
    {
        _id: '5a422b3a1b54a676234d17f9',
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
        __v: 0,
    },
    {
        _id: '5a422b891b54a676234d17fa',
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
        __v: 0,
    },
    {
        _id: '5a422ba71b54a676234d17fb',
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
        __v: 0,
    },
    {
        _id: '5a422bc61b54a676234d17fc',
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
        __v: 0,
    },
];

test('dummy returns one', () => {
    expect(listHelper.dummy(emptyBlogList)).toBe(1);
});

describe('total likes', () => {
    test('of empty list is zero', () => {
        expect(listHelper.totalLikes(emptyBlogList)).toBe(0);
    });

    test('when the list has one blog, equals the likes of that', () => {
        expect(listHelper.totalLikes(listWithOneBlog)).toBe(5);
    });

    test('of a bigger list is calculated right', () => {
        expect(listHelper.totalLikes(blogList)).toBe(36);
    });
});

describe('the favourite blog', () => {
    test('for an empty list is an empty object', () => {
        expect(listHelper.favouriteBlog(emptyBlogList)).toEqual({});
    });

    test('for a single element list is some properties of that blog', () => {
        const expectedBlog = {
            title: 'Go To Statement Considered Harmful',
            author: 'Edsger W. Dijkstra',
            likes: 5,
        };
        expect(listHelper.favouriteBlog(listWithOneBlog)).toEqual(expectedBlog);
    });

    test('for a blog list', () => {
        const expectedBlog = {
            title: 'Canonical string reduction',
            author: 'Edsger W. Dijkstra',
            likes: 12,
        };
        expect(listHelper.favouriteBlog(blogList)).toEqual(expectedBlog);
    });
});

describe('author with most blogs', () => {
    test('when blog list is empty', () => {
        expect(listHelper.mostBlogs(emptyBlogList)).toEqual({ author: null, blogs: null });
    });
    test('for a single blog', () => {
        expect(listHelper.mostBlogs(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            blogs: 1,
        });
    });

    test('from a list of blogs', () => {
        expect(listHelper.mostBlogs(blogList)).toEqual({ author: 'Robert C. Martin', blogs: 3 });
    });
});

describe('author with most likes', () => {
    test('when blog list is empty', () => {
        expect(listHelper.mostLikes(emptyBlogList)).toEqual({ author: null, likes: null });
    });
    test('for a single blog', () => {
        expect(listHelper.mostLikes(listWithOneBlog)).toEqual({
            author: 'Edsger W. Dijkstra',
            likes: 5,
        });
    });

    test('from a list of blogs', () => {
        expect(listHelper.mostLikes(blogList)).toEqual({ author: 'Edsger W. Dijkstra', likes: 17 });
    });
});

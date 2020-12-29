Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
        username,
        password,
    }).then((response) => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(response.body));
        cy.visit('http://localhost:3000');
    });
});

// a bit slower b/c of logging in before each blog creation
Cypress.Commands.add(
    'createBlogAsUser',
    ({ title, author, url, likes, username, password }) => {
        let token = null;
        cy.request('POST', 'http://localhost:3003/api/login', {
            username,
            password,
        }).then((response) => {
            token = response.body.token;
            cy.request({
                url: 'http://localhost:3003/api/blogs',
                method: 'POST',
                body: { title, author, url, likes },
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
        });
    }
);

describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');

        const user = { username: 'vinura', name: 'Vinura', password: 'secret' };
        cy.request('POST', 'http://localhost:3003/api/users', user);

        const user2 = { username: 'exos', name: 'Alexa', password: 'secret2' };
        cy.request('POST', 'http://localhost:3003/api/users', user2);

        cy.visit('http://localhost:3000');
    });

    it('login page is shown', function () {
        cy.get('form').get('button').should('contain', 'login');
    });

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('input[name=username]').type('vinura');
            cy.get('input[name=password]').type('secret');
            cy.get('button').contains('login').click();
            cy.contains('Login successful');
        });

        it('fails with incorrect credentials', function () {
            cy.get('input[name=username]').type('vinura');
            cy.get('input[name=password]').type('wrong');
            cy.get('button').contains('login').click();
            cy.contains('invalid username or password').should(
                'have.css',
                'color',
                'rgb(128, 0, 0)'
            );
        });

        describe('when logged in', function () {
            beforeEach(function () {
                cy.login({ username: 'vinura', password: 'secret' });
            });

            it('a new blog can be created', function () {
                cy.contains('new blog').click();
                cy.get('input[name=title]').type('cypress blog title');
                cy.get('input[name=author]').type('exos');
                cy.get('input[name=url]').type('example.com');
                cy.get('button').contains('create').click();
                cy.contains('a new blog cypress blog title added');
                cy.get('.blogList').contains('cypress blog title');
            });
        });
    });

    describe('Existing blog', function () {
        beforeEach(function () {
            cy.createBlogAsUser({
                title: 'new blog as different user',
                author: 'cypress',
                url: 'example.com',
                likes: 0, // explicitly setting likes
                username: 'exos',
                password: 'secret2',
            });
            // login as a different user
            cy.login({ username: 'vinura', password: 'secret' });
        });

        // user who created blog can like own blog too but testing the functionlity w/ different user
        it('user can like blog', function () {
            cy.contains('new blog as different user')
                .contains('button', 'view')
                .click();
            cy.contains('likes').should('contain', '0');
            cy.contains('button', 'like').click();
            cy.contains('likes').should('contain', '1');
        });
    });

    describe('Multiple existing blogs', function () {
        beforeEach(function () {
            cy.createBlogAsUser({
                title: 'first blog',
                likes: 33,
                author: 'cypress',
                url: 'example.com',
                username: 'exos',
                password: 'secret2',
            });
            cy.createBlogAsUser({
                title: 'second blog',
                likes: 33,
                author: 'cypress',
                url: 'example.com',
                username: 'vinura',
                password: 'secret',
            });
            cy.createBlogAsUser({
                title: 'third blog',
                likes: 39,
                author: 'cypress',
                url: 'example.com',
                username: 'exos',
                password: 'secret2',
            });
            cy.login({ username: 'vinura', password: 'secret' });
        });

        it('blogs are arranged according to like count', function () {
            // Expand blog to view like count
            cy.get('.blog').each((blogelement) => {
                cy.wrap(blogelement).contains('button', 'view').click();
            });

            // get like count of each blog,
            // compare it to next blog like count
            cy.get('.likeCount').each((jElement, index, elementArray) => {
                // skip if jElement is the last in array
                if (elementArray[index + 1] !== undefined) {
                    expect(parseInt(jElement.text())).to.be.at.least(
                        parseInt(Cypress.$(elementArray[index + 1]).text()) // convert to Jquery for uniformity
                    );
                }
            });
        });
    });

    describe('Deleting blogs', function () {
        beforeEach(function () {
            cy.createBlogAsUser({
                title: 'new blog as different user',
                author: 'cypress',
                url: 'example.com',
                username: 'exos',
                password: 'secret2',
            });
        });

        it('can be deleted by creator', function () {
            cy.login({ username: 'exos', password: 'secret2' });
            cy.contains('new blog as different user')
                .contains('button', 'view')
                .click();
            cy.contains('button', 'remove').click();
            cy.contains('Removed blog');
        });

        // tests for the availability of the remove button
        it('cannot be deleted by another user', function () {
            cy.login({ username: 'vinura', password: 'secret' });
            cy.contains('new blog as different user')
                .contains('button', 'view')
                .click();
            cy.contains('html').should('not.contain', 'remove');
        });
    });
});

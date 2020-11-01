describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        const user = { username: 'vinura', name: 'Vinura', password: 'secret' };
        cy.request('POST', 'http://localhost:3003/api/users', user);
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
    });
});

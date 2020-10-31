describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3003/api/testing/reset');
        cy.visit('http://localhost:3000');
    });

    it('login page is shown', function () {
        cy.get('form').get('button').should('contain', 'login');
    });
});

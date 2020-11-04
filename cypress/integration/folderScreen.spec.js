describe('logging in', () => {
    it('logging in', () => {
      cy.visit('/');
      cy.get('input').first().type("admin@admin.com")
      cy.get('input').eq(1).type("123321")
      cy.get('div[role=button]').first().click()
    });

    it('navigate to folders', () => {
        cy.get('span').contains("My Folders").click()
        cy.get('div').should('contain', 'CEO')
    });

    it('folder contains candidates', () => {
        cy.get('div').contains("DA").click()
        cy.get('div').should('contain', 'Benjamin Powell')
    });

});
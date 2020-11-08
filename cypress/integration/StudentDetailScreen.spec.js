describe('<StudentDetailScreen />', () => {
    it('(user logs in)', () => {
      cy.visit('/');
      cy.get('input').first().type("admin@admin.com");
      cy.get('input').eq(1).type("123321");
      cy.get('div[role=button]').first().click();
    });

    it("is accessible by clicking a student's candidate card", () => {
        cy.get('div').contains("Wayne Rooney").click();
    });

    it('diplays skills', () => {
        cy.get('div').should('contain', 'CSS');
    });

    it('allows the student to be added to folders', () => {
        cy.get("div").contains("Save").should("not.exist"); //modal not visible yet
        cy.get('div').contains('Add to Folder').click();
        cy.get("div").contains("Save"); //modal is now displayed
    });

});

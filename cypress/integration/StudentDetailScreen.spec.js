describe('<StudentDetailScreen />', () => {
    it('(user logs in)', () => {
      cy.visit('/');
      cy.get('input').first().type("admin@admin.com")
      cy.get('input').eq(1).type("123321")
      cy.get('div[role=button]').first().click()
    });

    it("is accessible by clicking a student's candidate card", () => {
        cy.get('div').contains("Taylor Kesicki").click()
    });

    it('diplays skills', () => {
        cy.get('div').should('contain', 'video games')
    });

});

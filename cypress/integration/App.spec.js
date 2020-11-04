describe("<App />", () => {
  it("launches", () => {
    cy.visit("/");
  });
});

describe('<FilterBar />', () => {
    it('logging in', () => {
      cy.visit('/');
      cy.get('input').first().type("admin@admin.com")
      cy.get('input').eq(1).type("123321")
      cy.get('div[role=button]').first().click()
    });
  it('has a graduation year chip', () => {
    cy.get('div').contains("Graduation Year").click();
  });
  it('pulls up a filter modal with a cancel button', () => {
    cy.get('div').contains("Cancel");
  });
});

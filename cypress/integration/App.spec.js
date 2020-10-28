describe("Test App", () => {
  it("launches", () => {
    cy.visit("/");
  });

  it("opens with Filter Bar", () => {
    cy.visit("/");
    //cy.wait(10000);
    // cy.get("[data-cy=nav]").should(
    //   "contain",
    //   "45 student(s) matched your qualifications."
    // );
  });
});



describe('<FilterBar />', () => {
  it('Find attribute', () => {
    cy.visit('/');
    cy.get('div[role=button]').contains("Graduation Year").click();
    cy.get('div[role=button]').contains("Cancel");
  });
}); 

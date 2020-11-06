describe("Test <FilterBar /> & <ModalOptions />", () => {
  it("Logs in", () => {
    cy.visit("/");
    cy.get("input").first().type("test@test.com");
    cy.get("input").eq(1).type("123456");
    cy.get("div[role=button]").first().click();
  });

  it("modal opens/closes and displays correctly", () => {
    cy.get("div").contains("Save Filter").should("not.exist"); //modal not visible yet

    cy.get("div").contains("Major").click(); //opening modal
    cy.get("div").contains("Save Filter"); //modal is now displayed
    cy.get("div").contains("Biology"); //major options are now displayed
    cy.get("div").contains("Doctorate").should("not.exist"); //only info from correct modal displays

    cy.get("div").contains("Cancel").click(); //close modal
    cy.get("div").contains("Save Filter").should("not.exist"); //modal invisible again
  });

  it("boxes check/uncheck", () => {
    cy.get("div").contains("Major").click();
    cy.get("[role=checkbox]").first().click();
  });
});

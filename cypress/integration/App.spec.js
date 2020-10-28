describe("Test App", () => {
  it("launches", () => {
    cy.visit("/");
  });

  it("opens with Filter Bar", () => {
    cy.visit("/");
    cy.get("[data-cy=numQual]").should(
      "contain",
      "45 student(s) matched your qualifications."
    );
  });
});

describe("Test Navigation", () => {
  it("logging in", () => {
    cy.visit("/");
    cy.get("input")
      .first()
      .type("admin@admin.com");
    cy.get("input")
      .eq(1)
      .type("123321");
    cy.get("div[role=button]")
      .first()
      .click();
  });

  it("Find Folder Button", () => {
    cy.get("a[role=link]")
      .contains("My Folders")
      .click();
    cy.get("h1[role=heading]").contains("My Folders");
  });

  it("Find Home Button", () => {
    cy.get("a[role=link]")
      .contains("Home")
      .click();
    cy.get("h1[role=heading]").contains("Home");
  });
});

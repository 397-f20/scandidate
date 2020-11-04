describe("Test RecruiterLandingScreen", () => {
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
    cy.wait(100);
  });

  it("Find Home Header Text", () => {
    cy.get("a[role=link]")
      .contains("Home")
      .click();
    cy.get("h1[role=heading]").contains("Home");
  });

  it("Find Home Header Text", () => {
    cy.get("a[role=link]")
      .contains("Home")
      .click();
    cy.get("h1[role=heading]").contains("Home");
  });

  it("Has a GPA chip", () => {
    cy.get("div").contains("GPA");
  });

  it("Has a Graduation Year chip", () => {
    cy.get("div").contains("Graduation Year");
  });

  it("Has a Major chip", () => {
    cy.get("div").contains("Major");
  });

  it("Has a Degree chip", () => {
    cy.get("div").contains("Degree");
  });
});

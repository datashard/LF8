describe("Players", () => {
  it("gets all players in db", () => {
    // cy.visit("/");
    cy.request("/api/tests/players").
    // @ts-ignore
    cy.get("@Result").snapshot();
  });
});

describe("Players", () => {
  it("gets all players in db", () => {
    // cy.visit("/");
    cy.request("/api/tests/players").then(r => {
      // @ts-ignore
      cy.wrap(r.body).snapshot()
    })
  });
});

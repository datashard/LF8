describe("Questions", () => {
  it("gets filtered questions from db", () => {
    // cy.visit("/");
    cy.request("/api/tests/questions").then(r => {
      // @ts-ignore
      cy.wrap(r.body).snapshot()
    })
  });
});

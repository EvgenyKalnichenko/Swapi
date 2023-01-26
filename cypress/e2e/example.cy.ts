// https://docs.cypress.io/api/introduction/api.html

describe("My First Test", () => {
  it("visits the app root url", () => {
    cy.visit("/");
    cy.contains("h1", "Home");
  });

  it("Add favorites item", () => {
    cy.visit("/peoples");
    cy.get('button').first().click();
    cy.visit("/favorites");
    cy.contains('tr', 'Luke Skywalker');
  });
});

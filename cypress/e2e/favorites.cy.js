/* global describe, it, cy */
describe("Favorites logic", () => {
  it("adds a game to favorites and keeps it after reload", () => {
    cy.visit("/games/3498");

    cy.contains("Ajouter aux favoris").click();

    cy.contains("Retirer des favoris").should("be.visible");

    cy.reload();

    cy.contains("Retirer des favoris").should("be.visible");

    cy.visit("/favorites");

    cy.contains("Grand Theft Auto V").should("be.visible");
  });

  it("removes a game from favorites", () => {
    cy.visit("/games/3498");

    cy.contains("Ajouter aux favoris").click();

    cy.visit("/favorites");

    cy.contains("Retirer").click();

    cy.contains("Aucun jeu en favori.").should("be.visible");
  });
});
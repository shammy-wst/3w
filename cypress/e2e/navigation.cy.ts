/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />
/// <reference types="cypress-axe" />
/// <reference types="cypress-real-events" />

describe("Navigation Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("should navigate through all pages", () => {
    // Vérifier la page d'accueil
    cy.url().should("eq", "http://localhost:3000/");
    cy.get("h1").contains("3W").should("be.visible");

    // Aller à la page Projets
    cy.get('a[href="/projets"]').click();
    cy.url().should("include", "/projets");
    cy.get("h1").contains("Nos Réalisations").should("be.visible");

    // Aller à la page Contact
    cy.get('a[href="/contact"]').click();
    cy.url().should("include", "/contact");
    cy.get("h1").contains("Notre Équipe").should("be.visible");

    // Retour à l'accueil via le logo
    cy.get('a[href="/"]').first().click();
    cy.url().should("eq", "http://localhost:3000/");
  });

  it("should have working contact form", () => {
    cy.visit("/contact");

    // Remplir le formulaire
    cy.get('input[name="name"]').type("Test User");
    cy.get('input[name="email"]').type("test@example.com");
    cy.get('input[name="subject"]').type("Test Subject");
    cy.get('textarea[name="message"]').type("Test Message");
    cy.get('input[name="password"]').type("Test123!@#");

    // Vérifier les validations
    cy.get('button[type="submit"]').should("not.be.disabled");

    // Vérifier les messages d'erreur
    cy.get('input[name="email"]').clear().type("invalid-email");
    cy.get('input[name="email"]').blur();
    cy.contains("Veuillez entrer une adresse email valide").should(
      "be.visible"
    );
  });

  it("should be accessible", () => {
    // Vérifier la navigation au clavier
    cy.get('a[href="#main-content"]').realPress("Tab");
    cy.focused().should("have.attr", "href", "#main-content");

    // Vérifier les rôles ARIA
    cy.get("nav").should("have.attr", "role", "navigation");
    cy.get("main").should("have.attr", "id", "main-content");

    // Vérifier les contrastes (nécessite cypress-axe)
    cy.injectAxe();
    cy.checkA11y();
  });
});

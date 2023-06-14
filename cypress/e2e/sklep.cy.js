/// <reference types="cypress" />

describe('Sowe - home page - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.visit(url.shopUrl);
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it('Should open sklep page and verify url', () => {
    cy.url().should('eq', url.shopUrl);
    cy.title().should('eq', 'Sklep – Sowe Curtains zasłony do salonu');
  });
});

/// <reference types="cypress" />

describe('Sowe - home page - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.visit(url.czapleProdukt);
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it.only('check visibility and url of breadcrumbs nav', () => {
    cy.requestCheckLink('.woocommerce-breadcrumb a');
    cy.contains('Zasłony').click({ force: true });
    cy.url().should('eq', url.zaslonyUrl);
  });
});

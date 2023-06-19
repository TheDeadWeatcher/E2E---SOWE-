/// <reference types="cypress" />

describe('Sowe - shop page - Mobile - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.viewport(550, 750);
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

  it('check visibility and lenght of nav with category', () => {
    cy.get('.tf_hide.menu-module-burger').should('be.visible').click({ force: true });
    cy.checkLength('#menu-kategorie li a', 7);
    cy.checkLinksUrlsTitles('#menu-kategorie li a');
  });

  it('Should check visibilty of container with iteam also check lenght of iteam', () => {
    cy.get('.module-product-image').eq(1).should('be.visible');
    cy.checkLength('.module.woocommerce.module-archive-products.tb_wxc8171.module-product-image ul li', 30);
  });

  it('Should click on first iteam, check url', () => {
    cy.get('.module.woocommerce.module-archive-products.tb_wxc8171.module-product-image ul li a')
      .eq(0)
      .click({ force: true });
    cy.checkH1('.product_title.entry-title');
  });

  it.only('Should check visibility currencies manu', () => {
    cy.get('.wmc-currency-symbol').eq(2).click({ force: true });
    cy.get('.wmc-list-currencies').should('be.visible');
    cy.get('.wmc-title').should('contain', 'Select your currency');
    cy.get('[data-currency="PLN"]').should('contain', 'PLN');
    cy.get('[data-currency="PLN"]').should('contain', 'Złoty polski');
    cy.get('[data-currency="EUR"]').should('contain', '€');
    cy.get('[data-currency="EUR"]').should('contain', 'Euro');
  });
});

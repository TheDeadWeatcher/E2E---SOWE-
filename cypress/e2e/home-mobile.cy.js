/// <reference types="cypress" />

describe('Sowe - home page - mobile - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.viewport(550, 750);
    cy.visit('/');
  });

  it('Should open home page, verify url and title', () => {
    cy.url().should('eq', url.homeUrl);
    cy.title().should('contain', 'Sowe');
  });

  it('Visible of header elements: main nav, logo, language, cart, loop', () => {
    cy.requestCheckLink('#header a');
  });

  it('Should click on GTtranslate and verify visibilty of popup also correct language', () => {
    // cy.wait(1000);
    cy.get('#menu-icon').should('be.visible').click({ force: true });
    cy.get('#mobile-menu').should('be.visible').find('#icon-menu').invoke('show');
    cy.contains('Polish').click();
    cy.get('.gt_languages a').should('have.length', 6);
    // cy.get('.gt_languages').contains('English').should('be.visible').click();
    // cy.get('#icon-menu').contains('English').should('be.visible').click();
  });

  it('Should click on cart, verify url, title, back to shop button', () => {
    cy.get('#cart-link-mobile').click();
    cy.url().should('eq', url.cartUrl);
    cy.checkH1('p.cart-empty.woocommerce-info');
    cy.contains('Wróć do sklepu').should('be.visible').click({ force: true });
    cy.url().should('eq', url.shopUrl);
  });

  it('should search for a valid product', () => {
    cy.get('#menu-icon').should('be.visible').click({ force: true });
    const searchTerm = 'Komplet zasłon Czaple';
    cy.get('[aria-label="Search"]').eq(0).should('exist').click({ force: true });
    cy.get('form#searchform.tf_rel.tf_hide').invoke('show');
    cy.get('#s').invoke('show').type('Komplet zasłon Czaple {enter}');
    cy.get('.page-title').should('contain', searchTerm);
  });

  it('should search for a invalid product', () => {
    cy.get('#menu-icon').should('be.visible').click({ force: true });
    const searchTerm = 'robot vader';
    cy.get('[aria-label="Search"]').eq(0).should('exist').click({ force: true });
    cy.get('form#searchform.tf_rel.tf_hide').invoke('show');
    cy.get('#s').invoke('show').type('robot vader {enter}');
    cy.get('#content p').should('have.text', 'Sorry, nothing found.');
    cy.get('.page-title').should('contain', searchTerm);
  });

  it('Verify visiblity "Nowości" section also verify lenght, correct url of section item', () => {
    cy.get('#tb_0n8h826').find('.product_title').should('have.length', 4);
    cy.specialCategory('#tb_0n8h826', '.product_title a');
  });

  it('Verify visiblity "Promocje" section also verify lenght, correct url of section item', () => {
    cy.get('#tb_z3lk735').find('.product_title').should('have.length', 4);
    cy.specialCategory('#tb_z3lk735', '.product_title a');
  });

  it('Should check all "odkryj buttons i home page - mobile', () => {
    cy.requestCheckLink('.module-buttons-item.tf_inline_b a');
  });
});

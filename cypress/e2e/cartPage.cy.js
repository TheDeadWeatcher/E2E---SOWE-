/// <reference types="cypress" />

describe('Sowe - Cart page - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  // beforeEach(() => {
  //   cy.visit(url.czapleProdukt);
  // });

  it('Should add product to the cart, open cart page, procced paymant to the final stage', () => {
    cy.visit(url.czapleProdukt);
    cy.get('.single_variation_wrap').should('be.visible').find('button').click({ force: true });
    cy.get('#cart-icon-count').click();
    cy.url().should('eq', url.cartUrl);
    cy.get('.wc-proceed-to-checkout').click();
    cy.get('#billing_first_name').type('Bartosz', { force: true });
    cy.get('#billing_last_name').type('test2', { force: true });
    cy.get('#billing_address_1').type('test 3', { force: true });
    cy.get('#billing_postcode').type('55-080', { force: true });
    cy.get('#billing_city').type('Kąty Wrocławskie', { force: true });
    cy.get('#billing_phone').type('070056545', { force: true });
    cy.get('#billing_email').type('test3@gmail.com', { force: true });
    cy.get('#terms').check();
    cy.get('#place_order').click({ force: true });
    cy.url().should('contains', 'order-received/');
  });

  it('Should check valid info about cuopon, delete product from basket and valid alert', () => {
    cy.visit(url.czapleProdukt);
    cy.get('.single_variation_wrap').should('be.visible').find('button').click({ force: true });
    cy.wait(1000);
    cy.get('#cart-icon-count').should('be.visible').click();
    cy.wait(500);
    cy.url().should('eq', url.cartUrl);
    cy.get('#coupon_code').type('123 {enter}');
    cy.get('[role="alert"] li').should('contain', 'nie istnieje!');
    cy.get('.remove').click();
    cy.get('p.cart-empty.woocommerce-info').should('contain', 'Twój koszyk aktualnie jest pusty.');
    cy.contains('Wróć do sklepu').click();
    cy.url().should('eq', url.shopUrl);
  });
});

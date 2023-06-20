/// <reference types="cypress" />

describe('Sowe - product page  - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.visit(url.czapleProdukt);
  });

  it('check visibility and url of breadcrumbs nav', () => {
    cy.requestCheckLink('.woocommerce-breadcrumb a');
    cy.contains('Zasłony').click({ force: true });
    cy.url().should('eq', url.zaslonyUrl);
  });

  it('Should add product with 250 size to the cart then check the basket icon (correct number of items)', () => {
    cy.get('#wymiary').select('147 x 250 cm', { force: true }).should('have.value', '147 x 250 cm');
    cy.get('.single_variation_wrap').should('be.visible').find('button').click({ force: true });
    cy.get('span.icon-menu-count').should('contain', 1);
    cy.get('span.price').should('contain', '1 200,00');
  });

  it('Should click on "dodaj" button without choosing size, validate alert', () => {
    cy.get('#wymiary').select('Wybierz opcję', { force: true }).should('not.have.property', 'value');
    cy.get('.single_variation_wrap').should('be.visible').find('button').click({ force: true });
    cy.get('.single_variation_wrap').should('be.visible').find('button').click({ force: true });
    cy.on('window:alert', (str) => {
      expect(str).to.equal('Wybierz opcje produktu przed dodaniem go do koszyka.');
    });
  });

  it('Should check lenght of related product also click and verify correct url', () => {
    cy.checkLength('.related.products>ul>li', 2);
    cy.checkLinksUrlsTitles('h3.product_title a');
  });
});

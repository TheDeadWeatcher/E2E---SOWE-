/// <reference types="cypress" />

describe('Sowe - shop page - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.visit(url.shopUrl);
  });

  it('Should open sklep page and verify url', () => {
    cy.url().should('eq', url.shopUrl);
    cy.title().should('eq', 'Sklep – Sowe Curtains zasłony do salonu');
  });

  it('check visibility and url of breadcrumbs nav', () => {
    cy.get('.tbp_breadcrumb_trail').should('be.visible').find('[rel="home"]').click({ force: true });
    cy.url().should('eq', url.homeUrl);
  });

  it('check visibility and lenght of side nav with category', () => {
    cy.get('.widget.woocommerce.widget_product_categories')
      .should('be.visible')
      .find('.product-categories')
      .should('be.visible');
    cy.checkLength('.product-categories a', 13);
    cy.checkLinksUrlsTitles('.product-categories a');
  });

  it('Should check visibilty of container with iteam also check lenght of iteam', () => {
    cy.get('.module-product-image').should('be.visible');
    cy.get('.module-product-image>ul>li').should('be.visible');
    cy.checkLength('.module-product-image>ul>li', 62);
  });

  it('Should click on first iteam, check url', () => {
    cy.get('.module-product-image>ul>li a').eq(0).click({ force: true });
    cy.checkH1('.product_title.entry-title');
  });

  it('Should chcek visibility, length and url of bottom page nav with number', () => {
    cy.checkLength('.pagenav a', 10);
    cy.requestCheckLink('.pagenav a');
  });

  it('Should check visibility currencies manu', () => {
    cy.get('.wmc-list-currencies').trigger('mouseover', { force: true });
    cy.get('.wmc-list-currencies').should('be.visible');
    cy.get('.wmc-title').should('contain', 'Select your currency');
    cy.get('[data-currency="PLN"]').should('contain', 'PLN');
    cy.get('[data-currency="PLN"]').should('contain', 'Złoty polski');
    cy.get('[data-currency="EUR"]').should('contain', '€');
    cy.get('[data-currency="EUR"]').should('contain', 'Euro');
  });
});

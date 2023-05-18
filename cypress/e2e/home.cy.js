/// <reference types="cypress" />

describe('Sowe - home page - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  // Sowe site have issue with " fb is not defined" code belowe skip this issue and test can go without any problems.

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it('Should open home page, verify url and title', () => {
    cy.url().should('eq', url.homeUrl);
    cy.title().should('contain', 'Sowe');
  });

  it('Visible of header elements: main nav, logo, language, cart, loop', () => {
    cy.get('#headerwrap a[href]').should('be.visible');
    cy.get('#headerwrap a[href]').each(($el) => {
      const linkHref = $el.attr('href');

      //   if (linkHref === 'put here not working link') {
      //     cy.log(`Skipping link: ${linkHref}`);
      //     return;
      //   }

      cy.request(linkHref).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('should search for a valid product', () => {
    const searchTerm = 'Komplet zasłon Czaple';
    cy.get('[aria-label="Search"]').eq(1).should('exist').click({ force: true });
    cy.get('form#searchform.tf_rel.tf_hide').invoke('show');
    cy.get('#s').invoke('show').type('Komplet zasłon Czaple {enter}');
    cy.get('.page-title').should('contain', searchTerm);
  });

  it('should search for a invalid product', () => {
    const searchTerm = 'robot vader';
    cy.get('[aria-label="Search"]').eq(1).should('exist').click({ force: true });
    cy.get('form#searchform.tf_rel.tf_hide').invoke('show');
    cy.get('#s').invoke('show').type('robot vader {enter}');
    cy.get('#content p').should('have.text', 'Sorry, nothing found.');
    cy.get('.page-title').should('contain', searchTerm);
  });

  it('Verify visiblity buttons and correct url', () => {
    cy.get('.sp-layer.bsp-slide-button').should('be.visible');
    cy.get('.sp-layer.bsp-slide-button').each(($el) => {
      const linkHref = $el.attr('href');
      cy.request(linkHref).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});

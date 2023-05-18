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

  it('should have all "SKLEP" links and verify correct url', () => {
    cy.get('#header').should('be.visible');
    cy.get('#main-nav').contains('SKLEP').trigger('focus');
    cy.contains('Zasłony').trigger('focus', { force: true });
    cy.contains('Komplet zasłon Czaple').click({ force: true });
  });

  it.only('Check all links in main nav"', () => {
    cy.get('#main-nav a[href]').should('be.visible');
    cy.get('#main-nav a[href]').each(($link) => {
      cy.wrap($link).should('have.attr', 'href');
      const linkTitle = $link.text().trim().toLocaleLowerCase().replace(/ł/g, 'l'); // get the title of the current link

      // if (linkHref === 'https://www.sowe.pl/kategoria-produktu/zaslony/') {
      //   cy.log(`Skipping link: ${linkHref}`);
      //   return;
      // }

      cy.wrap($link).click({ force: true });
      cy.title().should('contain', linkTitle); // verify the title of the current link
      cy.go('back');
    });
  });
});

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

  it.only('should have all "SKLEP" links and verify correct url', () => {
    cy.get('#header').should('be.visible');
    cy.get('#main-nav').contains('SKLEP').trigger('focus');
    cy.get('.mega-sub-menu.sub-menu').contains('Zasłony').trigger('focus', { force: true });
    cy.contains('Komplet zasłon Czaple').click({ force: true });
  });

  // it.only('Check all links in main nav"', () => {
  //   cy.contains('SKLEP').click();
  //   cy.get('.mega-sub-menu.sub-menu').should('be.visible');
  //   cy.get('.mega-sub-menu.sub-menu a').as('linkList');
  //   cy.get('@linkList').each(($link) => {
  //     cy.wrap($link).should('have.attr', 'href');
  //     const linkTitle = $link.text().trim().toLocaleLowerCase(); // get the title of the current link
  //     cy.wrap($link).click();
  //     cy.title().should('contain', linkTitle); // verify the title of the current link
  //     cy.go('back');
  //   });
  // });
});

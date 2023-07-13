/// <reference types="cypress" />

describe('Sowe - nav - footer - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.visit('/');
  });

  it('Check all links in main nav"', () => {
    cy.checkLinksUrlsTitles('.mega-sub-menu.sub-menu a');
    cy.requestCheckLink('.mega-sub-menu.sub-menu>ul>li>a');
    // cy.checkLinksUrlsTitles('#main-nav a[href]');
  });

  it('Should verify visibility of all links in footer section also check title and url', () => {
    cy.get('#footer a').should('have.length', 9);
    // logo
    cy.get('#media_image-2').click({ force: true });
    cy.url().should('eq', url.homeUrl);
    // rest
    cy.checkLinksUrlsTitles('#menu-footer-nav a');
  });
});

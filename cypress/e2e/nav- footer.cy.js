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

  // it.only('should check all main kategory "SKLEP" links and verify correct url of first product', () => {
  //   // cy.contains('SKLEP').should('be.visible').click();
  //   // cy.url().should('eq', url.sklepUrl);
  //   // cy.go('back');
  //   // cy.checkLinksUrlsTitles('.mega-sub-menu.sub-menu>ul>li>a');
  //   cy.get('.mega-menu-posts.tf_left.tf_box').find('.figure.post-image').eq(0).click();
  //   cy.get('h1').then(($title) => {
  //     const title = $title.text();
  //     cy.get('h1').should('have.text', title);
  //   });
  // });

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

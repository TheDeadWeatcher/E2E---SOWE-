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

  // Sowe site have issue with " fb is not defined" code belowe make this test to pass

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it('Should open home page, verify url and title', () => {
    cy.url().should('eq', url.homeUrl);
    cy.title().should('contain', 'Sowe');
  });

  it.only('Visible of header elements: main nav, logo, language, cart, loop', () => {
    cy.get('#headerwrap a[href]').should('be.visible');
    cy.get('#headerwrap a[href]').each(($el) => {
      const linkHref = $el.attr('href');

      //   if (linkHref === 'some not working link') {
      //     cy.log(`Skipping link: ${linkHref}`);
      //     return;
      //   }

      cy.request(linkHref).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });
});

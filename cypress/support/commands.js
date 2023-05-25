// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('bannerCheck', ($selector) => {
  cy.get($selector)
    .should('be.visible')
    .invoke('attr', 'href')
    .then((hrefValue) => {
      cy.get($selector).click({ force: true });
      cy.url().should('eq', hrefValue);
      cy.go('back');
    });
});

Cypress.Commands.add('specialCategory', ($selector1, $selector2) => {
  cy.get($selector1)
    .find($selector2)
    .each(($el, index) => {
      const textH3 = $el.text().replace(/ł/g, 'l').toLocaleLowerCase().replace(/ /g, '-').replace(/Ź/g, 'Z');
      if ($el.text()) {
        if (index === 0) {
          cy.get($selector1).find($selector2).eq(0).click({ force: true });
        } else if (index === 1) {
          cy.get($selector1).find($selector2).eq(1).click({ force: true });
        } else if (index === 2) {
          cy.get($selector1).find($selector2).eq(2).click({ force: true });
        } else if (index === 3) {
          cy.get($selector1).find($selector2).eq(3).click({ force: true });
        }
        cy.url().should('contains', textH3);
        cy.go('back');
      }
    });
});
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

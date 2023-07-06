// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************\

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

Cypress.Commands.add('checkLength', ($selector, options) => {
  cy.get($selector).should('be.visible').and('have.length', options);
});

Cypress.Commands.add('specialCategory', ($selector1, $selector2) => {
  cy.get($selector1)
    .find($selector2)
    .each(($el, index) => {
      const textH3 = $el
        .text()
        .replace(/ł/g, 'l')
        .replace(/ /g, '-')
        .replace(/Ź/g, 'Z')
        .replace(/ć/g, 'c')
        .toLocaleLowerCase();
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

Cypress.Commands.add('requestCheckLink', ($selector) => {
  // cy.get($selector).should('be.visible');
  cy.get($selector).each(($el) => {
    const linkHref = $el.attr('href');
    cy.request(linkHref).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});

Cypress.Commands.add('checkLinksUrlsTitles', ($selector) => {
  cy.get($selector).each(($link) => {
    cy.wrap($link).then(($link) => {
      const href = $link.attr('href');
      const linkTitle = $link.text().trim();
      cy.visit(href);
      cy.url().should('include', href);
      cy.title().should('include', linkTitle);
      cy.go('back');
    });
  });
});

Cypress.Commands.add('checkIndex', ($selector) => {
  cy.get($selector).each(($el, index, list) => {
    cy.log('Index: ' + index + ' : ' + $el.text());
  });
});

Cypress.Commands.add('checkH1', ($selector) => {
  cy.get($selector).then(($h1) => {
    const h1 = $h1.text();
    cy.get($selector).should('have.text', h1);
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

/// <reference types="cypress" />

describe('Sowe - home page - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.visit(url.contactUrl);
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it('Should verify correct url and title', () => {
    cy.url().should('eq', url.contactUrl);
    cy.title().should('eq', 'Kontakt – Sowe Curtains zasłony do salonu');
  });

  it('should check visiblity of elements, buttons, icon with number, contact form and intro txt', () => {
    cy.get('#tb_2508a3f').should('be.visible');
    cy.contains('ZADZWOŃ').should('be.visible').should('have.prop', 'href');
    cy.contains('WYŚLIJ').should('be.visible');
    cy.get('.module-icon-item').find('span').should('contain', '+48 882 461 050');
    cy.get('.tb_text_wrap').find('p').eq(0).should('contain', 'ZAPRASZAMY DO KONTAKTU');
    cy.get('.tb_text_wrap').find('p').eq(1).should('contain', 'Realizujemy niestandardowe zamówienia');
  });

  it('should fill correctly data, send the message, verify text info after send', () => {
    cy.get('[id="tb_2508a3f-contact-name"]').type('Bartosz', { force: true });
    cy.get('[id="tb_2508a3f-contact-email"]').type('bartosz@gmail.com', { force: true });
    cy.get('[id="tb_2508a3f-contact-subject"]').type('123456789', { force: true });
    cy.get('[id="tb_2508a3f-contact-message"]').type('Test2023', { force: true });
    cy.get('[id="tb_2508a3f-sendcopy"]').check();
    cy.contains('WYŚLIJ').click({ force: true });
    cy.wait(5000);
    cy.get('p.ui.light-green.contact-success').should('contain', 'Message sent. Thank you.');
  });
});

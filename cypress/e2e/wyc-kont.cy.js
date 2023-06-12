/// <reference types="cypress" />

describe('Sowe - home page - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.visit('https://www.sowe.pl/contact/');
  });

  Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false;
  });

  it('should fill correctly data, send the message, verify text info after send', () => {
    cy.get('#tb_2508a3f').should('be.visible');
    cy.get('[id="tb_2508a3f-contact-name"]').type('Bartosz', { force: true });
    cy.get('[id="tb_2508a3f-contact-email"]').type('bartosz@gmail.com', { force: true });
    cy.get('[id="tb_2508a3f-contact-subject"]').type('123456789', { force: true });
    cy.get('[id="tb_2508a3f-contact-message"]').type('Test2023', { force: true });
    cy.get('[id="tb_2508a3f-sendcopy"]').check();
    cy.contains('WYŚLIJ').click({ force: true });
    cy.wait(5000);
    cy.get('p.ui.light-green.contact-success').should('contain', 'Message sent. Thank you.');
  });

  it('should fill correctly data, send the message, verify text info after send', () => {
    // cy.get('#tb_2508a3f').should('be.visible');
    // cy.get('[id="tb_2508a3f-contact-name"]').type('Bartosz', { force: true });
    // cy.get('[id="tb_2508a3f-contact-email"]').type('bartosz@gmail.com', { force: true });
    // cy.get('[id="tb_2508a3f-contact-subject"]').type('123456789', { force: true });
    // cy.get('[id="tb_2508a3f-contact-message"]').type('Test2023', { force: true });
    // cy.get('[id="tb_2508a3f-sendcopy"]').check();
    // cy.contains('WYŚLIJ').click({ force: true });
    // cy.wait(5000);
    // cy.get('p.ui.light-green.contact-success').should('contain', 'Message sent. Thank you.');
  });
});

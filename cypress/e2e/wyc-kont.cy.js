/// <reference types="cypress" />

describe('Sowe - wyc - contac page  - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.visit(url.contactUrl);
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
    cy.wait(3000);
    cy.get('[id="tb_2508a3f-contact-subject"]').should('be.visible');
    cy.get('[id="tb_2508a3f-contact-name"]').should('be.visible');
    cy.get('[id="tb_2508a3f-contact-name"]').type('Bartadasosz', { force: true });
    // cy.wait(1000);
    cy.get('[id="tb_2508a3f-contact-email"]').should('be.visible');
    // cy.wait(1000);
    cy.get('[id="tb_2508a3f-contact-email"]').type('bartasdosz@gmail.com', { force: true });
    cy.get('[id="tb_2508a3f-sendcopy"]').check();
    // cy.wait(1000);
    cy.get('.btn.btn-primary').eq(0).scrollIntoView();
    // cy.wait(1000);
    cy.get('.btn.btn-primary').eq(0).click();
    // cy.wait(1000);
    cy.get('p.ui.light-green.contact-success').should('contain', 'Message sent. Thank you.');
  });
});

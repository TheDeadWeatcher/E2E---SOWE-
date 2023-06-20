/// <reference types="cypress" />

describe('Sowe - wyc - contac page - mobile  - E2E', () => {
  before(function () {
    cy.fixture('pagesUrl').then(function (url) {
      globalThis.url = url;
    });
  });

  beforeEach(() => {
    cy.viewport(550, 750);
    cy.visit(url.contactUrl);
  });

  it('Should verify correct url and title', () => {
    cy.url().should('eq', url.contactUrl);
    cy.title().should('eq', 'Kontakt – Sowe Curtains zasłony do salonu');
  });

  it('should check visiblity of elements, buttons, icon with number, contact form and intro txt', () => {
    cy.get('#tb_rk8r244').should('be.visible');
    cy.get('.ui.builder_button.tb_default_color').eq(1).should('be.visible').should('have.prop', 'href');
    cy.get('.btn.btn-primary').eq(1).should('be.visible');
    cy.get('.module-icon-item').find('span').should('contain', '+48 882 461 050');
    cy.get('.tb_text_wrap').find('p').eq(2).should('contain', 'ZAPRASZAMY DO KONTAKTU');
    cy.get('.tb_text_wrap').find('p').eq(3).should('contain', 'Realizujemy niestandardowe zamówienia');
  });

  it('should fill correctly data, send the message, verify text info after send', () => {
    cy.get('#tb_rk8r244-contact-name').type('Bartosz', { force: true });
    cy.get('#tb_rk8r244-contact-email').type('bartosz@gmail.com', { force: true });
    cy.get('#tb_rk8r244-contact-subject').type('123456789', { force: true });
    cy.get('#tb_rk8r244-contact-message').type('Test2023', { force: true });
    cy.get('#tb_rk8r244-sendcopy').check({ force: true });
    cy.get('.btn.btn-primary').eq(1).should('be.visible').click();
    cy.get('p.ui.light-green.contact-success').should('contain', 'Message sent. Thank you.');
  });
});

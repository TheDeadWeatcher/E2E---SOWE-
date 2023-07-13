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
    cy.requestCheckLink('#headerwrap a[href]');
  });

  it('Should click on GTtranslate and verify visibilty of popup also correct language', () => {
    cy.get('#icon-menu').contains('Polish').should('be.visible').click();
    cy.get('div.gt_languages a').should('have.length', 6);
    cy.get('.gt_languages').contains('English').should('be.visible').click();
    cy.get('#icon-menu').contains('English').should('be.visible').click();
  });

  it.only('Should click on cart, verify url, title, back to shop button', () => {
    cy.get('#cart-icon-count').click();
    cy.url().should('eq', url.cartUrl);
    cy.checkH1('.cart-empty.woocommerce-info');
    cy.get('.return-to-shop').contains('Wróć do sklepu').should('be.visible').click();
    cy.url().should('eq', url.shopUrl);
  });

  it('should search for a valid product', () => {
    const searchTerm = 'Komplet zasłon Czaple';
    cy.get('[aria-label="Search"]').eq(1).should('exist').click({ force: true });
    cy.get('form#searchform.tf_rel.tf_hide').invoke('show');
    cy.get('#s').invoke('show').type('Komplet zasłon Czaple {enter}');
    cy.get('.page-title').should('contain', searchTerm);
  });

  it('should search for a invalid product', () => {
    const searchTerm = 'robot vader';
    cy.get('[aria-label="Search"]').eq(1).should('exist').click({ force: true });
    cy.get('form#searchform.tf_rel.tf_hide').invoke('show');
    cy.get('#s').invoke('show').type('robot vader {enter}');
    cy.get('#content p').should('have.text', 'Sorry, nothing found.');
    cy.get('.page-title').should('contain', searchTerm);
  });

  it('Verify visiblity of sliders, buttons, h3, p on main slideshow', () => {
    cy.checkLength('.sp-slide-wrap', 6);
    cy.checkLength('.sp-slide-wrap h3', 6);
    cy.checkLength('.sp-slide-wrap p', 6);
    cy.requestCheckLink('a.sp-layer.bsp-slide-button');
  });

  it('Verify visiblity "wycena" section also verify visibility and correct url of button', () => {
    cy.get('[data-css_id="xuwu420"]')
      .should('be.visible')
      .contains('WYCENA')
      .should('be.visible')
      .click({ force: true });
    cy.url().should('eq', url.contactUrl);
  });

  it('Verify visiblity "Nowości" section also verify lenght, correct url of section item', () => {
    cy.get('#tb_7b96d76').find('.product_title').should('have.length', 4);
    cy.specialCategory('#tb_7b96d76', '.product_title a');
  });

  it('Verify visiblity Kategory: rzeźba, surrealizm, vintage, buttons and correct url', () => {
    cy.get('[data-css_id="05s0658"]').find('h3.module-title').should('have.length', 3);

    cy.get('[data-css_id="05s0658"]')
      .find('h3.module-title')
      .each(($el, index) => {
        const textH3 = $el.text().replace(/Ź/g, 'Z').toLocaleLowerCase();
        if ($el.text()) {
          if (index === 0) {
            cy.get('.image-pro-overlay-inner a').eq(0).click({ force: true });
          } else if (index === 1) {
            cy.get('.image-pro-overlay-inner a').eq(1).click({ force: true });
          } else if (index === 2) {
            cy.get('.image-pro-overlay-inner a').eq(2).click({ force: true });
          }
          cy.url().should('contain', textH3);
          cy.go('back');
        }
      });

    // find a method to use this command "filter"
    // cy.specialCategory('[data-css_id="05s0658"]', 'h3.module-title', '.image-pro-overlay-inner a');
  });

  it('Verify visiblity "Promocje" section also verify lenght, correct url of section item', () => {
    cy.get('#tb_7b96d76>ul>li').should('have.length', 4);
    cy.specialCategory('#tb_2y8o240', '.product_title a');
  });

  it('Should verify visibilty and correct url of 3 banners', () => {
    cy.bannerCheck('[data-css_id="f0b7677"] a');
    cy.bannerCheck('[data-css_id="aace4fc"] a');
    cy.bannerCheck('[data-css_id="91up430"] a');
  });

  it('Should verify lengh of articyle and correct url of "Blog" section', () => {
    cy.contains('Blog').should('be.visible');
    cy.checkIndex('.post-content-inner').should('have.length', 4);
    cy.specialCategory('.module.module-post.tb_b874e40 ', '.post-content-inner a');
  });
  it('Should verify lengh of articyle and correct url of "Instagram" section', () => {
    cy.contains('INSTAGRAM').should('be.visible');
    cy.get('.sbi_photo_wrap').should('have.length', 20);
    cy.get('.sbi_photo_wrap').find('a').eq(10).invoke('removeAttr', 'target').click();
    cy.origin('https://www.instagram.com', () => {
      cy.url().should('include', 'https://www.instagram.com');
      cy.go('back');
    });
    cy.url().should('eq', url.homeUrl);
    cy.contains('Load More...').should('be.visible');
    cy.get('#sbi_load a').invoke('removeAttr', 'target').eq(1).should('be.visible').click();
    cy.origin('https://www.instagram.com', () => {
      cy.url().should('include', 'https://www.instagram.com/sowe.pl/');
      cy.go('back');
    });
  });
});

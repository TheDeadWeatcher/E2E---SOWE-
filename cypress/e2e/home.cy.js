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

  // Sowe site have issue with " fb is not defined" code belowe skip this issue and test will run.

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
    cy.get('#headerwrap a[href]').should('be.visible');
    cy.get('#headerwrap a[href]').each(($el) => {
      const linkHref = $el.attr('href');

      //   if (linkHref === 'put here not working link') {
      //     cy.log(`Skipping link: ${linkHref}`);
      //     return;
      //   }

      cy.request(linkHref).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('Should click on GTtranslate and verify visibilty of popup also correct language', () => {
    cy.get('#icon-menu').contains('Polish').should('be.visible').click();
    cy.get('div.gt_languages a').should('have.length', 6);
    cy.get('.gt_languages').contains('English').should('be.visible').click();
    cy.get('#icon-menu').contains('English').should('be.visible').click();
  });

  it('Should click on cart, verify url, title, back to shop button', () => {
    cy.get('#cart-icon-count').click();
    cy.url().should('eq', url.cartUrl);
    cy.get('p.cart-empty.woocommerce-info').then(($title) => {
      const title = $title.text();
      cy.get('p.cart-empty.woocommerce-info').should('have.text', title);
    });
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

  it('Verify visiblity slider buttons and active url', () => {
    cy.get('a.sp-layer.bsp-slide-button').should('be.visible');
    cy.get('a.sp-layer.bsp-slide-button').each(($el) => {
      const linkHref = $el.attr('href');
      cy.request(linkHref).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('Verify visiblity slider buttons and active url', () => {
    cy.get('a.sp-layer.bsp-slide-button').should('be.visible');
    cy.get('a.sp-layer.bsp-slide-button').each(($el) => {
      const linkHref = $el.attr('href');
      cy.request(linkHref).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('Verify visiblity "wycena" section also verify visibility and correct url of button', () => {
    cy.get('[data-css_id="xuwu420"]')
      .should('be.visible')
      .contains('WYCENA')
      .should('be.visible')
      .click({ force: true });
    cy.url().should('eq', url.contactUrl);
  });

  it('Verify visiblity "Nowości" section also verify lenght of product', () => {
    cy.get('#tb_7b96d76>ul>li').should('have.length', 4);

    const links = [
      { label: 'Komplet zasłon Czaple', url: 'https://www.sowe.pl/produkt/komplet-zaslon-czaple/' },
      { label: 'Komplet zasłon Angels', url: 'https://www.sowe.pl/produkt/komplet-zaslon-angels/' },
      { label: 'Komplet zasłon Dream House', url: 'https://www.sowe.pl/produkt/komplet-zaslon-dream-house/' },
      { label: 'Komplet zasłon Town House', url: 'https://www.sowe.pl/produkt/komplet-zaslon-town-house/' },
    ];

    cy.get('div.product-content-inner h3 a').each((link) => {
      const linkText = link.text();
      const linkHref = link.attr('href');

      const matchingLink = links.find((l) => l.label === linkText);
      if (matchingLink) {
        cy.request(linkHref).then((response) => {
          expect(response.status).to.eq(200);
          expect(linkHref).to.equal(matchingLink.url);
        });
      }
    });
  });

  it('Verify visiblity Kategory: rzeźba, surrealizm, vintage, buttons and correct url', () => {
    cy.get('[data-css_id="05s0658"]').find('h3.module-title').should('have.length', 3);

    cy.get('.image-pro-overlay-inner a')
      .should('exist')
      .each(($el) => {
        const linkHref = $el.attr('href');
        cy.request(linkHref).then((response) => {
          expect(response.status).to.eq(200);
        });
      });

    // cy.get('.module-title').each(($el, index) => {
    //   cy.log('index: ' + index + ' : ' + $el.text());
    // });

    cy.get('.module-title').each(($el, index) => {
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
  });
});

import { beforeEach, describe } from 'mocha';

describe('Testes para página de detalhes de um produto', () => {
  beforeEach(() => {
    localStorage.clear();
    cy.visit('localhost:3000/loja');
    cy.get('div[data-testid=product-card] button:nth-of-type(2)').eq(0).click();
  });

  it('Existem os botões para manipular o carrinho', () => {
    cy.get('button[data-testid=increment-cart-btn]').should('exist');
    cy.get('button[data-testid=decrement-cart-btn]').should('exist');
  });

  it('Os botões conseguem manipular corretamente o valor no carrinho', () => {
    cy.get('span[data-testid=product-quantity-in-cart]').contains('0');
    cy.get('button[data-testid=header-cart-button]').contains('0');

    cy.get('button[data-testid=increment-cart-btn]').click();
    cy.get('button[data-testid=increment-cart-btn]').click();
    cy.get('button[data-testid=increment-cart-btn]').click();
    cy.get('button[data-testid=increment-cart-btn]').click();

    cy.get('span[data-testid=product-quantity-in-cart]').contains('4');
    cy.get('button[data-testid=header-cart-button]').contains('4');

    cy.get('button[data-testid=decrement-cart-btn]').click();
    cy.get('button[data-testid=decrement-cart-btn]').click();

    cy.get('span[data-testid=product-quantity-in-cart]').contains('2');
    cy.get('button[data-testid=header-cart-button]').contains('2');
  });
});

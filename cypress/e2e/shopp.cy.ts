import { beforeEach, describe } from 'mocha';

describe('Testes para página Loja', () => {
  beforeEach(() => {
    localStorage.clear();
    cy.visit('localhost:3000/loja');
  });

  it('Existem todos os filtros de preço solicitados', () => {
    cy.get('label[data-testid=price-filter-label]').should('have.length', 6);

    const labelTexts = [
      'Todos',
      'Até R$40',
      'R$40 a R$60',
      'R$60 a R$200',
      'R$200 a R$500',
      'Acima de R$500',
    ];

    labelTexts.forEach((text, index) => {
      cy.get('label[data-testid=price-filter-label]').eq(index).should('have.text', text);
    });
  });

  it('Aparecem apenas 10 produtos ao acessar a rota, sem filtros', () => {
    cy.get('div[data-testid=product-card]').should('have.length', 10);
  });

  it('É possível alternar entre as páginas', () => {
    cy.get('button[data-testid=previous-page-btn]').should('not.exist');
    cy.get('button[data-testid=current-page-btn]').contains('1');
    cy.get('button[data-testid=next-page-btn]').contains('2');
    cy.get('button[data-testid=next-page-btn]').click();

    cy.get('button[data-testid=previous-page-btn]').contains('1');
    cy.get('button[data-testid=current-page-btn]').contains('2');
    cy.get('button[data-testid=next-page-btn]').contains('3');
    cy.get('button[data-testid=previous-page-btn]').click();

    cy.get('button[data-testid=previous-page-btn]').should('not.exist');
    cy.get('button[data-testid=current-page-btn]').contains('1');
    cy.get('button[data-testid=next-page-btn]').contains('2');
    cy.get('button[data-testid=next-page-btn]').click();
  });

  it('É possível adicionar items ao carrinho a partir do card na tela inicial', () => {
    cy.get('button[data-testid=header-cart-button]').contains('0');

    cy.get('div[data-testid=product-card] button:nth-of-type(1)').eq(0).click();
    cy.get('div[data-testid=product-card] button:nth-of-type(1)').eq(0).click();
    cy.get('div[data-testid=product-card] button:nth-of-type(1)').eq(0).click();

    cy.get('button[data-testid=header-cart-button]').contains('3');

    cy.get('div[data-testid=product-card] button:nth-of-type(1)').eq(1).click();
    cy.get('div[data-testid=product-card] button:nth-of-type(1)').eq(2).click();
    cy.get('div[data-testid=product-card] button:nth-of-type(1)').eq(3).click();

    cy.get('button[data-testid=header-cart-button]').contains('6');
  });

  it('É possível acessar a tela de detalhes de um produto a partir da tela inicial', () => {
    cy.get('div[data-testid=product-card] button:nth-of-type(2)').eq(0).click();

    cy.get('button[data-testid=increment-cart-btn]').should('exist');
    cy.get('button[data-testid=decrement-cart-btn]').should('exist');
  });

  it('É possível filtrar os produtos por preço', () => {
    cy.get('span[data-testid=found-items]').contains('62');

    cy.get('label[data-testid=price-filter-label]').eq(0).click();
    cy.get('span[data-testid=found-items]').contains('62');

    cy.get('label[data-testid=price-filter-label]').eq(1).click();
    cy.get('span[data-testid=found-items]').contains('0');

    cy.get('label[data-testid=price-filter-label]').eq(2).click();
    cy.get('span[data-testid=found-items]').contains('0');

    cy.get('label[data-testid=price-filter-label]').eq(3).click();
    cy.get('span[data-testid=found-items]').contains('15');

    cy.get('label[data-testid=price-filter-label]').eq(4).click();
    cy.get('span[data-testid=found-items]').contains('47');

    cy.get('label[data-testid=price-filter-label]').eq(5).click();
    cy.get('span[data-testid=found-items]').contains('0');
  });

  it('É possível filtrar os produtos por nome', () => {
    cy.get('span[data-testid=found-items]').contains('62');

    cy.get('button[data-testid=header-search-button]').click();
    cy.get('input[data-testid=search-input]').type('ab');
    cy.get('button[data-testid=search-input-submit]').click();
    cy.get('span[data-testid=found-items]').contains('17');

    cy.get('button[data-testid=header-search-button]').click();
    cy.get('input[data-testid=search-input]').clear().type('bacalhôa');
    cy.get('button[data-testid=search-input-submit]').click();
    cy.get('span[data-testid=found-items]').contains('15');
  });

  it.only('É possível filtrar os produtos por preço e nome', () => {
    cy.get('span[data-testid=found-items]').contains('62');

    cy.get('button[data-testid=header-search-button]').click();
    cy.get('input[data-testid=search-input]').type('a');
    cy.get('button[data-testid=search-input-submit]').click();
    cy.get('label[data-testid=price-filter-label]').eq(3).click();
    cy.get('span[data-testid=found-items]').contains('15');

    cy.get('label[data-testid=price-filter-label]').eq(4).click();
    cy.get('span[data-testid=found-items]').contains('47');

    cy.get('button[data-testid=header-search-button]').click();
    cy.get('input[data-testid=search-input]').clear().type('b');
    cy.get('button[data-testid=search-input-submit]').click();
    cy.get('span[data-testid=found-items]').contains('32');
  });
});

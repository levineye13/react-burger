/// <reference types="cypress" />

describe('burger ingredients page display correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000');
  });

  it('should open constructor page by default', () => {
    cy.contains('Соберите бургер');
  });

  it('should open modal after click by first card', () => {
    cy.get('img[alt="Краторная булка N-200i"]').closest('article').click();
    cy.get('[class^=modal] figcaption')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('should close modal after click by button', () => {
    cy.get('[class^=modal] button').click();
    cy.get('[class^=modal]').should('not.exist');
  });
});

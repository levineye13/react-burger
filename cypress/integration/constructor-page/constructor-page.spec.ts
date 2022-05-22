/// <reference types="cypress" />

import { ApiEndpoints, HttpMethods } from '../../../src/utils/constants';

describe('constructor page should work correctly', () => {
  before(() => {
    cy.visit('http://localhost:3000/login');

    cy.get('input[type=email]').type('testtest@testtest.ru');
    cy.get('input[type=password]').type('testtest');
    cy.get('button[type=submit]').click();
  });

  it('should open constructor page by default', () => {
    cy.contains('Соберите бургер');
  });

  it('should open card modal after click by first card', () => {
    cy.get('img[alt="Краторная булка N-200i"]').closest('article').click();
    cy.get('[class^=modal] figcaption')
      .contains('Краторная булка N-200i')
      .should('exist');
  });

  it('should close card modal after click by button', () => {
    cy.get('[class^=modal] button').click().should('not.exist');
  });

  it('should not move ingredient to constructor until bun is selected', () => {
    cy.get('[class*=card]').eq(4).trigger('dragstart');
    cy.get('[class^=burger-constructor_list]')
      .trigger('drop')
      .get('[class^=burger-constructor_list]>li')
      .should('have.length', 0);
  });

  it('should move first ingredient type bun to constructor', () => {
    cy.get('[class*=card]').first().trigger('dragstart');
    cy.get('[class^=burger-constructor_list]').trigger('drop');
  });

  it('should move ingredient to constructor after selecting bun', () => {
    cy.get('[class*=card]').eq(4).trigger('dragstart');
    cy.get('[class^=burger-constructor_list]')
      .trigger('drop')
      .get('[class^=burger-constructor_list]>li')
      .should('have.length', 2);
  });

  it('should open order modal after click by create order button', () => {
    cy.intercept(HttpMethods.Post, ApiEndpoints.Orders).as('order');
    cy.get('button').contains('Оформить заказ').click();
    cy.get('[class^=modal]').should('exist');
  });

  it('should close order modal after click by button', () => {
    cy.get('button[class^=modal_button]').click();
    cy.get('dialog[class^=modal]').should('not.exist');
  });
});

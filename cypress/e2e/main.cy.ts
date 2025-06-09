/// <reference types="cypress" />

describe('메인 페이지', () => {
  it('메인 화면에 접속한다.', () => {
    cy.visit('/');
  });
});

describe('FinancialForm Component', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('accepts input', () => {
    const amount = '50';
    const category = 'Food';

    cy.get('#amount')
      .type(amount)
      .should('have.value', amount);
    cy.get('#category')
      .type(category)
      .should('have.value', category);
  });

  context('Form submission', () => {
    it('Adds a new financial card data', () => {
      let amount = '50';
      const category = 'Food';
      let today = new Date().toLocaleString().split(',')[0];

      cy.get('#amount')
        .type(amount)
        .should('have.value', amount);
      cy.get('#category')
        .type(category)
        .should('have.value', category);

      cy.get('#financial-btn').click();
      cy.get('#amount').should('have.value', '');
      cy.get('#category').should('have.value', '');

      cy.get("[data-test='amount']").should('contain', amount);
      cy.get("[data-test='category']").should('contain', category);
      cy.get("[data-test='date']").should('contain', today);
    });
  });
})
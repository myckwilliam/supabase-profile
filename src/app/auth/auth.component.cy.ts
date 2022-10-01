import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  beforeEach(() => cy.mount(AuthComponent));

  it('should change alt option text', () => {
    cy.get('#altOption').click();
    cy.get('#altOption').should('have.text', ' Sign in ');
  });
});

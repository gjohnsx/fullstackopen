describe('Blog App', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Greg Johns',
      username: 'gjohnsx', 
      password: 'fullstack'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user);
    cy.visit('http://localhost:3002/');
  });
  
  it('Login form is shown', function() {
    cy.get('#username');
    cy.get('#password');
  });

  describe('Login...', function() {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('gjohnsx');
      cy.get('#password').type('fullstack');
      cy.get('#button-login').click();
  
      cy.contains('Greg Johns logged in');
    });
    
    it('fails with invalid credentials', () => {
      cy.get('#username').type('gjohnsx');
      cy.get('#password').type('password');
      cy.get('#button-login').click();
    
      cy.get('.notification')
        .should('contain', 'wrong username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid');
    });
  });

  // describe('When logged in', function() {

  // })

});
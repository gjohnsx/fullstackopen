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
    cy.get('#login');
    cy.get('#password');
  });

  it('A user can log in', () => {
    cy.get('#username').type('gjohnsx');
    cy.get('#password').type('fullstack');
    cy.get('#button-login').click();

    cy.contains('Greg Johns logged in');
  });
  
  it.only('Login fails with invalid username or password', () => {
    cy.get('#username').type('gjohnsx');
    cy.get('#password').type('password');
    cy.get('#button-login').click();
  
    cy.contains('wrong username or password');
  })

  describe('When logged in', function() {

  })

});
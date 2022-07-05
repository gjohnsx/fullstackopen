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

  describe.only('When logged in...', function() {
    beforeEach(function() {
      cy.get('#username').type('gjohnsx');
      cy.get('#password').type('fullstack');
      cy.get('#button-login').click();
      cy.contains('Greg Johns logged in');
    });

    it('A blog can be created', function() {
      cy.get('button').contains('add new blog').click();
      cy.get('#blog-title').type('Test Blog from Cypress');
      cy.get('#blog-author').type('Robo Cypress');
      cy.get('#blog-url').type('www.cypress.io');
      cy.get('.create-new-blog--btn').click();

      cy.get('.notification')
        .should('contain', 'a new blog \'Test Blog from Cypress\' by Robo Cypress added.')
        .and('have.css', 'color', 'rgb(0, 128, 0)');

      cy.get('h3').contains('Test Blog from Cypress');
    });
    
    it.only('A user can like a blog', function() {
      cy.get('button').contains('add new blog').click();
      cy.get('#blog-title').type('Test Blog from Cypress');
      cy.get('#blog-author').type('Robo Cypress');
      cy.get('#blog-url').type('www.cypress.io');
      cy.get('.create-new-blog--btn').click();
  
      cy.get('.notification')
        .should('contain', 'a new blog \'Test Blog from Cypress\' by Robo Cypress added.')
        .and('have.css', 'color', 'rgb(0, 128, 0)');
  
      cy.get('.blog--btn-display').click();

      cy.get('.blog--btn-like').click();
      cy.get('.blog--likes').contains('Likes: 1');
      cy.get('.blog--btn-like').click();
      cy.get('.blog--likes').contains('Likes: 2');
    });
  })

});
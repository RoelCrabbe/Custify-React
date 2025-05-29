/// <reference types="cypress" />
import './commands';

after(() => {
    cy.cleanupAfterTests();
});

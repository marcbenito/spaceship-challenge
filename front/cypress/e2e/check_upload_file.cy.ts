// https://docs.cypress.io/api/introduction/api.html
import 'cypress-file-upload';
describe('Test upload file', () => {
    it('valid hunter file', () => {
        cy.visit('/');
        cy.get('.terminal_emulator').contains('Please upload the file');
        cy.get('.button-upload').attachFile('../../../back/test/hunter-ok.json');
        cy.get('.button-start').click();
        cy.get('.terminal_emulator').contains('The odds are');
    });
    it('invalid hunter file', () => {
        cy.visit('/');
        cy.get('.terminal_emulator').contains('Please upload the file');
        cy.get('.button-upload').attachFile('../../../back/test/hunter-miss.json');
        cy.get('.button-start').click();
        cy.get('.terminal_emulator').contains('Error');
    });
});

/* 
    Atividade: Fazer o logout com a minha conta do gitlab.

    1 - criei a suite de teste describe (logout) usando uma arrow function
    2 - Para fazer o logout, eu devo estar logado, correto? Sim! Para isso, eu criei
    uma funcao arrow function beforeEach que é a pre-condição para o logout. 
    Então passei dentro do corpo da função o metodo cy.login().
    Metodo customizado do cypress criado anteriormente que ja realiza o login.
    3 - Com o beforeEach configurado no codigo, o login ja sera realizado, certo?
    4 - Então com isso, criei o caso de teste do "logout com sucesso" e fui criar a logica do logout
    no meu file gui_commands, acesse a pasta support/gui_commands que o resto dos passos estará la.
*/

describe('Logout', () => {

    beforeEach(() => {
        cy.login();
    })
    it('logout successfully', () => {
        cy.logout();

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/users/sign_in`)
    })
})
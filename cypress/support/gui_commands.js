/* 
    4 - Aqui eu criei comando personalizado chamado de 'login', 
    onde sera chamado no meu caso de teste.
    5 - Dentro do mesmo comando ainda, criei duas variaveis parametrizadas dentro da funcão arrow
    que recebe o usuario e o password
    6 - Esses valores armazenados em user e password, vieram da minha env.json
    7 - logo apos isso, criei uma arrow function vazia
    8 - diante disso, comecei as validações no login, como:
    9 - acessar a url, preencher o campo usuario (passando no type o argumento user), preencher a 
    senha (passando no type o argumento password) e clicando no botao de logar
    10 - e chamei a função novamente login(); para ser executada
    11 - então no login.cy.js chamei esse comando personalizado 'login' dentro do meu caso de teste
    como: cy.login();
*/
Cypress.Commands.add('login', (
    user = Cypress.env('user_name'),
    password = Cypress.env('user_password'),
) => {
    const login = () => {
        cy.visit('/users/sign_in')

        cy.get("[data-qa-selector='login_field']").type(user)
        cy.get("[data-qa-selector='password_field']").type(password)
        cy.get("[data-qa-selector='sign_in_button']").click()
    }

    login();
})


/* 
    5 - Aqui, foi criado o comando personalizado do cypress 'logout'
    6 - Nele o metodo add() recebe apenas o logout como valor e nenhum outro paremtro é acrescentado
    7 - Esse comando personalizado tbm é uma arrow function
    8 - Dentro desse comando personalizado do logout, declarei uma funcao anonima logout que recebe
    os passos do caso de teste.
    9 - logo em seguida executei a função passando logout(); 
*/

Cypress.Commands.add('logout', () => {
    const logout = () => {
        cy.get("[data-testid='user_avatar_content']").click()
        cy.contains('Sign out').click()
    }

    logout();
}) 
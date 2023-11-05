/* 
    Neste projeto foi realizado a validação de criação de projeto

    1 - Como sempre, crio a suite de teste describe
    2 - Da mesma forma do logout, para realizar a validação desse caso de teste, é necessário
    que o login seja realizado. Para isso, antes do caso de teste, é realizado a função
    beforeEach com callback para o comando personalizado login.
    3 - Então foi feito o caso de teste (it)
    4 - Dentro do caso de teste, foi criado um objeto chamado project que possui uma propriedade
    de name, onde essa prop cria um tipo de dado fake e aleatorio para ser inserido dentro do 
    input (Name project) na aplicação
    Obs.: Note-se que eu importei a biblioteca faker, a mesma foi instalada no começo da configuração
    do projeto.
    5 - Então criei o comando personalizado dentro do it (cy.gui_Project((project()), que recebe
    como argumento o objeto project criado.
    Vá para o arquivo gui_commands para acompanhar o resto do fluxo.

    9 - Voltando aqui, repare que após a validação do estado do teste, é feito a verificação.
    A verificação foi feita pela url, para isso usei o metodo do cypress url(), que deve ser igual 
    a mesma que passamos na config do cypress (localhost), com o meu user name no cypress env (root) e
    o nome do projeto (o mesmo que foi criado dentro do objeto "project").
    10 - Logo depois a verifição que o nome do projeto deve ser visivel na url.
*/

import { faker } from '@faker-js/faker'; // lib que gera dados aleatorios para testes

describe('Create Project', () => {
    beforeEach(() => {
        cy.login();
    })

    it('successfully', () => {

        const project = {
            name: `project-${faker.datatype.uuid()}`, // prop name gera um id aleatorio do faker 
        }

        cy.gui_createProject(project)

        cy.url().should('be.equal', `${Cypress.config('baseUrl')}/${Cypress.env('user_name')}/${project.name}`)
        cy.contains(project.name).should('be.visible')
    })
})
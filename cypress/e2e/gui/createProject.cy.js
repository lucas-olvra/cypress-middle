import { faker } from '@faker-js/faker'; // lib que gera dados aleatorios para testes

describe('Create Project', () => {
    beforeEach(() => {
        cy.login();
    })
})

it('successfully', () => {
    const project = {
        name: `project-${faker.datatype.uuid()}`,
        description: faker.random.words(5),
    }

    cy.gui_createProject(project)
})
/* 
    O que foi feito:
    1 - eu criei uma suite de teste (describe)
    2 - criei o caso de teste (it)
    3 - e chamei a função login() criada em gui_commands na pasta de support.
    Acesse la para entender o resto!
    12 - e então coloquei a verificação do teste dentro do caso de teste.
*/

describe('Login', () => {
    it('successfully', () => {
      cy.login()
  
      cy.get("[data-testid='user_avatar_content']").should('be.visible')
    })
  })
  
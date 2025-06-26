Cypress.Commands.add('agregarTarea', (tarea) => {
  cy.get('input[data-cy="input-new-todo"]').type(tarea)
  cy.get('button[data-cy="btn-add-todo"]').click()
})

Cypress.Commands.add('eliminarTarea', (texto) => {
  cy.contains('li', texto)
    .find('button[type="button"]')
    .click()
})

Cypress.Commands.add('agregarTareas2', (tarea) => {
  cy.get('.new-todo').type(`${tarea}{enter}`)
})

Cypress.Commands.add('completarTarea', (tarea) => {
  cy.contains('li', tarea) // 🔍 Busca por texto
      .find('.toggle') // Encuentra el checkbox dentro del <li>
      .click()         // Simula el clic
      .should('be.checked') // Verifica que esté tildado
})
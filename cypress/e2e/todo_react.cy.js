describe('Practicando lo basico', () => {
  // Utilizo beforeEach para visitar la pagina antes de cada prueba
  // Esto evita repetir el código de visita en cada prueba
  beforeEach(() => {
    cy.visit('https://todo-cypress.vercel.app/')
  })

  it('Visitar pagina y verificar titulo', () => {
    cy.title().should('eq', 'Todo App')
  })

  it('Agregar una tarea', () => {
    // Se crea un comando personalizado en cypress/support/commands.js
    // para agregar una tarea, de esta forma no es necesario repetir el código
    cy.agregarTarea('Aprender Cypress')
    
    cy.get('ul[data-cy="todo-list"] li').should('contain', 'Aprender Cypress')    
  })

  it('Agrega varias tareas y elimina una en específico', () => {
    cy.agregarTarea('Repasar Cypress')
    cy.agregarTarea('Empezar con lo basico')
    cy.agregarTarea('Aprender a eliminar tareas')
    cy.agregarTarea('Eliminar tarea')

    cy.get('ul[data-cy="todo-list"] li').should('contain', 'Eliminar tarea')
    cy.eliminarTarea('Eliminar tarea')
    cy.get('ul[data-cy="todo-list"] li').should('not.contain', 'Eliminar tarea')
    cy.get('ul[data-cy="todo-list"] li').should('have.length', 3) // Verifica que queden 3 tareas
  })

  it('Agregar múltiples tareas desde un array', () => {
  const tareas = [
    'Aprender Cypress',
    'Practicar comandos',
    'Eliminar tareas',
    'Probar filtros'
  ]

  tareas.forEach((tarea) => {
    cy.agregarTarea(tarea)
  })

  // Verificamos que se agregaron todas
  cy.get('ul[data-cy="todo-list"] li').should('have.length', tareas.length)

  // También podrías verificar que cada una esté presente
  tareas.forEach((tarea) => {
    cy.contains('ul[data-cy="todo-list"] li', tarea).should('exist')
  })
})
})
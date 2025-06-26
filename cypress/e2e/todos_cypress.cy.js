describe('Practicando lo basico', () => {
  // Utilizo beforeEach para visitar la pagina antes de cada prueba
  // Esto evita repetir el código de visita en cada prueba
  beforeEach(() => {
    cy.visit('https://example.cypress.io/todo')
  })

  it('Visitar pagina y verificar titulo', () => {
    cy.title().should('eq', 'Cypress.io: Kitchen Sink')
  })

  it('Agregar mas de una tarea', () => {
    const tareas = [
      'Aprender Cypress',
      'Segunda tarea',
      'Tercera tarea',
      'Cuarta tarea'
    ]

    // Se crea un comando personalizado en cypress/support/commands.js
    // para agregar una tarea, de esta forma no es necesario repetir el código
    tareas.forEach(tarea => {
      cy.agregarTareas2(tarea) 
    })

    // Verificamos que se agregaron todas
    cy.get('.todo-list li label').then($labels => {
      const textos = [...$labels].map(el => el.innerText.trim())
      tareas.forEach(tarea => {
        expect(textos).to.include(tarea)
      })
    }) 

    // También podrías verificar que cada una esté presente
    // cy.get('div[class="view"] label').should('contain', 'Aprender Cypress')
  })

  it('Marca una tarea como completada', () => {
    cy.agregarTareas2('Tarea a completar')

    cy.completarTarea('Tarea a completar') // Utiliza el comando personalizado para completar la tarea

    cy.contains('li', 'Tarea a completar')
      .should('have.class', 'completed') // Verifica que el <li> tenga la clase que indica "tarea completada"
  })

  it('Filtrar tareas completadas', () => {
    cy.agregarTareas2('Tarea Finalizada 1')
    cy.agregarTareas2('Tarea sin completar')
    cy.agregarTareas2('Tarea sin completar')
    cy.agregarTareas2('Tarea finalizada 2')

    cy.completarTarea('Tarea Finalizada 1')
    cy.completarTarea('Tarea finalizada 2')

    cy.get('a[href="#/completed"]').click() // Filtra por tareas completadas

    // Verifica que solo las tareas completadas estén visibles
    cy.get('.todo-list li').should('have.length', 2)
    cy.get('.todo-list li').each($li => {
      cy.wrap($li).should('have.class', 'completed')
    })
  })

  it('Filtrar tareas no completadas', () => {
    cy.agregarTareas2('Tarea Finalizada 1')
    cy.agregarTareas2('Tarea sin completar')
    cy.agregarTareas2('Tarea sin completar')
    cy.agregarTareas2('Tarea finalizada 2')

    cy.completarTarea('Tarea Finalizada 1')
    cy.completarTarea('Tarea finalizada 2')

    cy.get('a[href="#/active"]').click() // Filtra por tareas activas (no completadas)

    // Verifica que solo las tareas no completadas estén visibles
    cy.get('.todo-list li').should('have.length', 4)
    cy.get('.todo-list li').each($li => {
      cy.wrap($li).should('have.class', '')
    })
  })

  it('Eliminar tareas completadas', () => {
    cy.agregarTareas2('Tarea Finalizada 1')
    cy.agregarTareas2('Tarea sin completar')
    cy.agregarTareas2('Tarea sin completar')
    cy.agregarTareas2('Tarea finalizada 2')

    cy.completarTarea('Tarea Finalizada 1')
    cy.completarTarea('Tarea finalizada 2')

    cy.get('button[class="todo-button clear-completed"]').click() // Filtra por tareas activas (no completadas)

    cy.get('.todo-list li').should('not.contain.text', 'Tarea Finalizada 1')
    cy.get('.todo-list li').should('not.contain.text', 'Tarea finalizada 2')
  })

  it('Verificar que el contador de tareas pendientes se actualiza', () => {
    cy.get('.new-todo').type('Tarea 1{enter}')
    cy.get('.new-todo').type('Tarea 2{enter}')
    cy.get('.todo-count').should('contain.text', '4 items left')

    cy.contains('li', 'Tarea 1').find('.toggle').click()
    cy.get('.todo-count').should('contain.text', '3 items left')
  })
})
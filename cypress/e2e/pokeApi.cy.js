describe('Pruebas de la PokeAPI', () => {
  it('Consulta un Pokémon y verifica su tipo', () => {
    cy.request('https://pokeapi.co/api/v2/pokemon/pikachu')
      .its('body.types[0].type.name')
      .should('eq', 'electric')
  })

  it('Debe devolver error al buscar un Pokémon inválido', () => {
    cy.request({
      url: 'https://pokeapi.co/api/v2/pokemon/pikachuuu', // mal escrito
      failOnStatusCode: false
    }).then((response) => {
      expect(response.status).to.eq(404)
    })
  })

  const pokemones = ['bulbasaur', 'charmander', 'squirtle']

  pokemones.forEach(pokemon => {
    it(`Debe devolver los datos de ${pokemon}`, () => {
      cy.request(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        .its('status').should('eq', 200)
    })
  })

  it('Debe devolver 20 pokemones por defecto en la primera página', () => {
    cy.request('https://pokeapi.co/api/v2/pokemon')
      .its('body.results').should('have.length', 20)
  })

  it('Debe verificar que el tipo "fire" existe y tiene al menos 1 Pokémon', () => {
    cy.request('https://pokeapi.co/api/v2/type/fire')
      .should((response) => {
        expect(response.status).to.eq(200)
        expect(response.body.pokemon.length).to.be.greaterThan(0)
      })
  })
})
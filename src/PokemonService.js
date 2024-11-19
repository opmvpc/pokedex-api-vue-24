class PokemonService {
  #CACHE_KEY = 'pokemons-cache'
  #CACHE_DURATION = 24 * 60 * 60 * 1000 // 24h en millisecondes

  async getPokemons() {
    const cached = this.#getFromCache()
    if (cached) return cached

    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151')
      const { results } = await response.json()

      const pokemons = await Promise.all(
        results.map(async pokemon => {
          const details = await fetch(pokemon.url)
          const fullData = await details.json()

          // On garde la même structure que getPokemonDetails
          return {
            id: fullData.id,
            name: fullData.name,
            types: fullData.types,
            sprites: {
              default: {
                front: fullData.sprites.front_default,
                back: fullData.sprites.back_default,
                front_shiny: fullData.sprites.front_shiny,
                back_shiny: fullData.sprites.back_shiny
              },
              official_artwork: {
                default: fullData.sprites.other['official-artwork'].front_default,
                shiny: fullData.sprites.other['official-artwork'].front_shiny
              }
            }
          }
        })
      )

      this.#saveToCache(pokemons)
      return pokemons
    } catch (error) {
      console.error("Team Rocket a encore frappé !", error)
      throw error
    }
  }

  #getFromCache() {
    const cached = localStorage.getItem(this.#CACHE_KEY)
    if (!cached) return null

    const { timestamp, data } = JSON.parse(cached)
    const isExpired = Date.now() - timestamp > this.#CACHE_DURATION

    if (isExpired) {
      localStorage.removeItem(this.#CACHE_KEY)
      return null
    }

    return data
  }

  #saveToCache(data) {
    const cacheData = {
      timestamp: Date.now(),
      data
    }
    localStorage.setItem(this.#CACHE_KEY, JSON.stringify(cacheData))
  }

  async getPokemonDetails(id) {
    const cacheKey = `pokemon-details-${id}`
    const cached = localStorage.getItem(cacheKey)

    if (cached) {
      const { timestamp, data } = JSON.parse(cached)
      if (Date.now() - timestamp < this.#CACHE_DURATION) {
        return data
      }
      localStorage.removeItem(cacheKey)
    }

    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const fullData = await response.json()

    // On récupère TOUTES les images, parce qu'on est des collectionneurs ! (｀∀´)Ψ
    const sprites = {
      default: {
        front: fullData.sprites.front_default,
        back: fullData.sprites.back_default,
        front_shiny: fullData.sprites.front_shiny,
        back_shiny: fullData.sprites.back_shiny,
        front_female: fullData.sprites.front_female,
        back_female: fullData.sprites.back_female,
        front_shiny_female: fullData.sprites.front_shiny_female,
        back_shiny_female: fullData.sprites.back_shiny_female,
      },
      official_artwork: {
        default: fullData.sprites.other['official-artwork'].front_default,
        shiny: fullData.sprites.other['official-artwork'].front_shiny
      },
      home: {
        default: fullData.sprites.other.home.front_default,
        shiny: fullData.sprites.other.home.front_shiny,
        female: fullData.sprites.other.home.front_female,
        shiny_female: fullData.sprites.other.home.front_shiny_female
      },
      dream_world: {
        default: fullData.sprites.other.dream_world.front_default
      }
    }

    const data = {
      id: fullData.id,
      name: fullData.name,
      types: fullData.types,
      stats: fullData.stats,
      height: fullData.height / 10,
      weight: fullData.weight / 10,
      abilities: fullData.abilities,
      sprites
    }

    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data
    }))

    return data
  }
}

export default new PokemonService()

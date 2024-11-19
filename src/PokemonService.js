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

          // On ne garde que les données essentielles
          return {
            id: fullData.id,
            name: fullData.name,
            types: fullData.types,
            sprites: {
              front_default: fullData.sprites.front_default,
              official_artwork: fullData.sprites.other['official-artwork']?.front_default
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
    const data = await response.json()

    localStorage.setItem(cacheKey, JSON.stringify({
      timestamp: Date.now(),
      data
    }))

    return data
  }
}

export default new PokemonService()

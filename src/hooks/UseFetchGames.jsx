import { useEffect, useState } from 'react'

export default function UseFetchGames(query, currentPage = 1, pageSize = 20) {
	const [games, setGames] = useState([])
	const [isLoading, setIsLoading] = useState(false)
	const [totalGamesCount, setTotalGamesCount] = useState(0)
	const [error, setError] = useState(null)

	useEffect(() => {
		async function fetchGames() {
			const apiKey = import.meta.env.VITE_RAWG_API_KEY
			const apiUrl = query
				? `https://api.rawg.io/api/games?search=${query}&search_exact=true&ordering=-rating&key=${apiKey}&page=${currentPage}&page_size=${pageSize}`
				: `https://api.rawg.io/api/games?ordering=-rating-released&key=${apiKey}&page=${currentPage}&page_size=${pageSize}`

			try {
				setIsLoading(true)
				setError(null)
				const response = await fetch(apiUrl)
				if (!response.ok) {
					throw new Error(`response status: ${response.status}`)
				}

				const gameData = await response.json()
				   
				
				setGames(gameData.results)

				setTotalGamesCount(gameData.count)
			} catch (error) {
				console.error('Game list fetch error:', error)
				setError(error.message)
			} finally {
				setIsLoading(false)
			}
		}
		fetchGames()
	}, [query, currentPage, pageSize])

	return { games, isLoading, totalGamesCount, error }
}



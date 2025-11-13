import { useEffect,useState } from "react";

export default function UseFetchGameDetails(gameId) {
    const [game, setGame] = useState(null)
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const apiKey = import.meta.env.VITE_RAWG_API_KEY
    const baseUrl = 'https://api.rawg.io/api/games';

    useEffect(() => {
       
        if (!gameId) {
            setError(new Error('Game ID is missing. Cannot fetch details'))
            setGame(null)
            return
        }

        async function fetchGameDetails() {
            setIsLoading(true)
            setError(null)

            const apiUrl = `${baseUrl}/${gameId}?key=${apiKey}`

            try {
                const response = await fetch(apiUrl)

                if (!response.ok) {
                    throw new Error(`Failed to fetch game details (Status: ${response.status})`)
                }

                const gameData = await response.json()
                setGame(gameData)
            } catch (error) {
                console.error("Game Details Fetch Error:", error);
                setError(error);
            } finally {
                setIsLoading(false)
            }
        }
        fetchGameDetails()
    },[gameId])
    return {game,isLoading,error}
}
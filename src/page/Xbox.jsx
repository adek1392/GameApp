import GamesCards from "../components/GamesCards"

export default function Xbox() {
    const apiUrl = 'https://api.rawg.io/api/games?parent_platforms=3&ordering=-rating'
    return (
<GamesCards title='Xbox games in our store' apiUrl={apiUrl}/>
    )
}
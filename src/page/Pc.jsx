import GamesCards from "../components/GamesCards";

export default function Pc() {
     const apiUrl = 'https://api.rawg.io/api/games?parent_platforms=1&ordering=-rating'
    return (
        <GamesCards apiUrl={apiUrl}/>
    )
}
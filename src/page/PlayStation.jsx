import GamesCards from "../components/GamesCards";

export default function PlayStation() {
 const apiUrl = 'https://api.rawg.io/api/games?parent_platforms=2&ordering=-dates'
    return <GamesCards title='Playstation games in our store' apiUrl={apiUrl}/>
}

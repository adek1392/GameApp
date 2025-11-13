import { useState } from 'react'
import GamesCards from '../components/GamesCards'


export default function Home() {
	const [query, setQuery] = useState('')
	const [searchTerm, setSearchTerm] = useState('')

	function handleSubmit(e) {
		e.preventDefault()
		setQuery(searchTerm.trim())
		setSearchTerm('')
	}

	function handleChangeTerm(e) {
		setSearchTerm(e.target.value)
	}

	const title = query ? `Search results for: ${query}` : 'Top Rated Games'

	return (
		<>
			<header className='headerBox'>
				<div className='headerText'>
					<h1>Discover Your Next Favorite Game</h1>
					<p>Browse and explore thousands of games powered by RAWG API.</p>
				</div>

				<form onSubmit={handleSubmit} className='formBox'>
					<input
						id='search'
						className='formControl inputSearch'
						type='text'
						value={searchTerm}
						onChange={handleChangeTerm}
						placeholder='Search for a game'
						aria-label='Search for a game'
					/>

					<button className='formControl formBtn' type='submit'>
						Search
					</button>
				</form>
			</header>

		

			<GamesCards title={title} query={query} />
			
		</>
	)
}

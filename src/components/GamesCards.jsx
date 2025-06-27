import { useEffect, useState } from 'react'

export default function GamesCards({ title, apiUrl }) {
	const [games, setGames] = useState([])
	const [currentSlides, setCurrentSlides] = useState({})

	async function fetchGames() {
		const apiKey = import.meta.env.VITE_RAWG_API_KEY
		const url = `${apiUrl}&key=${apiKey}`

		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error(`response status: ${response.status}`)
			}

			const gameData = await response.json()
			console.log(gameData)

			const gamePrice = gameData.results.map(game => ({
				...game,
				price: (Math.random() * (100 - 10) + 10).toFixed(2),
			}))
			setGames(gamePrice)
		} catch (error) {
			console.error(error.message)
		}
	}

	useEffect(() => {
		fetchGames()
	}, [apiUrl])

	function handleDotClick(gameId, index) {
		setCurrentSlides(prev => ({
			...prev,
			[gameId]: index,
		}))
	}

	return (
		<>
            <h2>{title }</h2>
			<div className='gameCartWrapper'>
				<ul className='gameCartBox'>
					{games.map(game => {
						const screenshots = game.short_screenshots || []
						const currentIndex = currentSlides[game.id] || 0

						return (
							<li key={game.id} className='gameCart'>
								<div className='carousel'>
									<div className='carouselTrackContainer'>
										{screenshots.length > 0 && (
											<img
												src={screenshots[currentIndex]?.image}
												alt={`Screenshot of ${game.name}`}
												className='carouselSlide'
											/>
										)}
										<div className='carouselNav'>
											{screenshots.map((_, index) => (
												<button
													key={index}
													onClick={() => handleDotClick(game.id, index)}
													onMouseEnter={() => handleDotClick(game.id, index)}
													className={`carouselIndicator ${currentIndex === index ? 'active' : ''}`}></button>
											))}
										</div>
									</div>
								</div>

                                <div className='gameContent'>
                                    
									<h4 className='gameName'>{game.name}</h4>

									<p className='gamePrice'>{game.price}$</p>

									<div className='gameButtons'>
										<button>See details</button>
										<button>Buy</button>
									</div>
								</div>
							</li>
						)
					})}
				</ul>
			</div>
		</>
	)
}

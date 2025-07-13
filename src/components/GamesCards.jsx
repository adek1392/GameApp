import { useEffect, useState } from 'react'
import { useCart } from '../store/CartContext'

export default function GamesCards({ title, apiUrl }) {
	const [games, setGames] = useState([])
	const [currentSlides, setCurrentSlides] = useState({})

	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize] = useState(40)
	const [totalGamesCount, setTotalGamesCount] = useState(0)

	const { addToCart } = useCart()

	async function fetchGames() {
		const apiKey = import.meta.env.VITE_RAWG_API_KEY
		const url = `${apiUrl}&key=${apiKey}&page=${currentPage}&page_size=${pageSize}`

		try {
			const response = await fetch(url)
			if (!response.ok) {
				throw new Error(`response status: ${response.status}`)
			}

			const gameData = await response.json()
			console.log(gameData)

			setTotalGamesCount(gameData.count)

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
	}, [apiUrl, currentPage, pageSize])

	function handleDotClick(gameId, index) {
		setCurrentSlides(prev => ({
			...prev,
			[gameId]: index,
		}))
	}

	function handleBuyClick(game) {
		addToCart(game)
	}

	const totalPages = Math.ceil(totalGamesCount / pageSize)

	const handlePageChange = pageNumber => {
		if (pageNumber >= 1 && pageNumber <= totalPages) {
			setCurrentPage(pageNumber)
			window.scrollTo({ top: 0 })
		}
	}

	return (
		<>
			<h2 className='headerTitle'>{title}</h2>
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
										<button onClick={() => handleBuyClick(game)}>Buy</button>
									</div>
								</div>
							</li>
						)
					})}
				</ul>
			<div className='paginationControls'>
				<button className='paginationBtn' onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
					Previous
				</button>
				<p className='pageInfo'>
					Page {currentPage} of {totalPages}
				</p>
				<button
					className='paginationBtn'
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages || totalPages === 0}>
					Next
				</button>
			</div>
			</div>

		</>
	)
}

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UseFetchGames from '../hooks/useFetchGames'

export default function GamesCards({ title, query }) {
	const [currentPage, setCurrentPage] = useState(1)
	const [pageSize] = useState(20)
	const navigate = useNavigate()

	const { games, isLoading, totalGamesCount, error } = UseFetchGames(query, currentPage, pageSize)
	const [currentSlides, setCurrentSlides] = useState({})

	function handleDotClick(gameId, index) {
		setCurrentSlides(prev => ({
			...prev,
			[gameId]: index,
		}))
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
			{isLoading && <p className='load'>Loading games...</p>}
			{error && <p className='error'>Error: {error}</p>}
			{!isLoading && !error && games.length === 0 && (
				<p className='noResults'>{query ? `Oops! No results found for "${query}" ` : 'No games found.'}</p>
			)}
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
												fetchPriority='high'
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
									<div className='gameButtons'>
										<button onClick={() => navigate(`/game/${game.id}`)}>See details</button>
									</div>
								</div>
							</li>
						)
					})}
				</ul>
				<div className='paginationControls'>
					<button
						className='paginationBtn'
						onClick={() => handlePageChange(currentPage - 1)}
						disabled={currentPage === 1}>
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

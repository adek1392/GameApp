import { useParams,useNavigate } from 'react-router-dom'
import UseFetchGameDetails from '../hooks/UseFetchGameDetails'
import emptyScreen from '../assets/img/emptyScreen.jpg'


export default function GameDetails() {
	const { id } = useParams()
	const navigate = useNavigate()
	

	const { game, isLoading, error } = UseFetchGameDetails(id)

	if (isLoading) {
		return <p className='detailsStatus'>Loading game details...</p>
	}

	if (error) {
		return <p className='detailsStatus'>Error loading game: {error.message}</p>
	}

	if (!game) {
		return <p className='detailsStatus'>Game not found or ID is invalid.</p>
	}
	function getRatingClass(rating) {
		if (rating >= 4.0) {
			return 'rateGreen'
		} else if (rating >= 3.0) {
			return 'rateYellow'
		} else {
			return 'rateRed'
		}
	}

	function handleClickBack() {
		navigate('/')
	}


	return (
		<>
			<div className='sectionWrapper'>
				<section className='gameDetalisSection'>
					<div className='firstBlock'>
						<h2 className='title'>{game.name}</h2>
						<div className='gameCoverBox'>
							<img className='gameCover' src={game.background_image || emptyScreen} alt={game.name} loading='lazy' />
						</div>

						<div className='basicInfo'>
							<div className='ageInfo'>
								<p>Age:</p>
								<p>{game.esrb_rating ? game.esrb_rating.name : null}</p>
							</div>

							<div className='raitingInfo'>
								<p>Raiting:</p>
								<p>
									{' '}
									<span className={getRatingClass(game.rating)}>{game.rating.toFixed(1)}</span> /{game.rating_top}
								</p>
							</div>
						</div>
					</div>

					<div className='secondBlock'>
						<h2 className='title'>About</h2>
						<div className='descriptionBox' dangerouslySetInnerHTML={{ __html: game.description }} />

						<div className='metaDetails'>
							<ul className='platformsBox'>
								<p className='metaTitle'>Platforms:</p>
								{game.platforms.map(item => (
									<li key={item.platform.id} className='platformsList'>
										{item.platform.name}
									</li>
								))}
							</ul>
							<div className='relaseDate'>
								<p className='metaTitle'>Relase date:</p>
								<p>{game.released}</p>
							</div>
						</div>
					<button className='backBtn' onClick={handleClickBack}> Back</button>
					</div>
				</section>
			</div>
		</>
	)
}

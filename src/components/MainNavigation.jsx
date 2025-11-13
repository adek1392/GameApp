import { useNavigate } from "react-router-dom"

export default function MainNavigation() {
	const navigate = useNavigate()

	function handleClickBack() {
		navigate('/')
	}
	return (
		<div className='menuBox' onClick={handleClickBack}>
			<p className="brandName">GameLibrary</p>
		</div>
	)
}

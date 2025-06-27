import { NavLink } from 'react-router-dom'
import { useState } from 'react'

export default function MainNavigation() {
	const [isMenuOpen, setIsMenuOpen] = useState(false)

	function toggleMenu() {
		setIsMenuOpen(prev => !prev)
	}

	function closeMenu() {
		setIsMenuOpen(false)
	}
	return (
		<div className='menuBox'>
			<header className='shopTitle'>
				<h1>GameShop</h1>
			</header>

			<div className={`navBox ${isMenuOpen ? 'navActive' : ''}`}>
				<nav className='mainNavLinks'>
					<NavLink to='/' onClick={closeMenu} className={({isActive})=> isActive ? 'navLink active' : 'navLink'}>
						Home
					</NavLink>
					<NavLink to='/playStation' onClick={closeMenu} className={({isActive})=> isActive ? 'navLink active' : 'navLink'}>
						PlayStation
					</NavLink>
					<NavLink to='/xbox' onClick={closeMenu} className={({isActive})=> isActive ? 'navLink active' : 'navLink'}>
						Xbox
					</NavLink>
					<NavLink to='/pc' onClick={closeMenu} className={({isActive})=> isActive ? 'navLink active' : 'navLink'}>
						PC
					</NavLink>
					<NavLink to='/cart' onClick={closeMenu} className={({isActive})=> isActive ? 'navLink active' : 'navLink'}>
						Cart
					</NavLink>
				</nav>
			</div>

			<div className={`hamburger  ${isMenuOpen ? 'hamburgerActive' : ''} `} onClick={toggleMenu}>
				<span className='hamburgerBox'>
					<span className='hamburgerInner'></span>
				</span>
			</div>
		</div>
	)
}

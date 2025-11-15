import { Outlet } from 'react-router-dom'
import MainNavigation from '../components/MainNavigation'
import Footer from '../components/Footer'
import ScrollToTop from '../components/ScrollToTop'

const RootLayout = () => {
	return (
		<>
			<ScrollToTop/>
			<MainNavigation />
            <main>
                <Outlet/>
            </main>
            <Footer/>
		</>
	)
}

export default RootLayout

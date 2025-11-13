import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './page/Home'
import RootLayout from './layout/RootLayout'
import GameDetails from './page/GameDetails'
import './styles/main.scss'

const router = createBrowserRouter([
	{
		path: '/',
		element: <RootLayout />,
		children: [
			{ index: true, element: <Home /> },
			{ path: 'game/:id', element: <GameDetails /> },
		],
	},
])

function App() {
	return <RouterProvider router={router} />
}

export default App

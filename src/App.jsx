
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import MainNavigation from './components/MainNavigation'
import Home from './page/Home'
import './styles/main.scss'
import PlayStation from './page/PlayStation'
import Xbox from './page/Xbox'
import Pc from './page/Pc'
import Cart from './page/Cart'
import { CartContextProvider } from './store/CartContext'

function App() {

  return (
    <>
     
      <CartContextProvider>
      <MainNavigation />
      <Routes>
        <Route index={true} element={<Home />} />
        <Route path='playStation' element={<PlayStation/> } />
        <Route path='xbox' element={<Xbox/> } />
        <Route path='pc' element={<Pc/> } />
        <Route path='cart' element={<Cart/> } />
        </Routes>
        </CartContextProvider>
        
    </>
)
  
}

export default App

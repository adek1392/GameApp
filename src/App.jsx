
import { Routes, Route } from 'react-router-dom'
import MainNavigation from './components/MainNavigation'
import Home from './page/Home'
import './styles/main.scss'
import PlayStation from './page/PlayStation'
import Xbox from './page/Xbox'
import Pc from './page/Pc'
import Cart from './page/Cart'

function App() {

  return (
    <>
      <MainNavigation />
      <Routes>
        <Route index={true} element={<Home />} />
        <Route path='playStation' element={<PlayStation/> } />
        <Route path='xbox' element={<Xbox/> } />
        <Route path='pc' element={<Pc/> } />
        <Route path='cart' element={<Cart/> } />
      </Routes>
    </>
)
  
}

export default App

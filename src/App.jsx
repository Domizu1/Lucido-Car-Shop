import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DepthOrbs from './components/DepthOrbs'
import MainLayout from './layout/MainLayout'
import Home from './pages/home/Home'
import Wash from './pages/wash/Wash'
import Caffe from './pages/caffe/Caffe'
import Shop from './pages/shop/Shop'
import Details from './pages/shop/Details'


function App() {
  return (
    <Router>
      <div className="app-shell">
        <DepthOrbs />
        <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/wash" element={<Wash />} />
          <Route path="/caffe" element={<Caffe />} />
        </Route>
        <Route path="/shop" element={<Shop />} />
        {/* show details component when a slug is present */}
        <Route path="/shop/:slug" element={<Details />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
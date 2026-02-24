import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './layout/Navbar'
import Footer from './layout/Footer'
import Home from './pages/home/Home'
import Wash from './pages/wash/Wash'
import Caffe from './pages/caffe/Caffe'

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/wash" element={<Wash />} />
        <Route path="/caffe" element={<Caffe />} />
      </Routes>
      <Footer />
    </Router>
  )
}

export default App
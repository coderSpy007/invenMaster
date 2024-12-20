import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from './pages/Home';
import Category from './pages/Category/Category';
import CategoryDetail from './pages/Category/CategoryDetail';
import Unit from './pages/Unit/Unit';
import UnitDetail from './pages/Unit/UnitDetail';
import Spec from './pages/Specific/Spec';
import SpecDetail from './pages/Specific/SpecDetail';
import Vendor from './pages/Vendor/Vendor';
import VendorDetail from './pages/Vendor/VendorDetail';

function App() {

  return (
    <div className="w-full min-h-screen bg-gradient-to-r from-blue via-fadeblue to-fadeblue">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />

          {/* category */}
          <Route path="/category" element={<Category />} />
          <Route path="/category/detail" element={<CategoryDetail />} />

          {/* unit */}
          <Route path="/unit" element={<Unit />} />
          <Route path="/unit/detail" element={<UnitDetail />} />

          {/* spec */}
          <Route path="/spec" element={<Spec />} />
          <Route path="/spec/detail" element={<SpecDetail />} />

          {/* vendor */}
          <Route path="/vendor" element={<Vendor />} />
          <Route path="/vendor/detail" element={<VendorDetail />} />

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

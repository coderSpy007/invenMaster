import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from "./pages/Login";
import Home from './pages/Home';
import ConnectPhpServer from './components/ConnectPhpServer';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/test" element={<ConnectPhpServer />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App

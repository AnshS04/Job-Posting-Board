import './App.css';
import Navbar from './Components/Navbar';
import { TokenProvider } from './Context/TokenContext';
import Dashboard from './Pages/Dashboard';
import RegisterPage from './Pages/RegisterPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className='flex flex-col min-h-screen'>
        <TokenProvider>

        <Navbar />
        <Routes>
          <Route path="/" element={<RegisterPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
          {/* You can add more routes here */}
        </Routes>
        </TokenProvider>
      </div>
    </Router>
  );
}

export default App;

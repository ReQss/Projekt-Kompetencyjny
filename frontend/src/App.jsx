import './App.css';
import Home from './views/home/Home';
import Login from './views/login/Login';
import RentHistory from './views/rent-history/RentHistory';

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rent from './views/rent/Rent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rent-form" element={<Rent />} />
        <Route path="/rent-history/:itemId" element={<RentHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

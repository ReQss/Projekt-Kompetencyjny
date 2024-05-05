import './App.css';
import Home from './views/home/Home';
import ModificationForm from './views/modification-form/ModificationForm';
import Login from './views/login/Login';
import RentHistory from './views/rent-history/RentHistory';
import HistoryForm from './views/history-form/HistoryForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rent from './views/rent/Rent';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/modify" element={<Home />} />
        <Route path="/modification-form/:itemId" element={<ModificationForm />} />
        <Route path="/login" element={<Login />} />
        <Route path="/rent-form" element={<Rent />} />
        <Route path="/history-form" element={<HistoryForm />} />
        <Route path="/rent-history/:itemId" element={<RentHistory />} />
      </Routes>
    </Router>
  );
}

export default App;

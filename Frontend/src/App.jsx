import './App.css';
import Home from './views/home/Home';
import ModificationForm from './views/modification-form/ModificationForm';
import Login from './views/login/Login';
import RentHistory from './views/rent-history/RentHistory';
import HistoryForm from './views/history-form/HistoryForm';
import DeletionForm from './views/deletion-form/DeletionForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Rent from './views/rent/Rent';
import AddForm from './views/add-form/AddForm';
import UsersPanel from './views/users-panel/UsersPanel';

/**
 * Main application component.
 * @returns {JSX.Element} Main application component.
 */
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/home" element={<Home />} /> */}
        <Route path="/modify" element={<Home />} />
        <Route path="/delete" element={<Home />} />
        <Route path="/user-items" element={<Home />} />
        <Route path="/add-form" element={<AddForm />} />
        <Route
          path="/modification-form/:itemId"
          element={<ModificationForm />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/rent-form" element={<Rent />} />
        <Route path="/rent-form/:itemId" element={<Rent />} />
        <Route path="/deletion-form" element={<DeletionForm />} />
        <Route path="/history-form" element={<HistoryForm />} />
        <Route path="/rent-history/:itemId" element={<RentHistory />} />
        <Route path="/users-panel" element={<UsersPanel />} />
      </Routes>
    </Router>
  );
}

export default App;

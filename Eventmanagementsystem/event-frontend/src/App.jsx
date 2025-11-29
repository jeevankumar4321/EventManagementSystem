import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateEvent from './components/CreateEvent';
// 👇 THESE TWO IMPORTS WERE LIKELY MISSING
import EditEvent from './components/EditEvent';
import Attendees from './components/Attendees';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-event" element={<CreateEvent />} />
        
        {/* New Admin Routes */}
        <Route path="/edit-event/:id" element={<EditEvent />} />
        <Route path="/attendees/:id" element={<Attendees />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
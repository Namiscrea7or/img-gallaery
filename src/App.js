import { Routes, Route } from 'react-router-dom';
import PhotoList from './components/PhotoList.jsx';
import PhotoDetails from './components/PhotoDetails.jsx';

function App() {
  return (
    <div className="app">
      <Routes>
        <Route path="/" element={<PhotoList />} />
        <Route path="/photos" element={<PhotoList />} />
        <Route path="photos/:id" element={<PhotoDetails />} />
      </Routes>

    </div>
  );
}

export default App;
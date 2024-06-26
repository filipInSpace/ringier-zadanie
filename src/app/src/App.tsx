import React from 'react';
import { BrowserRouter, Routes, Route} from 'react-router-dom';
import HomePage from './pages/HomePage';
import ExtremesPage from './pages/ExtremesPage';

const App = () => {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/extremes" element={<ExtremesPage/>} />
          </Routes>
        </BrowserRouter>
      </div>
  );
};

export default App;

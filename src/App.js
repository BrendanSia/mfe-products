import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './common/Navigation';
import ListingPage from './pages/ListingPage';
import DataEntryPage from './pages/DataEntryPage';
import DetailPage from './pages/DetailPage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/listing" element={<ListingPage />} />
          <Route path="/data-entry" element={<DataEntryPage />} />
          <Route path="/detail" element={<DetailPage />} />
          <Route index element={<ListingPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

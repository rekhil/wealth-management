import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import BulkEntry from './components/BulkEntry';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/bulk-entry" element={<BulkEntry />} />
      </Routes>
    </Router>
  );
};

export default App; 
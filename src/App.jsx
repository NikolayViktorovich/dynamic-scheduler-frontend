import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { DataProvider, useData } from './context/DataContext'
import Dashboard from './pages/Index'
import WhatIf from './pages/Builder'
import Header from './components/Header'
import Auth from './pages/Auth'
import SpecialtySelection from './pages/SpecialtySelection'
import MinorSelection from './pages/MinorSelection'

const ProtectedRoute = ({ element }) => {
  const { isUrFUStudent, selectedSpecialtyId, selectedMinorId } = useData();

  if (isUrFUStudent === null) {
    return <Navigate to="/onboarding/auth" replace />;
  }
  
  // Шаг 2: Выбор Основной специальности
  if (selectedSpecialtyId === null) {
    return <Navigate to="/onboarding/specialty" replace />;
  }
  
  // Шаг 3: Выбор Майнера (Орбиты)
  if (selectedMinorId === null) {
    return <Navigate to="/onboarding/minor" replace />;
  }

  return element;
}

const AppContent = () => {
  const { isUrFUStudent, selectedSpecialtyId } = useData();

  return (
    <div className="min-h-screen bg-white dark:bg-[#0A0A0A] transition-colors">
      <Header />
      <Routes>
        <Route path="/onboarding/auth" element={<Auth />} />
        
        {/* Шаг 2: Выбор Основной специальности */}
        <Route 
          path="/onboarding/specialty" 
          element={<SpecialtySelection />} 
        />
        
        {/* Шаг 3: Выбор Майнера (Орбиты) */}
        <Route
          path="/onboarding/minor"
          element={selectedSpecialtyId ? <MinorSelection /> : <Navigate to="/onboarding/specialty" replace />}
        />
        
        {/* Защищенные маршруты */}
        <Route path="/dashboard" element={<ProtectedRoute element={<Dashboard />} />} />
        <Route path="/what-if" element={<ProtectedRoute element={<WhatIf />} />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  );
};

function App() {
  return (
    <Router>
      <DataProvider>
        <AppContent />
      </DataProvider>
    </Router>
  );
}

export default App;
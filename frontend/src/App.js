import React from 'react';
import CurrencyDetector from './components/CurrencyDetector';

function App() {
  return (
    <div className="min-h-screen">
      <nav className="bg-dark text-white shadow-md">
        <div className="container mx-auto py-4 px-4">
          <h1 className="text-xl md:text-2xl font-bold">Currency Detector</h1>
        </div>
      </nav>
      
      <main className="container mx-auto px-4 py-8">
        <CurrencyDetector />
      </main>
      
      <footer className="bg-gray-100 mt-12">
        <div className="container mx-auto p-4 text-center text-gray-600 text-sm">
          <p>© {new Date().getFullYear()} Currency Detector App</p>
        </div>
      </footer>
    </div>
  );
}

export default App; 
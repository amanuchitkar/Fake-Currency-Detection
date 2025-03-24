import React from 'react';
import { CheckCircleIcon, XCircleIcon } from './Icons';

const ResultDisplay = ({ result }) => {
  const isReal = result === 'Real Note';
  
  return (
    <div className={`card ${isReal ? 'border-green-100' : 'border-red-100'}`}>
      <div className="flex items-center justify-center mb-4">
        {isReal ? (
          <CheckCircleIcon className="h-12 w-12 text-green-500" />
        ) : (
          <XCircleIcon className="h-12 w-12 text-red-500" />
        )}
      </div>
      
      <h3 className="text-lg font-semibold text-center mb-2">
        Result: {result}
      </h3>
      
      <div className={`text-sm py-2 px-4 rounded-md text-center ${
        isReal 
          ? 'bg-green-50 text-green-800 border border-green-200' 
          : 'bg-red-50 text-red-800 border border-red-200'
      }`}>
        {isReal 
          ? 'This appears to be a genuine currency note.' 
          : 'This appears to be a counterfeit currency note.'}
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>Analysis provided by machine learning model</p>
        <p className="mt-1">Result accuracy may vary based on image quality</p>
      </div>
    </div>
  );
};

export default ResultDisplay; 
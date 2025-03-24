import React, { useState, useRef } from 'react';
import axios from 'axios';
import { PhotoIcon } from './Icons';
import ResultDisplay from './ResultDisplay';

const CurrencyDetector = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (!selectedFile) return;
    
    // Check if file is an image
    if (!selectedFile.type.match('image.*')) {
      setError('Please select an image file (png, jpg, jpeg)');
      return;
    }
    
    setError('');
    setFile(selectedFile);
    setResult('');
    
    // Create preview
    const reader = new FileReader();
    reader.onload = () => {
      setPreview(reader.result);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleSubmit = async () => {
    if (!file) {
      setError('Please select an image first');
      return;
    }

    setLoading(true);
    setError('');
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      const response = await axios.post('/predict', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      
      setResult(response.data);
    } catch (err) {
      console.error('Error predicting currency:', err);
      setError('Failed to analyze the image. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setPreview('');
    setResult('');
    setError('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <div className="card mb-6">
        <h2 className="text-xl font-semibold mb-4 text-center">Currency Verification</h2>
        <p className="text-gray-600 mb-6 text-center">Upload an image of a currency note to verify if it's real or fake</p>
        
        {error && (
          <div className="bg-red-100 border border-red-200 text-red-800 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <input
            ref={fileInputRef}
            type="file"
            id="imageUpload"
            accept=".png, .jpg, .jpeg"
            className="hidden"
            onChange={handleFileChange}
          />
          
          <label htmlFor="imageUpload" className="input-file-label mb-2">
            <div className="flex flex-col items-center">
              <PhotoIcon className="h-10 w-10 text-gray-400 mb-2" />
              <span className="text-sm font-medium text-gray-600">
                {file ? file.name : 'Click to upload or drag and drop'}
              </span>
              <span className="text-xs text-gray-500 mt-1">
                PNG, JPG, JPEG (max 5MB)
              </span>
            </div>
          </label>
          
          {preview && (
            <div className="mt-4 relative">
              <div className="aspect-square w-full max-h-64 bg-gray-100 rounded-lg overflow-hidden flex items-center justify-center">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="object-contain max-h-full max-w-full"
                />
              </div>
            </div>
          )}
        </div>
        
        <div className="flex gap-2">
          <button 
            onClick={handleSubmit} 
            disabled={!file || loading}
            className={`btn btn-primary flex-1 flex justify-center items-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing...
              </>
            ) : 'Verify'}
          </button>
          
          {file && (
            <button 
              onClick={handleReset}
              className="btn btn-outline"
            >
              Reset
            </button>
          )}
        </div>
      </div>
      
      {result && <ResultDisplay result={result} />}
    </div>
  );
};

export default CurrencyDetector; 
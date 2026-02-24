import React, { useState, useRef } from 'react';

const PestModal = () => {
  const [cropType, setCropType] = useState('');
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      if (!selectedFile.type.startsWith('image/')) {
        setError('Only image files are allowed!');
        setFile(null);
        setPreview(null);
        return;
      }
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
      setPrediction(null);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file || !cropType) {
      setError('Please select a crop type and an image!');
      return;
    }

    setIsLoading(true);
    setError(null);

    const formData = new FormData();
    formData.append('image_file', file);
    formData.append('crop_choice', cropType.toLowerCase());

    try {
      const response = await fetch('http://127.0.0.1:8000/predict/', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Network response was not ok');

      const data = await response.json();
      setPrediction(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const openFileDialog = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Upload Crop Image</h2>

      <label className="block mb-2 font-medium">Select Crop Type:</label>
      <select
        value={cropType}
        onChange={(e) => setCropType(e.target.value)}
        className="w-full mb-4 p-2 border rounded"
      >
        <option value="">--Select Crop--</option>
        <option value="rice">Rice</option>
        <option value="banana">Banana</option>
        <option value="coconut">Coconut</option>
        <option value="automatic">Automatic</option>
      </select>

      <button
        onClick={openFileDialog}
        className="w-full mb-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
      >
        Choose Image
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="hidden"
      />

      {preview && (
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-1">Preview:</p>
          <img src={preview} alt="Preview" className="max-w-full rounded-md" />
        </div>
      )}

      {error && <p className="text-red-500 mb-2">{error}</p>}
{prediction && (
  <div className="text-green-600 mb-2">
    <p>Filename: {prediction.filename}</p>
    <p>
      Disease Detected: {(() => {
        const fullClass = prediction.predictions[0].class;
        const parts = fullClass.split('_');
        const crop = parts[0]; // before underscore
        const disease = parts.slice(1).join('_'); // after underscore
        return `${disease} (${crop})`;
      })()}
    </p>
    <p>Confidence: {prediction.predictions[0].confidence}</p>
  </div>
)}

      <button
        onClick={handleUpload}
        disabled={isLoading}
        className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
      >
        {isLoading ? 'Analyzing...' : 'Upload & Analyze'}
      </button>
    </div>
  );
};

export default PestModal;

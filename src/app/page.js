'use client'
import React, { useState } from 'react';
import axios from 'axios';
import FileUploader from '../app/component/FileUploader';
import ResultTable from '../app/component/ResultTable';
import langchain from '../app/langchain/langchain';
import openai from '../app/util/openai';

const Home = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);

  const handleFileChange = (file) => {
    setFile(file);
  };

  const handleUpload = async () => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      // Call the API for text extraction
      const response = await axios.post('/api/extract', formData);

      // Integrate Langchain for text analysis
      const langchainResponse = await langchain.analyzeText(response.data.extractedText);

      // Integrate OpenAI for data enrichment
      const openaiResponse = await openai.enrichData(response.data.extractedText);

      // Update the results state with extracted text, Langchain analysis, and OpenAI enrichment
      setResults({
        extractedText: response.data.extractedText,
        processedText: langchainResponse.key, // Update with the actual attribute from Langchain
        enrichedData: openaiResponse, // Update with the actual enriched data from OpenAI
      });
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <main>
      <h1>Enhanced Text Extractor</h1>
      <FileUploader onFileChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>

      {results && <ResultTable results={results} />}
    </main>
  );
};

export default Home;

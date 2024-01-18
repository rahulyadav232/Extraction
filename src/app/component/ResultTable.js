'use client'
import React from 'react';

const ResultTable = ({ results }) => {
  return (
    <div>
      <h2>Extracted Text</h2>
      <p>{results.extractedText}</p>

      <h2>NLP Analysis Results</h2>
      <p>{results.nlpResults}</p>
    </div>
  );
};

export default ResultTable;


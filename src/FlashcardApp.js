import React, { useEffect, useState } from 'react';

export default function FlashcardApp() {
  const [vocab, setVocab] = useState([]);
  const [index, setIndex] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/gurmukhi_vocab_500.csv')
      .then((response) => response.text())
      .then((data) => {
        const lines = data.trim().split('\n');
        const parsed = lines.map((line) => {
          const firstComma = line.indexOf(',');
          const gurmukhi = line.substring(0, firstComma).trim();
          const english = line.substring(firstComma + 1).trim();
          return { gurmukhi, english };
        });
        setVocab(parsed);
      });
  }, []);

  const nextCard = () => {
    setIndex((prev) => (prev + 1) % vocab.length);
    setShowEnglish(false);
  };

  const prevCard = () => {
    setIndex((prev) => (prev - 1 + vocab.length) % vocab.length);
    setShowEnglish(false);
  };

  if (vocab.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading flashcards...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', gap: '1rem', padding: '1rem' }}>
      <div style={{ width: '100%', maxWidth: '400px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
          {vocab[index].gurmukhi}
        </div>
        {showEnglish && (
          <div style={{ fontSize: '1.25rem', color: '#555' }}>
            {vocab[index].english}
          </div>
        )}
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <button onClick={prevCard} style={{ padding: '0.5rem 1rem' }}>Back</button>
        <button onClick={() => setShowEnglish(!showEnglish)} style={{ padding: '0.5rem 1rem' }}>
          {showEnglish ? 'Hide' : 'Show'} Meaning
        </button>
        <button onClick={nextCard} style={{ padding: '0.5rem 1rem' }}>Next</button>
      </div>
    </div>
  );
}

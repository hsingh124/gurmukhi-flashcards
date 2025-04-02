import React, { useEffect, useState } from 'react';

export default function FlashcardApp() {
  const [vocab, setVocab] = useState([]);
  const [index, setIndex] = useState(0);
  const [showEnglish, setShowEnglish] = useState(false);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/gurmukhi_vocab_500_detailed.csv')
      .then((response) => response.text())
      .then((data) => {
        const lines = data.trim().split('\n');
        const parsed = lines.map((line) => {
          const parts = line.split(',');
          const gurmukhi = parts[0]?.trim();
          const english = parts[1]?.trim();
          const breakdown = parts.slice(2).join(',').trim();
          return { gurmukhi, english, breakdown };
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

  const selectCard = (i) => {
    setIndex(i);
    setShowEnglish(false);
  };

  if (vocab.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '5rem' }}>Loading flashcards...</div>;
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'row', overflow: 'hidden' }}>
        <div className="sidebar" style={{ width: '200px', overflowY: 'auto', borderRight: '1px solid #ccc', padding: '1rem' }}>
          <h3 style={{ marginBottom: '1rem', fontWeight: 'bold' }}>Word List</h3>
          {vocab.map((item, i) => (
            <div
              key={i}
              onClick={() => selectCard(i)}
              style={{
                padding: '0.5rem',
                cursor: 'pointer',
                backgroundColor: i === index ? '#f0f0f0' : 'transparent',
                fontWeight: i === index ? 'bold' : 'normal'
              }}
            >
              {item.gurmukhi}
            </div>
          ))}
        </div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
          <div style={{ width: '80vw', maxWidth: '500px', textAlign: 'center', border: '1px solid #ccc', borderRadius: '8px', padding: '2rem', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem', fontWeight: 'bold' }}>
              {vocab[index].gurmukhi}
            </div>
            {showEnglish && (
              <>
                <div style={{ fontSize: '1.25rem', color: '#555', marginBottom: '1rem' }}>
                  {vocab[index].english}
                </div>
                <div style={{ fontSize: '1rem', color: '#777', whiteSpace: 'pre-wrap' }}>
                  {vocab[index].breakdown}
                </div>
              </>
            )}
          </div>
          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button onClick={prevCard} style={{ padding: '0.5rem 1rem' }}>Back</button>
            <button onClick={() => setShowEnglish(!showEnglish)} style={{ padding: '0.5rem 1rem' }}>
              {showEnglish ? 'Hide' : 'Show'} Meaning
            </button>
            <button onClick={nextCard} style={{ padding: '0.5rem 1rem' }}>Next</button>
          </div>
        </div>
      </div>

      {/* Mobile responsive menu */}
      <div className="mobile-menu" style={{ overflowX: 'auto', borderTop: '1px solid #ccc', padding: '0.5rem', whiteSpace: 'nowrap' }}>
        {vocab.map((item, i) => (
          <span
            key={i}
            onClick={() => selectCard(i)}
            style={{
              display: 'inline-block',
              padding: '0.5rem',
              marginRight: '0.5rem',
              cursor: 'pointer',
              backgroundColor: i === index ? '#f0f0f0' : 'transparent',
              fontWeight: i === index ? 'bold' : 'normal'
            }}
          >
            {item.gurmukhi}
          </span>
        ))}
      </div>

      {/* Inline responsive style */}
      <style>{`
        .mobile-menu {
            display: none;
        }
        @media (max-width: 820px) {
          .sidebar {
            display: none;
          }
          .mobile-menu {
            display: block;
          }
        }
      `}</style>
    </div>
  );
}

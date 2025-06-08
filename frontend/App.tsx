import React, { useEffect, useState } from 'react';
import { ThemeProvider, useTheme } from './ThemeContext';
import { ErrorBoundary } from './ErrorBoundary';
import { fetchDailyPlanHTML } from './utils/api';

function InnerApp() {
  const { theme, toggleTheme } = useTheme();
  const [htmlContent, setHtmlContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    console.log('🚀 useEffect: Fetching daily plan');
    fetchDailyPlanHTML()
      .then((html) => {
        console.log('🎯 Success, setting HTML content');
        setHtmlContent(html);
      })
      .catch((err) => {
        console.error('❌ Failed to fetch:', err);
        setError('Failed to load daily plan.');
      });
  }, []);

  return (
    <div
      style={{
        backgroundColor: theme === 'dark' ? '#121212' : '#fff',
        color: theme === 'dark' ? '#fff' : '#000',
        minHeight: '100vh',
        padding: 24,
        fontFamily: 'sans-serif',
      }}
    >
      <h2 style={{ textAlign: 'center' }}>Toggle Theme</h2>
      <button onClick={toggleTheme}>Toggle</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {!error && !htmlContent && <p>Loading daily plan...</p>}
      {htmlContent && (
        <div
          style={{ marginTop: 20 }}
          dangerouslySetInnerHTML={{ __html: htmlContent }}
        />
      )}
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <InnerApp />
      </ErrorBoundary>
    </ThemeProvider>
  );
}

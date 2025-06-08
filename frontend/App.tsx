import React, { useEffect, useState, useContext } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import { ThemeContext, ThemeProvider } from './ThemeContext';

const BACKEND_URL = 'https://us-central1-life-assistant-76e75.cloudfunctions.net/getDailyPlan';

function AppContent() {
  const { width } = useWindowDimensions();
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    fetch(BACKEND_URL)
      .then(res => res.text())
      .then(setHtml)
      .catch(err => {
        setHtml(`<p>Error fetching daily plan: ${err.message}</p>`);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: theme.colors.background }}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ backgroundColor: theme.colors.background, padding: 16 }}>
      {html && <RenderHtml contentWidth={width} source={{ html }} />}
    </ScrollView>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

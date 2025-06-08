import { getFormattedDate } from '../utils/date';
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useTheme } from '../ThemeContext'; // adjust path if needed
import { getFormattedDate } from '../utils/date'; // we’ll create this util next

export default function DailyPlanner() {
  const { theme } = useTheme();

  const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Your Daily Planner</Text>
      <Text style={[styles.date, { color: theme.colors.text }]}>{getFormattedDate(new Date())}</Text>
      {hours.map((hour) => (
        <View key={hour} style={[styles.block, { backgroundColor: theme.colors.cardBackground }]}>
          <Text style={[styles.time, { color: theme.colors.text }]}>{hour}</Text>
          <Text style={[styles.placeholder, { color: theme.colors.text }]}>Add task...</Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 8 },
  date: { fontSize: 18, marginBottom: 16 },
  block: { padding: 12, marginBottom: 10, borderRadius: 8 },
  time: { fontSize: 16, fontWeight: '600' },
  placeholder: { marginTop: 4, fontStyle: 'italic', opacity: 0.7 }
});

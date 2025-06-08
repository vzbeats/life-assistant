export async function fetchDailyPlanHTML(): Promise<string> {
  try {
    const response = await fetch(
      'https://us-central1-life-assistant-76e75.cloudfunctions.net/getDailyPlan'
    );
    const text = await response.text();
    return text;
  } catch (error) {
    console.error('Error fetching daily plan:', error);
    throw error;
  }
}

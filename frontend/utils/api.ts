export async function fetchDailyPlanHTML(): Promise<string> {
  try {
    const res = await fetch('https://us-central1-life-assistant-76e75.cloudfunctions.net/getDailyPlan', {
      headers: {
        'Accept': 'text/html',
      },
    });

    const html = await res.text();
    if (!html.includes('</html>')) throw new Error('Invalid HTML response');
    return html;
  } catch (err) {
    console.error('Error fetching daily plan:', err);
    throw err;
  }
}

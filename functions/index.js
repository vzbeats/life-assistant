const { OpenAI } = require("openai");
const functions = require("firebase-functions");

const openai = new OpenAI({
  apiKey: functions.config().openai.key,
});

exports.getDailyPlan = functions.https.onRequest(async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a helpful daily life assistant that generates a personalized plan.",
        },
        {
          role: "user",
          content: "Give me today's plan.",
        },
      ],
    });

    const reply = completion.choices[0].message.content;
    res.status(200).send(reply);
  } catch (err) {
    console.error("Error generating daily plan:", err);
    res.status(500).send("Something went wrong.");
  }
});

import { Configuration, OpenAIApi } from "openai";
import * as functions from "firebase-functions";

const config = new Configuration({
  apiKey: functions.config().openai.apikey,
});

export const openai = new OpenAIApi(config);

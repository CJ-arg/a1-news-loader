import { ChatGroq } from "@langchain/groq";
import dotenv from "dotenv";

dotenv.config();

export const groqLLM = new ChatGroq({
  apiKey: process.env.GROQ_API_KEY,
  model: "mixtral-8x7b-32768",
  temperature: 0.7,
  maxTokens: 2048,
});


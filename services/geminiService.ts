// FIX: Implement Gemini API call to generate learning paths.
import { GoogleGenAI, Type } from "@google/genai";
import type { LearningStep } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const learningPathSchema = {
  type: Type.ARRAY,
  items: {
    type: Type.OBJECT,
    properties: {
      title: {
        type: Type.STRING,
        description: 'A concise title for this learning step (e.g., "Introduction to React Hooks").',
      },
      description: {
        type: Type.STRING,
        description: 'A detailed, beginner-friendly explanation of the concepts in this step.',
      },
      keyConcepts: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
        description: 'A list of 3-5 key concepts or terms covered in this step.',
      },
      flashcards: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            question: {
              type: Type.STRING,
              description: 'A question to test understanding of a key concept.',
            },
            answer: {
              type: Type.STRING,
              description: 'The answer to the flashcard question.',
            },
          },
          required: ['question', 'answer'],
        },
        description: 'A list of 3-5 flashcards (question/answer pairs) for self-assessment.',
      },
    },
    required: ['title', 'description', 'keyConcepts', 'flashcards'],
  },
};

export const generateLearningPath = async (topic: string): Promise<LearningStep[]> => {
  const prompt = `
    Create a detailed, structured learning path for a beginner wanting to learn "${topic}".
    The learning path should consist of 5 to 7 logical steps.
    For each step, provide:
    1. A clear "title".
    2. A "description" explaining the concepts of that step in a simple, easy-to-understand way.
    3. A list of 3-5 "keyConcepts" (as strings).
    4. A list of 3-5 "flashcards", each with a "question" and an "answer" to help reinforce the learning.

    Ensure the entire output is a JSON array of objects that strictly adheres to the provided schema. Do not include any markdown formatting like \`\`\`json.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: learningPathSchema,
      },
    });
    
    const jsonText = response.text.trim();
    try {
      const path = JSON.parse(jsonText);
      return path as LearningStep[];
    } catch (e) {
      console.error("Failed to parse JSON response:", jsonText);
      throw new Error("Received an invalid JSON format from the model.");
    }
  } catch (error) {
    console.error("Error generating learning path with Gemini:", error);
    throw new Error("Failed to communicate with the AI model.");
  }
};

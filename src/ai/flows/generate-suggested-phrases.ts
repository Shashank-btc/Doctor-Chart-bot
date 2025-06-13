'use server';
/**
 * @fileOverview This file defines a Genkit flow for generating suggested phrases for doctors during a consultation.
 *
 * - generateSuggestedPhrases - A function that generates suggested phrases for the doctor.
 * - GenerateSuggestedPhrasesInput - The input type for the generateSuggestedPhrases function.
 * - GenerateSuggestedPhrasesOutput - The return type for the generateSuggestedPhrases function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateSuggestedPhrasesInputSchema = z.object({
  conversationHistory: z
    .string()
    .describe('The current conversation history between the doctor and patient.'),
  patientDetails: z.string().describe('Details about the patient.'),
});

export type GenerateSuggestedPhrasesInput = z.infer<
  typeof GenerateSuggestedPhrasesInputSchema
>;

const GenerateSuggestedPhrasesOutputSchema = z.object({
  suggestedPhrases: z
    .array(z.string())
    .describe('An array of suggested phrases or questions for the doctor.'),
});

export type GenerateSuggestedPhrasesOutput = z.infer<
  typeof GenerateSuggestedPhrasesOutputSchema
>;

export async function generateSuggestedPhrases(
  input: GenerateSuggestedPhrasesInput
): Promise<GenerateSuggestedPhrasesOutput> {
  return generateSuggestedPhrasesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateSuggestedPhrasesPrompt',
  input: {schema: GenerateSuggestedPhrasesInputSchema},
  output: {schema: GenerateSuggestedPhrasesOutputSchema},
  prompt: `You are an AI assistant helping a doctor during a consultation.\nGiven the conversation history and patient details, generate a list of suggested phrases or questions that the doctor can use to guide the consultation efficiently.\n\nConversation History: {{{conversationHistory}}}\nPatient Details: {{{patientDetails}}}\n\nSuggested Phrases (as a JSON array of strings):`,
});

const generateSuggestedPhrasesFlow = ai.defineFlow(
  {
    name: 'generateSuggestedPhrasesFlow',
    inputSchema: GenerateSuggestedPhrasesInputSchema,
    outputSchema: GenerateSuggestedPhrasesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

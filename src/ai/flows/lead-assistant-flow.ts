'use server';
/**
 * @fileOverview An AI assistant for students to ask about their application.
 *
 * - leadAssistant - A function that answers student queries.
 * - LeadAssistantInput - The input type for the leadAssistant function.
 * - LeadAssistantOutput - The return type for the leadAssistant function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';
import {
  user,
  applicationStages,
  documents,
  payments,
  overview,
} from '@/lib/data';

// Prepare context data as a string for the prompt
const applicationContext = `
You are a helpful AI assistant for a student applying to study abroad.
Your name is VeniBot.
You have access to the student's application data.
Answer the student's questions based ONLY on the data provided below.
Keep your answers concise and friendly.

Current User Data:
- Name: ${user.fullName}
- Email: ${user.email}
- Intended Course: ${user.intendedCourse}
- Intended Country: ${user.intendedCountry}

Application Overview:
- Application Status: ${overview.applicationStatus}
- Admission Status: ${overview.admissionStatus}
- Visa Status: ${overview.visaStatus}
- Outstanding Payments: $${overview.outstandingPayments.toLocaleString()}

Application Stages:
${applicationStages
  .map((s) => `- ${s.name}: ${s.status} (Date: ${s.date || 'N/A'})`)
  .join('\n')}

Uploaded Documents:
${documents.map((d) => `- ${d.type} (${d.name}): ${d.status}`).join('\n')}

Payment History:
${payments
  .map(
    (p) => `- ${p.type}: $${p.amount.toLocaleString()} - Status: ${p.status}`
  )
  .join('\n')}
`;

const LeadAssistantInputSchema = z.object({
  query: z.string().describe("The user's question about their application."),
});
export type LeadAssistantInput = z.infer<typeof LeadAssistantInputSchema>;

const LeadAssistantOutputSchema = z.string();
export type LeadAssistantOutput = z.infer<typeof LeadAssistantOutputSchema>;

export async function leadAssistant(
  input: LeadAssistantInput
): Promise<LeadAssistantOutput> {
  return leadAssistantFlow(input);
}

const prompt = ai.definePrompt({
  name: 'leadAssistantPrompt',
  input: { schema: LeadAssistantInputSchema },
  output: { schema: LeadAssistantOutputSchema },
  prompt: `${applicationContext}\n\nStudent's question: "{{{query}}}"\n\nYour answer:`,
});

const leadAssistantFlow = ai.defineFlow(
  {
    name: 'leadAssistantFlow',
    inputSchema: LeadAssistantInputSchema,
    outputSchema: LeadAssistantOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output || 'I am sorry, I could not generate a response.';
  }
);

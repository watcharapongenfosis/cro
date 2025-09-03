// This is an enhanced email notification flow that generates a summary of CRO lead details using an LLM and sends it in an email.
'use server';

import {ai} from '@/ai/genkit';
import {z} from 'zod';

const CROLeadDetailsSchema = z.object({
  companyName: z.string(),
  contactNumber: z.string(),
  email: z.string().email(),
  productInfo: z.string(),
  budget: z.number(),
  appointmentTime: z.string(),
  interestedServices: z.array(z.string()),
});

export type CROLeadDetails = z.infer<typeof CROLeadDetailsSchema>;

const EmailNotificationOutputSchema = z.object({
  emailSent: z.boolean().describe('Whether the email notification was sent successfully.'),
});

export type EmailNotificationOutput = z.infer<typeof EmailNotificationOutputSchema>;

export async function sendEnhancedEmailNotification(leadDetails: CROLeadDetails): Promise<EmailNotificationOutput> {
  return enhancedEmailNotificationFlow(leadDetails);
}

const emailSummaryPrompt = ai.definePrompt({
  name: 'emailSummaryPrompt',
  input: {schema: CROLeadDetailsSchema},
  output: {schema: z.string()},
  prompt: `You are an expert marketing assistant tasked with summarizing CRO lead inquiries for quick review.\n  Based on the following lead details, generate a concise summary (under 100 words) highlighting the key needs, \n  the products they are interested in, and the suggested convenient time for an appointment.\n\n  Company Name: {{{companyName}}}\n  Contact Number: {{{contactNumber}}}\n  Email: {{{email}}}\n  Product Information: {{{productInfo}}}\n  Budget: {{{budget}}}\n  Appointment Time: {{{appointmentTime}}}\n  Interested Services: {{#each interestedServices}}{{{this}}}, {{/each}}\n\n  Summary:`,
});

const enhancedEmailNotificationFlow = ai.defineFlow(
  {
    name: 'enhancedEmailNotificationFlow',
    inputSchema: CROLeadDetailsSchema,
    outputSchema: EmailNotificationOutputSchema,
  },
  async leadDetails => {
    const summaryResult = await emailSummaryPrompt(leadDetails);
    const summary = summaryResult.output;

    // TODO: Implement email sending logic here using a service like Nodemailer or SendGrid
    // In a real application, you would replace this with actual email sending code.
    console.log('Simulating sending email with summary:', summary);

    // Placeholder for email sending implementation
    const emailSent = true; // Assume email was sent successfully for this example

    return {emailSent};
  }
);

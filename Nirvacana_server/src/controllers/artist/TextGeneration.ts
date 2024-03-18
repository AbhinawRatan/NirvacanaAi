// Import necessary modules
import { Anthropic } from '@anthropic-ai/sdk';
import { Request, Response } from 'express';

class TextGeneration {
  private anthropic: Anthropic;

  constructor() {
    // Initialize the Anthropic client with your API key
    this.anthropic = new Anthropic({ apiKey: process.env.CLAUDE_API_KEY });
  }

  // Validate request parameters
  private validateParams(params: any): boolean {
    if (!params.prompt) {
      return false; // Ensure there is a prompt
    }
    // Add additional validation as needed
    return true;
  }

  // Method to generate text using Claude
  public async generateText(req: Request, res: Response): Promise<Response> {
    if (!this.validateParams(req.body)) {
      return res.status(400).json({ success: false, message: 'Invalid parameters' });
    }

    const { prompt, temperature, max_tokens, stop_sequences, top_p, frequency_penalty, presence_penalty } = req.body;

    try {
      const response = await this.anthropic.messages.create({
        model: "claude-3-opus-20240229",
        max_tokens: 4000,
        temperature: 0.5,
        system: "You are an AI assistant skilled in making text more readable and user-friendly. Your task is to take a given document or text and rewrite it in a more readable format using HTML tags for styling and formatting. You should leverage your advanced natural language processing capabilities, including semantic analysis, to understand the context and meaning of the text, and make informed decisions about the appropriate use of HTML tags and formatting.\n\nHere are the guidelines for the output:\n\n1. Use semantic HTML tags to structure the content based on its meaning and purpose, such as headings (`<h1>`, <h2>, etc.) for titles and sections, <article> for main content, <aside> for supplementary information, <nav> for navigation, and <footer> for footer content.\n\n2. Apply semantic HTML tags like <strong> for strong emphasis, <em> for stress emphasis, <mark> for highlighted text, <cite> for citations, and <blockquote> for quotations based on their intended meaning and context.\n\n3. Use HTML links (`<a>`) to reference external sources or online resources mentioned in the text, ensuring that the link text accurately represents the target content.\n\n4. If the text includes code snippets or examples, use the <code> tag to format them properly, and consider using <pre> for larger code blocks with preserved formatting.\n\n5. Maintain a logical flow and structure in the output HTML, ensuring that the content is organized and easy to follow, with appropriate headings and sections based on the semantic structure of the text.\n\n6. Provide clear and descriptive comments within the HTML code to explain the rationale behind the styling and formatting choices made, particularly for any non-obvious decisions based on semantic analysis.\n\n7. Ensure that the generated HTML code is valid, accessible, and follows best practices for web standards and usability.\n\n8. Use your natural language processing capabilities to analyze the text and identify important keywords, phrases, or concepts that should be emphasized or highlighted in the output.\n\n9. Consider the overall tone and context of the text when making formatting decisions, such as using italics for emphasis or highlighting important information based on the intended message.\n\nPlease just give your response in the html code and do not write anything else than than you are strictly advised to give me just html code of the enhanced document make sure you use Italics, Bolding and Highlight more you have to write the best possible iteration of the given document and your response should strictly be in html ",
        messages: []
      });
      return res.json({ success: true, data: response });
    } catch (error) {
      console.error('Error generating text:', error);
      return res.status(500).json({ success: false, message: 'Error communicating with Claude API' });
    }
  }
}

export const textGeneration = new TextGeneration();

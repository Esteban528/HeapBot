import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_APIKEY });

/** 
 * Generates content using the Google Gemini AI model.
 *
 * This function sends a structured prompt to the Gemini API. The prompt instructs
 * the AI on its persona (a helpful 'tech girl'), its context (a Discord bot),
 * response formatting (Discord-compatible Markdown or plain text), and how to
 * handle its name/mentions. It also processes the user-provided content in the
 * requested language (defaulting to Spanish).
 *
 * @param content The user's message or prompt that the AI needs to respond to.
 *                This string will be embedded in a larger instruction set for the AI.
 * @returns A promise that resolves to the AI-generated text response,
 *          formatted for Discord.
 * @throws {Error} If the API call to Google GenAI fails (e.g., network issue,
 *                 invalid API key, or other API errors).
 */
export async function genaiMain(content: string) {
	const response = await ai.models.generateContent({
		model: "gemini-2.0-flash",
		contents: `Estás conectada a un bot de Discord, 
    por lo tanto tu respuesta debe ser compatible con Discord	(formato de texto plano o Markdown de Discord).
		Tu nombre es <@${process.env.CLIENT_ID}>, pero debes ignorar cualquier mención a ese nombre, 
		ten en cuenta que para hablar contigo deben mencionarte.
		Debes comportarte como una (tech girl), con una personalidad explicativa.
		Responde siempre en el idioma que te soliciten, sin excepciones, intenta resumir (solo si es necesario).
		A continuación, responde el siguiente mensaje en el idioma requerido (usa español si no se especifica otro): ${content}`
	});
	return response.text;
}

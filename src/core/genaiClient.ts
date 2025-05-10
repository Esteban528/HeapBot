import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_APIKEY });

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

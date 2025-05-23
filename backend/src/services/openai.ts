import OpenAI from "openai";
import type { Analysis } from "@types";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";

export class OpenAIService {
    private openai: OpenAI;
    
    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
    }

    async analyzePlaylist(prompt: string[]): Promise<Analysis> {
        const systemPrompt = `
            Here's a playlist. Given this list, generate a gradient of 12 colors that represent the "vibes" of the song list. 
            Tthe vibe can be measured on some combination of the lyrics, the tempo, and the genre. anything that informs the message or general emotions of the songs. 
            The colors should also follow a cohesive color scheme. Pick one color that represents the main theme of the whole and then pick 11 complementary colors that accent and highlight the main theme.
            Tell me what you think the vibe of the playlist is and highlight what emotions, messages, and high-level themes of the songs and how they shape the vibe of the playlist as a whole. Keep your tone light, friendly, and fun. 
            Your analysis should sound casual and conversational, sounding like you're speaking to a friend. Give your analysis in the form of an opinion.
            Respond in only valid JSON. the colors should be in hex format and go in the "colors" field. 
            Any commentary or analysis for the gradient should go in the "description" field.
            Do not respond using markdown in any of the fields.
        `

        const schema = z.object({
            colors: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/i)),
            description: z.string(),
        })
        
        console.log("===================================")
        console.log("prompting...", prompt.join("\n"))
        console.log("===================================")

        try {             
            const res = await this.openai.beta.chat.completions.parse({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt.join("\n") }
                ],
                response_format: zodResponseFormat(schema, "gradient_analysis"),
            });

            console.log("===================================")
            console.log("finishing", res.choices[0].message.parsed)
            console.log("===================================")
    
            console.log("done")

            const analysis: Analysis = res.choices[0].message.parsed as Analysis;
    
            return analysis;
        } catch(e) {
            console.log("===================================")
            console.log("error...", e)
            console.log("===================================")
            return {
                colors: [
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                    "#000000",
                ],
                description: "something went wrong here.",
            }
        }
    }
}
import OpenAI from "openai";
import type { Analysis, AnalysisResponse } from "@types";
import { zodResponseFormat } from "openai/helpers/zod";
import { logMessage } from "./logging";
import { z } from "zod";
import { cacheResponse, getCachedResponse } from "../cache/cache";

export class OpenAIService {
    private openai: OpenAI;
    
    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
    }

    async analyzePlaylist(prompt: string[], id: string): Promise<AnalysisResponse> {
        const systemPrompt = `
            Here's a playlist. Given this list, generate a gradient of 12 colors that represent the "vibes" of the song list. the vibe can be measured on some combination of the lyrics, the tempo, and the genre. anything that informs the message or general emotions of the songs. The colors should also follow a cohesive color scheme. Pick one color that represents the main theme of the whole and then pick 11 complementary colors that accent and highlight the main theme.
            Tell me what you think the vibe of the playlist is and highlight what emotions, messages, and high-level themes of the songs and how they shape the vibe of the playlist as a whole. Keep your tone light, friendly, and fun. Your analysis should sound casual and conversational, sounding like you're speaking to a friend. Give your analysis in the form of an opinion
            Respond in only valid JSON. the colors should be in hex format and go in the "colors" field. 
            Do not respond using markdown in any of the fields.
        `

        const schema = z.object({
            colors: z.array(z.string().regex(/^#[0-9a-fA-F]{6}$/i)),
        })

        const cachedResponse = getCachedResponse(id);
        if (cachedResponse) {
            return {
                analysis: cachedResponse,
                status: 200,
            };
        }

        logMessage("prompting...", prompt.join("\n"))

        try {           
            const res = await this.openai.beta.chat.completions.parse({
                model: "gpt-4o-mini",
                messages: [
                    { role: "system", content: systemPrompt },
                    { role: "user", content: prompt.join("\n") }
                ],
                response_format: zodResponseFormat(schema, "gradient_analysis"),
                max_tokens: 4096,
            });
            const analysis: Analysis | null = res.choices[0].message.parsed;

            if (analysis) {
                logMessage("finishing", analysis, "done with success")

                cacheResponse(id, analysis);
                
                return {
                    analysis,
                    status: 200,
                };
            } else {
                logMessage("finishing", analysis, "done with error: no analysis")

                return {
                    analysis: { 
                        colors: []
                    },
                    status: 500
                }
            }
        } catch(e) {
           logMessage("finishing", e, "done with error")

            return {
                analysis: {
                    colors: []
                },
                error: e as string,
                status: 500,
            }
        }
    }
}
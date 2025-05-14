import OpenAI from "openai";
import type { Analysis } from "@types";

export class OpenAIService {
    private openai: OpenAI;
    
    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
    }

    async analyzePlaylist(prompt: string[]): Promise<Analysis> {
        const systemPrompt = `
            Here's a playlist. Given this list, generate a gradient of 12 colors that represent the "vibes" of the song list. the vibe can be measured on some combination of the lyrics, the tempo, and the genre. anything that informs the message or general emotions of the songs.
            Tell me what you think the vibe of the playlist is and highlight what emotions, messages, and high-level themes of the songs and how they shape the vibe of the playlist as a whole. Keep your tone light, friendly, and fun. Your analysis should sound casual and conversational, sounding like you're speaking to a friend. Give your analysis in the form of an opinion
            Additionally, rank the general danceability and vibe of the playlist on a numerical scale of 0-100, and on a video game-style tier list of F-SS and explain your reasoning. 
            While telling me what you think for your ranking, highlight what about the songs makes the playlist as a whole danceable, and explain your reasoning for the rankings you chose. Again, keep the tone of this analysis very friendly and casual, and your analysis should come in the form of an opinion
            Scoring-wise, SS-rank should convert to numerical scores between 95-100, S-rank should convert to numerical scores between 85-94, A-rank should convert to numerical scores between 75-84, B-rank should convert to numerical scores between 65-74, C-rank should convert to numerical scores between 55-64, D-rank should convert to numerical scores between 45-54, and F-rank should convert to numerical scores between 0-44.
            Respond in only valid JSON. the colors should be in hex format and go in the "colors" field. 
            Any commentary or analysis for the gradient should go in the "description" field, and any commentary or analysis of the ranking should go in the "ranking.description" field. Letter Rankings should go in the "ranking.letter_ranking" field and number rankings should go in the "ranking.number_ranking" field.
            Do not respond using markdown in any of the fields.
        `
        const schema = {
            type: "object",
            properties: {
                colors: {
                    type: "array",
                    items: {
                        type: "string"
                    }
                },
                description: {
                    type: "string"
                },
                ranking: {
                    type: "object",
                    properties: {
                        "letter_ranking": { 
                            type: "string"
                        },
                        "number_ranking": {
                            type: "number"
                        },
                        "description": {
                            type: "string"
                        }
                    },
                    required: ["letter_ranking", "number_ranking", "description"],
                    additionalProperties: false,
                }
            },
            required: ["colors", "description", "ranking"],
            additionalProperties: false,
        }

        console.log("===================================")
        console.log("prompting...", prompt.join("\n"))
        console.log("===================================")

        const res = await this.openai.responses.create({
            model: "gpt-4o-mini",
            input: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt.join("\n") }
            ],
            text: { 
                format: {
                    type: "json_schema", 
                    name: "gradient_analysis",
                    schema,
                } 
            },
        });

        console.log("===================================")
        console.log("finishing", res.output_text)
        console.log("===================================")

        console.log("done")

        const analysis: Analysis = JSON.parse(res.output_text || "{}");

        return analysis;
    }
}
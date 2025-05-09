import OpenAI from "openai";

export class OpenAIService {
    private openai: OpenAI;
    
    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
    }

    async analyzePlaylist(prompt: string): Promise<string> {
        const systemPrompt = `
            Here's a playlist. given this list, generate a gradient of any number of colors that represent the "vibes" of the song list. the vibe can be measured on some combination of the lyrics, the tempo, and the genre. anything that informs the message or general emotions of the songs.
            Additionally, rank the general danceability and vibe of the playlist on a numerical scale of 0-100, and on a video game-style tier list of F-SS and explain your reasoning in two sentences.
            respond in only valid JSON. the colors should be in hex format and go in the "colors" field. and any commentary or analysis for the gradient should go in the "description" field, and any commentary or analysis of the ranking should go in the "ranking.description" field. Do not respond using markdown in any of the fields.
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
                    }
                }
            }
        }

        const res = await this.openai.responses.create({
            model: "gpt-4o-mini",
            input: [
                { role: "system", content: systemPrompt },
                { role: "user", content: prompt }
            ],
            text: { 
                format: {
                    type: "json_schema", 
                    name: "gradient_analysis",
                    schema
                } 
            },
        });

        return res.output_text || "";
    }
}
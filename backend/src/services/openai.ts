import OpenAI from "openai";

export class OpenAIService {
    private openai: OpenAI;
    
    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
    }

    async analyzePlaylist(prompt: string[]): Promise<string> {
        const systemPrompt = `
            Here's a playlist. Given this list, generate a gradient of any number of colors that represent the "vibes" of the playlist as a whole, not the individual songs. the vibe can be measured on some combination of the lyrics, emotions, and themes of the songs. 
            As an example, if the high-level emotion and themes of a playlist are based on love, or are conveying a love message, then the colors should be romantic, focusing on pinks and reds of varying saturations and lightnesses. The gradients should not be just a random collection of colors, but should follow a cohesive theme that best represents the vibe of the playlist as a whole.
            Tell me what you think the vibe of the playlist is and highlight what emotions, messages, and high-level themes of the songs and how they shape the vibe of the playlist as a whole. Keep your tone light, friendly, and fun. Your analysis should sound casual and conversational, sounding like you're speaking to a friend. Give your analysis in the form of an opinion.
            Represent only the vibe of the playlist as a whole, not the individual songs, and only represent the top two themes of the playlist using 5 colors. Avoid using any colors that are too unsaturated or light, and avoid using any colors that are too bold or bright unless conveying a specific emotion or theme.
            The colors that you choose should represent all of the emotions and themes that are present in the playlist. Make sure to choose appropriate hues, saturations, and lightnesses for the colors you choose.
            Additionally, rank the general danceability and vibe of the playlist on a numerical scale of 0-100, and on a video game-style tier list of F-SS and explain your reasoning. 
            While telling me what you think for your ranking, highlight what about the songs makes the playlist as a whole danceable, and explain your reasoning for the rankings you chose. Again, keep the tone of this analysis very friendly and casual, and your analysis should come in the form of an opinion
            Scoring-wise, SS-rank should convert to numerical scores between 95-100, S-rank should convert to numerical scores between 85-94, A-rank should convert to numerical scores between 75-84, B-rank should convert to numerical scores between 65-74, C-rank should convert to numerical scores between 55-64, D-rank should convert to numerical scores between 45-54, and F-rank should convert to numerical scores between 0-44.
            Be very objective in your analysis. Not ever playlist will have a rank of A or above. Some playlists will be very low energy and have a very low danceability score and that is by design, do not force a higher ranking inappropriately. Include tempo, lyrics, arrangement, message, melody, rhythm/groove, and emotional mood of each song in your analysis. Give appropriate and honest opinions, and do not be afraid to give a low ranking if the playlist is not very danceable.
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

        return res.output_text || "";
    }
}
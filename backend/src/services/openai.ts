import OpenAI from "openai";

export class OpenAIService {
    private openai: OpenAI;
    
    constructor(apiKey: string) {
        this.openai = new OpenAI({ apiKey });
    }

    async generatePlaylistDescription(prompt: string): Promise<string> {
        const response = await this.openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [{ role: "user", content: prompt }],
            max_tokens: 100,
        });

        return response.choices[0].message.content || "";
    }
}
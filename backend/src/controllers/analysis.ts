import { Request, Response } from "express";
import { OpenAIService } from "../services/openai";
import { AnalysisResponse } from "@types";

export class AnalysisController {
    constructor(private openAIService: OpenAIService) {}

    async analyze(req: Request, res: Response) {
        const { tracksList, id } = req.body;
        if (!tracksList || !id) {
            res.status(400).json({ error: "no tracks given" });
            return;
        }

        const analysis: AnalysisResponse = await this.openAIService.analyzePlaylist(tracksList, id);

        if(analysis.status !== 200) {
            res.status(analysis.status || 500).json({ ...analysis })
        } else {
            res.json({ ...analysis });
        }
        
    }
}
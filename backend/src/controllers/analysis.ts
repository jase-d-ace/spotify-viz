import { Request, Response } from "express";
import { OpenAIService } from "../services/openai";
import { AnalysisResponse } from "@types";
export class AnalysisController {
    constructor(private openAIService: OpenAIService) {}

    async analyze(req: Request, res: Response) {
        const { tracksList, id } = req.body;
        const analysis: AnalysisResponse = await this.openAIService.analyzePlaylist(tracksList, id);

        if(analysis.status !== 200) {
            res.status(500).json({ ...analysis })
        } else {
            res.json({ ...analysis });
        }
        
    }
}
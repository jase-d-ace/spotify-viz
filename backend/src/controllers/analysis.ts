import { Request, Response } from "express";
import { OpenAIService } from "../services/openai";
import { AnalysisResponse } from "@types";
export class AnalysisController {
    constructor(private openAIService: OpenAIService) {}

    async analyze(req: Request, res: Response) {
        const { tracks } = req.body;
        const analysis: AnalysisResponse = await this.openAIService.analyzePlaylist(tracks);

        if(analysis.status !== 200) {
            res.status(500).json({ ...analysis })
        } else {
            res.json({ ...analysis });
        }
        
    }
}
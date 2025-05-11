import { Request, Response } from "express";
import { OpenAIService } from "../services/openai";
import type { AnalysisResponse } from "../types";

export class AnalysisController {
    constructor(private openAIService: OpenAIService) {}

    async analyze(req: Request, res: Response) {
        const { tracks } = req.body;
        const analysis = await this.openAIService.analyzePlaylist(tracks);
        const analysisResp: AnalysisResponse = { analysis: JSON.parse(analysis) };
        
        res.json(analysisResp);
    }
}
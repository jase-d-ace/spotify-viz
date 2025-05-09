import { Request, Response } from "express";
import { OpenAIService } from "../services/openai";

export class AnalysisController {
    constructor(private openAIService: OpenAIService) {}

    async analyze(req: Request, res: Response) {
        const { tracks } = req.body;
        const analysis = await this.openAIService.analyzePlaylist(tracks);
        res.json({ analysis });
    }
}
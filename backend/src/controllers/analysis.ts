import { Request, Response } from "express";
import { OpenAIService } from "../services/openai";
import { AnalysisResponse } from "@types";

export class AnalysisController {
    constructor(private openAIService: OpenAIService) {}

    async analyze(req: Request, res: Response) {
        const { tracks } = req.body;

        if (!tracks || !tracks.length) {
            res.status(400).json({ error: "no tracks given" });
            return;
        }

        const analysis: AnalysisResponse = await this.openAIService.analyzePlaylist(tracks);

        if(analysis.status !== 200) {
            res.status(analysis.status || 500).json({ ...analysis })
        } else {
            res.json({ ...analysis });
        }
        
    }
}
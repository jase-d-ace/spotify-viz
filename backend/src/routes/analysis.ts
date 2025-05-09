import { Router } from "express";
import { OpenAIService } from "../services/openai";
import { AnalysisController } from "../controllers/analysis";

export function createAnalysisRouter(openAIService: OpenAIService) {
    const router = Router();
    const openAIController = new AnalysisController(openAIService)

    router.post("/analyze",  openAIController.analyze.bind(openAIController));

    return router;
}
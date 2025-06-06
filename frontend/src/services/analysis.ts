import type { AnalysisResponse } from "@backend/types";

export class AnalysisService {
    async getTracksAnalysis({ tracksList, id}: { tracksList: string[], id: string | undefined }): Promise<AnalysisResponse> {
        const res = await fetch("http://127.0.0.1:3000/api/analysis/analyze", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
            body: JSON.stringify({ tracksList, id }),
        });
        return res.json();
    }
}
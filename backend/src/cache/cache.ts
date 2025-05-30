import { LRUCache } from "lru-cache";
import { AnalysisResponse } from "@types";

const cache = new LRUCache<string, AnalysisResponse>({
  max: 100,
  ttl: 1000 * 60 * 5, // 5 minutes
});
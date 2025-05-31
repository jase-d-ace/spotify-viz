import { LRUCache } from "lru-cache";
import { Analysis } from "@types";
import { logMessage } from "../services/logging";

const cache = new LRUCache<string, Analysis>({
  max: 100,
  ttl: 1000 * 60 * 5, // 5 minutes
  onInsert: (value, key, reason) => {
    logMessage("cache", `Inserted ${JSON.stringify(key)} into cache`, JSON.stringify(value))
  },
  dispose: (value, key, reason) => {
    logMessage("cache", `Deleted ${JSON.stringify(key)} from cache`, JSON.stringify(value));
  }

});

export const cacheResponse = (key: string, value: Analysis) => {
  cache.set(JSON.stringify(key), value);
};

export const getCachedResponse = (key: string): Analysis | undefined => cache.get(JSON.stringify(key));
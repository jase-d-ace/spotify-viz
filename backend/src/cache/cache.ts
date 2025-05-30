import { LRUCache } from "lru-cache";
import { Analysis } from "@types";
import { logMessage } from "../services/logging";

const cache = new LRUCache<string, Analysis>({
  max: 100,
  ttl: 1000 * 60 * 5, // 5 minutes
  onInsert: (value, key, reason) => {
    logMessage("cache", `Inserted ${key} into cache`);
  },
  dispose: (value, key, reason) => {
    logMessage("cache", `Deleted ${key} from cache`);
  }

});
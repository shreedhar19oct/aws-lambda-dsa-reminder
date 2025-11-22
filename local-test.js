// local-test.js
import "dotenv/config";
import { handler } from "./index.js";

(async () => {
  try {
    const result = await handler();
    console.log("Local result:", result);
  } catch (err) {
    console.error("Local test failed:", err);
  }
})();

import "dotenv/config";
import { createHttpServer } from "./http/index.ts";

const app = createHttpServer();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`HTTP server listening on port ${PORT}`);
});
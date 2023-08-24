import type { VercelRequest, VercelResponse } from "@vercel/node";

// Store about 1000 words with definitions
// Since they're small, try inmemory storage
// Maybe a vector store to offer similarity search
export default function (request: VercelRequest, response: VercelResponse) {
  const { name = "World" } = request.query;
  response.send(`Hello ${name}!`);
}

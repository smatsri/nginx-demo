const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.get("/hello", (req, res) => {
  res.set(
    "App-Cache-Control",
    "public, max-age=0, s-maxage=60, stale-while-revalidate=300"
  );
  res.send(
    `[${new Date().toLocaleString()}] Hello from custom cache control header!`
  );
});

app.get("/search", (req, res) => {
  // prepare all the query params
  const query = Object.entries(req.query)
    .map(([key, value]) => `${key}=${value}`)
    .join("&");
  res.set(
    "App-Cache-Control",
    "public, max-age=0, s-maxage=60, stale-while-revalidate=300"
  );
  res.send(`[${new Date().toLocaleString()}] Search results for ${query}`);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

require("dotenv").config();
const express = require("express");
const app = express();

const port = 3000;
const api_key = process.env.API_KEY;

app.get("/get-api-key", (req, res) => {
    res.json({ api_key });
  });

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

import express from "express";

const app = express();

const PORT = 8000;

app.get("/health", (req, res) => {
  return res.json({ message: "Running Healthy!" });
});

app.listen(PORT, () => {
  console.log("Server running on PORT: ", PORT);
});

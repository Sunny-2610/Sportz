import express from "express";
import { matchRouter } from "./db/routes/matches.js";

const app = express();
const PORT = 8000;

// JSON middleware
app.use(express.json());

// Root GET route
app.get("/", (req, res) => {
  res.json({
    message: "Server is running successfully 🚀",
  });
});

app.use("/matches", matchRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
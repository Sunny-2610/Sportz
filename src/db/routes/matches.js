import { Router } from "express";

export const matchRouter = Router();

matchRouter.get("/", (req, res) => {
  res.json({
    message: "Matches listed successfully 🚀",
  });
});

matchRouter.post("/", async (req, res) => {
  const parsed = createMatchSchema.safeParse(req.body);
  const { data :{ startTime, endTime ,homeScore,awayScore} } = parsed;

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid payload.",
      details: parsed.error,
    });
  }

  try {
    const result = await db.insert(matches).values({
      ...parsed.data,
      startTime : new Date(startTime),
      endTime : new Date(endTime),
      homeScore: homeScore ?? 0,
      awayScore: awayScore ?? 0,
      status: getMatchStatus(startTime, endTime),
    }).returning();

    res.status(201).json({data: event})

    return res.status(201).json({
      message: "Match created successfully ✅",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Internal server error.",
      details: JSON.stringify(e),
    });
  }
});
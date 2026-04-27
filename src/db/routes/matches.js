import { Router } from "express";
import { db } from "../db.js";
import { matches } from "../schema.js";
import { createMatchSchema, listMatchesQuerySchema } from "../../validation/matches.js";
import { getMatchStatus } from "../../utils/match-status.js";

export const matchRouter = Router();

// GET all matches
matchRouter.get("/", async (req, res) => {
  // 1. Validate query params
  const parsed = listMatchesQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid query parameters",
      details: parsed.error,
    });
  }

  try {
    // 2. Fetch matches from DB
    const result = await db.select().from(matches);

    // 3. Send response
    return res.json({
      message: "Matches fetched successfully ✅",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Internal server error",
      details: JSON.stringify(e),
    });
  }
});

// CREATE match
matchRouter.post("/", async (req, res) => {
  // 1. Validate request body
  const parsed = createMatchSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      error: "Invalid payload",
      details: parsed.error,
    });
  }

  // 2. Extract data
  const { startTime, endTime, homeScore, awayScore } = parsed.data;

  try {
    // 3. Insert into DB
    const result = await db
      .insert(matches)
      .values({
        ...parsed.data,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        homeScore: homeScore ?? 0,
        awayScore: awayScore ?? 0,
        status: getMatchStatus(startTime, endTime),
      })
      .returning();

    // 4. Send success response
    return res.status(201).json({
      message: "Match created successfully ✅",
      data: result,
    });
  } catch (e) {
    return res.status(500).json({
      error: "Internal server error",
      details: JSON.stringify(e),
    });
  }
});
import express from "express";
import {
  getBibleBooks,
  getBookChapters,
  getBookVerses, getVerse
} from "../controllers/bible.js";

const router = express.Router();

router.get("/bible/:version", getBibleBooks);

router.get("/bible/:version/:bookId/chapters", getBookChapters);

router.get("/bible/:version/:bookId/chapters/:chapterId", getBookVerses);

router.get(
  "/bible/:version/:bookId/chapters/:chapterId/verses/:verseId",
  getVerse,
);

export default router;

import { Router } from "express";
import { schemaValidation } from "../middlewares/schemas/validation.middleware";
import {
  createMusic,
  deleteMusic,
  getMusic,
  updateMusic,
} from "../controllers/music.controller";
import {
  createMusicSchema,
  getMusicSchema,
  queryMusicSchema,
  updateMusicSchema,
} from "../schemas/music.schema";

const router = Router();

router.get("/", schemaValidation(queryMusicSchema, "query"), getMusic());

router.post("/", schemaValidation(createMusicSchema, "body"), createMusic());

router.put(
  "/:id",
  schemaValidation(getMusicSchema, "params"),
  schemaValidation(updateMusicSchema, "body"),
  updateMusic()
);

router.delete(
  "/:id",
  schemaValidation(getMusicSchema, "params"),
  deleteMusic()
);

export default router;

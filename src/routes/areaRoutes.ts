import { Router } from "express";
import { criarNovaArea, pegarTodasAreas, pegarAreaID } from "../controllers/areaController";

const router = Router();

router.post("/", criarNovaArea);
router.get("/", pegarTodasAreas);
router.get("/:id", pegarAreaID);

export default router;

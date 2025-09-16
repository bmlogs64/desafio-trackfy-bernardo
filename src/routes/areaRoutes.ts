import { Router } from "express";
import { criarNovaArea, pegarTodasAreas, pegarAreaID } from "../controllers/areaController";
import { autenticar } from "../middleware/authMiddleware"

const router = Router();

router.post("/", autenticar, criarNovaArea);
router.get("/", autenticar, pegarTodasAreas);
router.get("/:id", autenticar, pegarAreaID);

export default router;

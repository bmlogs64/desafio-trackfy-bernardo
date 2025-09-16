import { Router } from "express";
import { criarPresenca, pegarPresencas } from "../controllers/presencaController";
import { autenticar } from "../middleware/authMiddleware"

const router = Router();

router.post("/", autenticar, criarPresenca);
router.get("/", autenticar, pegarPresencas);

export default router;

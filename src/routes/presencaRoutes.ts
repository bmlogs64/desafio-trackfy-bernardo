import { Router } from "express";
import { criarPresenca, pegarPresencas } from "../controllers/presencaController";

const router = Router();

router.post("/", criarPresenca);
router.get("/", pegarPresencas);

export default router;

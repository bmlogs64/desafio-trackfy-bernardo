import { Router } from "express";
import { criarPresenca, pegarPresencas } from "../controllers/presencaController";
import { contarPresencasPorPeriodo, contarPresencasPorArea } from "../controllers/relatorioController";
import { autenticar } from "../middleware/authMiddleware"

const router = Router();

router.post("/", autenticar, criarPresenca);
router.get("/", autenticar, pegarPresencas);

router.get("/relatorio/periodo", autenticar, contarPresencasPorPeriodo);
router.get("/relatorio/area", autenticar, contarPresencasPorArea);
router.get("/relatorio/area/:areaID", autenticar, contarPresencasPorArea);

export default router;

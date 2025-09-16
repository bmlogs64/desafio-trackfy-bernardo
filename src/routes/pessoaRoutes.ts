import { Router } from "express";
import { criarNovaPessoa, pegarTodasPessoas, pegarPessoaID } from "../controllers/pessoaController";
import { autenticar } from "../middleware/authMiddleware"

const router = Router();

router.post("/", autenticar, criarNovaPessoa);
router.get("/", autenticar, pegarTodasPessoas);
router.get("/:id", autenticar, pegarPessoaID);

export default router;

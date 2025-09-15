import { Router } from "express";
import { criarNovaPessoa, pegarTodasPessoas, pegarPessoaID } from "../controllers/pessoaController";

const router = Router();

router.post("/", criarNovaPessoa);
router.get("/", pegarTodasPessoas);
router.get("/:id", pegarPessoaID);

export default router;

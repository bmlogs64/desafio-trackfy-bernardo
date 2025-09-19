import { Router } from "express";
import { criarNovaPessoa, pegarTodasPessoas, pegarPessoaID } from "../controllers/pessoaController";
import { autenticar } from "../middleware/authMiddleware"

/**
 * @swagger
 * /pessoas:
 *   post:
 *     summary: Criar uma nova pessoa
 *     tags: [Pessoas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - funcao
 *               - areaID
 *             properties:
 *               nome:
 *                 type: string
 *               funcao:
 *                 type: string
 *               areaID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso
 *       400:
 *         description: Todos os campos são obrigatórios
 *       401:
 *         description: Token não fornecido
 *       500:
 *         description: Erro interno do servidor
 *
 *   get:
 *     summary: Listar todas as pessoas
 *     tags: [Pessoas]
 *     responses:
 *       200:
 *         description: Lista de pessoas retornada com sucesso
 *       401:
 *         description: Token não fornecido
 *       500:
 *         description: Erro interno do servidor
 *
 * /pessoas/{id}:
 *   get:
 *     summary: Buscar pessoa por ID
 *     tags: [Pessoas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Pessoa encontrada
 *       401:
 *         description: Token não fornecido
 *       404:
 *         description: Pessoa não encontrada
 *       500:
 *         description: Erro interno do servidor
 */



const router = Router();

router.post("/", autenticar, criarNovaPessoa);
router.get("/", autenticar, pegarTodasPessoas);
router.get("/:id", autenticar, pegarPessoaID);

export default router;

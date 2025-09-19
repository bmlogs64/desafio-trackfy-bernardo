import { Router } from "express";
import { criarNovaPessoa, pegarTodasPessoas, pegarPessoaID } from "../controllers/pessoaController";
import { autenticar } from "../middleware/authMiddleware"

/**
 * @openapi
 * /pessoas:
 *   get:
 *     summary: Lista todas as pessoas
 *     description: Retorna um array com todas as pessoas cadastradas.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de pessoas
 *
 *   post:
 *     summary: Cria uma nova pessoa
 *     description: Registra uma pessoa vinculada a uma área existente.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nome:
 *                 type: string
 *               funcao:
 *                 type: string
 *               areaID:
 *                 type: integer
 *             required:
 *               - nome
 *               - funcao
 *               - areaID
 *     responses:
 *       201:
 *         description: Pessoa criada com sucesso
 */

/**
 * @openapi
 * /pessoas/{id}:
 *   get:
 *     summary: Busca uma pessoa pelo ID
 *     description: Retorna os dados de uma pessoa específica.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da pessoa
 *     responses:
 *       200:
 *         description: Dados da pessoa
 */


const router = Router();

router.post("/", autenticar, criarNovaPessoa);
router.get("/", autenticar, pegarTodasPessoas);
router.get("/:id", autenticar, pegarPessoaID);

export default router;

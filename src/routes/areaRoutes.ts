import { Router } from "express";
import { criarNovaArea, pegarTodasAreas, pegarAreaID } from "../controllers/areaController";
import { autenticar } from "../middleware/authMiddleware"

/**
 * @swagger
 * /areas:
 *   post:
 *     summary: Criar uma nova área
 *     tags: [Áreas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - tipo
 *               - localizacao
 *             properties:
 *               nome:
 *                 type: string
 *               tipo:
 *                 type: string
 *               localizacao:
 *                 type: string
 *     responses:
 *       201:
 *         description: Área criada com sucesso
 *       400:
 *         description: Todos os campos são obrigatórios
 *       401:
 *         description: Token não fornecido
 *       500:
 *         description: Erro interno do servidor
 *
 *   get:
 *     summary: Listar todas as áreas
 *     tags: [Áreas]
 *     responses:
 *       200:
 *         description: Lista de áreas retornada com sucesso
 *       401:
 *         description: Token não fornecido
 *       500:
 *         description: Erro interno do servidor
 *
 * /areas/{id}:
 *   get:
 *     summary: Buscar uma área por ID
 *     tags: [Áreas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Área encontrada
 *       401:
 *         description: Token não fornecido
 *       404:
 *         description: Área não encontrada
 *       500:
 *         description: Erro interno do servidor
 */


const router = Router();

router.post("/", autenticar, criarNovaArea);
router.get("/", autenticar, pegarTodasAreas);
router.get("/:id", autenticar, pegarAreaID);

export default router;

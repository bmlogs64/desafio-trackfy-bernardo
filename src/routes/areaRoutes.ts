import { Router } from "express";
import { criarNovaArea, pegarTodasAreas, pegarAreaID } from "../controllers/areaController";
import { autenticar } from "../middleware/authMiddleware"

/**
 * @openapi
 * /areas:
 *   get:
 *     summary: Lista todas as áreas
 *     description: Retorna um array com todas as áreas cadastradas.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de áreas
 *
 *   post:
 *     summary: Cria uma nova área
 *     description: Registra uma área no sistema.
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
 *               tipo:
 *                 type: string
 *               localizacao:
 *                 type: string
 *             required:
 *               - nome
 *               - tipo
 *               - localizacao
 *     responses:
 *       201:
 *         description: Área criada com sucesso
 */

/**
 * @openapi
 * /areas/{id}:
 *   get:
 *     summary: Busca uma área pelo ID
 *     description: Retorna os dados de uma área específica.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da área
 *     responses:
 *       200:
 *         description: Dados da área
 */


const router = Router();

router.post("/", autenticar, criarNovaArea);
router.get("/", autenticar, pegarTodasAreas);
router.get("/:id", autenticar, pegarAreaID);

export default router;

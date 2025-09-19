import { Router } from "express";
import { criarPresenca, pegarPresencas } from "../controllers/presencaController";
import { contarPresencasPorPeriodo, contarPresencasPorArea } from "../controllers/relatorioController";
import { autenticar } from "../middleware/authMiddleware"

/**
 * @swagger
 * /presencas:
 *   post:
 *     summary: Registrar uma nova presença
 *     tags: [Presenças]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - pessoaID
 *               - areaID
 *             properties:
 *               pessoaID:
 *                 type: integer
 *               areaID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Presença registrada com sucesso
 *       400:
 *         description: Pessoa e área são obrigatórios
 *       401:
 *         description: Token não fornecido
 *       500:
 *         description: Erro interno do servidor
 *
 *   get:
 *     summary: Listar presenças (com filtros opcionais)
 *     tags: [Presenças]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pessoaID
 *         schema:
 *           type: integer
 *       - in: query
 *         name: areaID
 *         schema:
 *           type: integer
 *       - in: query
 *         name: inicio
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: fim
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Lista de presenças retornada com sucesso
 *       401:
 *         description: Token não fornecido
 *       500:
 *         description: Erro interno do servidor
 *
 * /presencas/relatorio/periodo:
 *   get:
 *     summary: Relatório de presenças por período
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: inicio
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *       - in: query
 *         name: fim
 *         required: true
 *         schema:
 *           type: string
 *           format: date-time
 *     responses:
 *       200:
 *         description: Contagem de presenças retornada com sucesso
 *       400:
 *         description: É necessário informar 'inicio' e 'fim'
 *       401:
 *         description: Token não fornecido
 *       500:
 *         description: Erro ao contar presenças por período
 *
 * /presencas/relatorio/area:
 *   get:
 *     summary: Relatório de presenças por todas as áreas
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Contagem de presenças por área retornada com sucesso
 *       401:
 *         description: Token não fornecido
 *       500:
 *         description: Erro ao contar presenças por área
 *
 * /presencas/relatorio/area/{areaID}:
 *   get:
 *     summary: Relatório de presenças de uma área específica
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: areaID
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Contagem de presenças da área retornada com sucesso
 *       401:
 *         description: Token não fornecido
 *       500:
 *         description: Erro ao contar presenças da área
 */

const router = Router();

router.post("/", autenticar, criarPresenca);
router.get("/", autenticar, pegarPresencas);

router.get("/relatorio/periodo", autenticar, contarPresencasPorPeriodo);
router.get("/relatorio/area", autenticar, contarPresencasPorArea);
router.get("/relatorio/area/:areaID", autenticar, contarPresencasPorArea);

export default router;

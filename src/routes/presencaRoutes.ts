import { Router } from "express";
import { criarPresenca, pegarPresencas } from "../controllers/presencaController";
import { contarPresencasPorPeriodo, contarPresencasPorArea } from "../controllers/relatorioController";
import { autenticar } from "../middleware/authMiddleware"

/**
 * @openapi
 * /presencas:
 *   get:
 *     summary: Lista todas as presenças
 *     description: Retorna todas as presenças registradas. Pode ser filtrado por pessoa, área e período.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: pessoaID
 *         schema:
 *           type: integer
 *         description: ID da pessoa para filtrar
 *       - in: query
 *         name: areaID
 *         schema:
 *           type: integer
 *         description: ID da área para filtrar
 *       - in: query
 *         name: inicio
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data/hora de início do filtro (ISO 8601)
 *       - in: query
 *         name: fim
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data/hora de fim do filtro (ISO 8601)
 *     responses:
 *       200:
 *         description: Lista de presenças
 *
 *   post:
 *     summary: Registra uma presença
 *     description: Cria um novo registro de presença vinculando pessoa e área.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               pessoaID:
 *                 type: integer
 *               areaID:
 *                 type: integer
 *             required:
 *               - pessoaID
 *               - areaID
 *     responses:
 *       201:
 *         description: Presença criada com sucesso
 */

/**
 * @openapi
 * /presencas/relatorio/periodo:
 *   get:
 *     summary: Relatório de presenças por período
 *     description: Retorna a quantidade de presenças agrupadas dentro de um intervalo de tempo.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: inicio
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data/hora de início (ISO 8601)
 *       - in: query
 *         name: fim
 *         schema:
 *           type: string
 *           format: date-time
 *         description: Data/hora de fim (ISO 8601)
 *     responses:
 *       200:
 *         description: Relatório de presenças por período
 */

/**
 * @openapi
 * /presencas/relatorio/area:
 *   get:
 *     summary: Relatório de presenças por área
 *     description: Retorna a quantidade de presenças agrupadas por área.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Relatório de presenças por área
 */

/**
 * @openapi
 * /presencas/relatorio/area/{areaID}:
 *   get:
 *     summary: Relatório de presenças de uma área específica
 *     description: Retorna a quantidade de presenças apenas da área informada pelo parâmetro.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: areaID
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da área
 *     responses:
 *       200:
 *         description: Relatório de presenças para a área informada
 */


const router = Router();

router.post("/", autenticar, criarPresenca);
router.get("/", autenticar, pegarPresencas);

router.get("/relatorio/periodo", autenticar, contarPresencasPorPeriodo);
router.get("/relatorio/area", autenticar, contarPresencasPorArea);
router.get("/relatorio/area/:areaID", autenticar, contarPresencasPorArea);

export default router;

import { Router } from "express";
import passport from "passport";
import { loginGoogle, googleCallback } from "../controllers/authController";

/**
 * @swagger
 * /auth/google:
 *   get:
 *     summary: Login com Google
 *     tags: [Autenticação]
 *     responses:
 *       302:
 *         description: Redireciona para a página de autenticação do Google
 *       401:
 *         description: Token não fornecido
 *       500:
 *         description: Erro interno no processo de autenticação
 *
 * /auth/google/callback:
 *   get:
 *     summary: Callback de autenticação do Google
 *     tags: [Autenticação]
 *     responses:
 *       200:
 *         description: Autenticado com sucesso, retorna token
 *       401:
 *         description: Erro ao autenticar com Google
 *       500:
 *         description: Erro interno do servidor
 */



const router = Router();

router.get("/google", loginGoogle);
router.get("/google/callback", googleCallback);


export default router;

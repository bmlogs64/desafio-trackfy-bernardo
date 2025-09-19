import { Router } from "express";
import passport from "passport";
import { loginGoogle, googleCallback } from "../controllers/authController";

/**
 * @openapi
 * /auth/google:
 *   get:
 *     summary: Inicia autenticação com Google OAuth 2.0
 *     description: Redireciona o usuário para o login do Google. Após o login, será redirecionado para o callback configurado.
 *     responses:
 *       302:
 *         description: Redireciona para o Google
 */

/**
 * @openapi
 * /auth/google/callback:
 *   get:
 *     summary: Callback de autenticação Google
 *     description: Endpoint chamado pelo Google após o login. Retorna um token JWT.
 *     responses:
 *       200:
 *         description: Token JWT retornado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 */


const router = Router();

router.get("/google", loginGoogle);
router.get("/google/callback", googleCallback);


export default router;

import { Request, Response } from "express";
import passport from "passport";

export function loginGoogle(req: Request, res: Response, next: Function) {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
}

export function googleCallback(req: Request, res: Response, next: Function) {
  passport.authenticate("google", (err, user) => {
    if (err) {
      return res.status(500).json({ error: "Erro no servidor durante autenticação" });
    }
    if (!user) {
      return res.status(401).json({ error: "Usuário não autenticado com Google" });
    }
    return res.json({ token: user.token });
  })(req, res, next);
}
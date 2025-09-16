import { Request, Response } from "express";
import passport from "passport";

export function loginGoogle(req: Request, res: Response, next: Function) {
  passport.authenticate("google", { scope: ["profile", "email"] })(req, res, next);
}

export function googleCallback(req: Request, res: Response, next: Function) {
  passport.authenticate("google", (err, user) => {
    if (err || !user) {
      return res.status(401).json({ error: "Erro ao autenticar com Google" });
    }

    res.json({ token: user.token });
  })(req, res, next);
}

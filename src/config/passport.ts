import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL: "http://localhost:3000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value || profile._json.email;
        if (!email) throw new Error("Email não fornecido pelo Google");

        let usuario = await prisma.usuario.findUnique({ where: { email } });

        if (!usuario) {
          usuario = await prisma.usuario.create({
            data: {
              email,
              nome: profile.displayName || "Sem nome",
            },
          });
        }

        const token = jwt.sign({ id: usuario.id }, JWT_SECRET, { expiresIn: "1h" });
        done(null, { token });
      } catch (error) {
        console.error("Erro na autenticação Google:", error);
        done(error as any, null);
      }
    }
  )
);

passport.authenticate("google", { session: false })

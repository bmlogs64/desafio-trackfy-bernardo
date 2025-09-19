import express from "express";
import { setupSwagger } from "./config/swagger";
import passport from "passport";
import "./config/passport";
import dotenv from "dotenv";
dotenv.config();
import areaRoutes from "./routes/areaRoutes";
import pessoaRoutes from "./routes/pessoaRoutes";
import presencaRoutes from "./routes/presencaRoutes";
import authRoutes from "./routes/authRoutes";

const app = express();
app.use(express.json());

app.use(passport.initialize());
app.use("/auth", authRoutes);
app.use("/areas", areaRoutes);
app.use("/pessoas", pessoaRoutes);
app.use("/presencas", presencaRoutes);

setupSwagger(app);

const PORT = 3000;
const URL = `http://localhost:${PORT}/auth/google`;

app.listen(PORT, () => {
  console.log(`Autenticação no servidor rodando em ${URL}`);
  console.log("Swagger disponível em http://localhost:3000/api-docs");
});

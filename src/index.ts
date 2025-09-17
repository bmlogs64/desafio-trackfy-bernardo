import express from "express";
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

const PORT = 3000;
const URL = `http://localhost:${PORT}/auth/google`;

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${URL}`);
});

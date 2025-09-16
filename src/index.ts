import express from "express";
import areaRoutes from "./routes/areaRoutes";
import pessoaRoutes from "./routes/pessoaRoutes";
import presencaRoutes from "./routes/presencaRoutes";

const app = express();
app.use(express.json());

app.use("/areas", areaRoutes);
app.use("/pessoas", pessoaRoutes);
app.use("/presencas", presencaRoutes);

const PORT = 3000;
const URL = `http://localhost:${PORT}`;

app.listen(PORT, () => {
  console.log(`Servidor rodando em ${URL}`);
});

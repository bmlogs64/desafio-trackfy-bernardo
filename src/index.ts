import express from "express";

const app = express();
app.use(express.json());

const PORT = 3000;
const url = `http://localhost:${PORT}`;

app.get("/", (req, res) =>{

    res.send("API rodando!")

});

app.listen(PORT, () => {
  console.log(`Servidor rodando em: ${url}`);
});
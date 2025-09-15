import { Request, Response } from "express";
import { criarPessoa, listarPessoas, buscarPessoaPorID } from "../services/pessoaService";

export async function criarNovaPessoa(req: Request, res: Response) {
  try {
    const { nome, funcao, areaID } = req.body;
    if (!nome || !funcao || !areaID) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    const pessoa = await criarPessoa(nome, funcao, Number(areaID));
    res.status(201).json(pessoa);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function pegarTodasPessoas(req: Request, res: Response) {
  const pessoas = await listarPessoas();
  res.json(pessoas);
}

export async function pegarPessoaID(req: Request, res: Response) {
  const { id } = req.params;
  const pessoa = await buscarPessoaPorID(Number(id));
  if (!pessoa) return res.status(404).json({ error: "Pessoa não encontrada" });
  res.json(pessoa);
}

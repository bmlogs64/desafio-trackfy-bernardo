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
    res.status(500).json({ error: error.message });
  }
}

export async function pegarTodasPessoas(req: Request, res: Response) {
  try {
    const pessoas = await listarPessoas();
    return res.json(pessoas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro interno ao listar pessoas" });
  }
}

export async function pegarPessoaID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const pessoa = await buscarPessoaPorID(Number(id));
    if (!pessoa) return res.status(404).json({ error: "Pessoa não encontrada" });
    return res.json(pessoa);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro interno ao buscar pessoa" });
  }
}
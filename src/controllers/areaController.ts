import { Request, Response } from "express";
import { criarArea, listarAreas, buscarAreaPorID } from "../services/areaService";

export async function criarNovaArea(req: Request, res: Response) {
  try {
    const { nome, tipo, localizacao } = req.body;
    if (!nome || !tipo || !localizacao) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    const area = await criarArea(nome, tipo, localizacao);
    res.status(201).json(area);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function pegarTodasAreas(req: Request, res: Response) {
  try {
    const areas = await listarAreas();
    return res.json(areas);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro interno ao listar áreas" });
  }
}

export async function pegarAreaID(req: Request, res: Response) {
  try {
    const { id } = req.params;
    if (isNaN(Number(id))) {
      return res.status(400).json({ error: "ID inválido" });
    }
    const area = await buscarAreaPorID(Number(id));
    if (!area) return res.status(404).json({ error: "Área não encontrada" });
    return res.json(area);
  } catch (error: any) {
    return res.status(500).json({ error: error.message || "Erro interno ao buscar área" });
  }
}

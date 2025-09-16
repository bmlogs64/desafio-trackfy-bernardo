import { Request, Response } from "express";
import { registrarPresenca, listarPresencas } from "../services/presencaService";

export async function criarPresenca(req: Request, res: Response) {
  try {
    const { pessoaID, areaID } = req.body;
    if (!pessoaID || !areaID) {
      return res.status(400).json({ error: "Pessoa e área são obrigatórios" });
    }

    const presenca = await registrarPresenca(Number(pessoaID), Number(areaID));
    res.status(201).json(presenca);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

export async function pegarPresencas(req: Request, res: Response) {
  try {
    const { pessoaID, areaID, inicio, fim } = req.query;

    const presencas = await listarPresencas(
      pessoaID ? Number(pessoaID) : undefined,
      areaID ? Number(areaID) : undefined,
      inicio ? new Date(inicio as string) : undefined,
      fim ? new Date(fim as string) : undefined
    );

    res.json(presencas);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

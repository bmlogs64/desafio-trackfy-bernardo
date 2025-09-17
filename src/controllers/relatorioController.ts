import { Request, Response } from "express";
import { contarPresencasPorPeriodoService, contarPresencasPorAreaService } from "../services/relatorioService";

export async function contarPresencasPorPeriodo(req: Request, res: Response) {
  try {
    const { inicio, fim } = req.query;

    if (!inicio || !fim) {
      return res.status(400).json({ error: "É necessário informar 'inicio' e 'fim'" });
    }

    const resultado = await contarPresencasPorPeriodoService(inicio as string, fim as string);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao contar presenças por período" });
  }
}

export async function contarPresencasPorArea(req: Request, res: Response) {
  try {
    const areaID = req.params.areaID ? Number(req.params.areaID) : undefined;
    const resultado = await contarPresencasPorAreaService(areaID);
    res.json(resultado);
  } catch (error) {
    res.status(500).json({ error: "Erro ao contar presenças por área" });
  }
}

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function registrarPresenca(pessoaID: number, areaID: number) {
  return await prisma.presenca.create({
    data: { pessoaID, areaID },
    include: { pessoa: true, area: true },
  });
}

export async function listarPresencas(
  pessoaID?: number,
  areaID?: number,
  inicio?: Date,
  fim?: Date
) {
  const where: any = {};

  if (pessoaID) where.pessoaID = pessoaID;
  if (areaID) where.areaID = areaID;
  if (inicio && fim) {
    where.dataHora = { gte: inicio, lte: fim };
  }

  return await prisma.presenca.findMany({
    where,
    include: {
      pessoa: true,
      area: true,
    },
    orderBy: { dataHora: "desc" },
  });
}

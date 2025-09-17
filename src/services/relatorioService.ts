import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function contarPresencasPorPeriodoService(inicio: string, fim: string) {
  const contagem = await prisma.presenca.count({
    where: {
      dataHora: {
        gte: new Date(inicio),
        lte: new Date(fim),
      },
    },
  });

  return { inicio, fim, contagem };
}

export async function contarPresencasPorAreaService(areaID?: number) {
  if (areaID) {
    const resultado = await prisma.presenca.count({
      where: { areaID },
    });

    const area = await prisma.area.findUnique({
      where: { id: areaID },
      select: { nome: true,
        id: true
       },
    });

    return {
      area: area?.nome || "Desconhecida",
      contagem: resultado,
      areaID: area?.id
    };
  }

  const resultado = await prisma.presenca.groupBy({
    by: ["areaID"],
    _count: { areaID: true },
  });

  const areas = await prisma.area.findMany({
    where: { id: { in: resultado.map((r) => r.areaID) } },
    select: { id: true, nome: true },
  });

  return resultado.map((r) => ({
    area: areas.find((a) => a.id === r.areaID)?.nome || "Desconhecida",
    contagem: r._count.areaID,
    areaID: r.areaID
  }));
}
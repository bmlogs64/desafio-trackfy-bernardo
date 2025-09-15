import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function criarArea(nome: string, tipo: string, localizacao: string) {
  return await prisma.area.create({
    data: { nome, tipo, localizacao },
  });
}

export async function listarAreas() {
  return await prisma.area.findMany();
}

export async function buscarAreaPorID(id: number) {
  return await prisma.area.findUnique({
    where: { id },
  });
}
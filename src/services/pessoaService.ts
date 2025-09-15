import {PrismaClient} from "@prisma/client"

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function criarPessoa(nome: string, funcao: string, areaID: number) {
  const areaExistente = await prisma.area.findUnique({ where: { id: areaID } });
  if (!areaExistente) {
    throw new Error("Área não encontrada, crie a área antes de criar a pessoa.");
  }

  return await prisma.pessoa.create({
    data: {
      nome,
      funcao,
      areaID,
    },
    include: { area: true },
  });
}

export async function listarPessoas() {
  return await prisma.pessoa.findMany({ include: { area: true } });
}

export async function buscarPessoaPorID(id: number) {
  return await prisma.pessoa.findUnique({
    where: { id },
    include: { area: true },
  });
}

import { inferAsyncReturnType } from "@trpc/server";
import { CreateNextContextOptions } from "@trpc/server/adapters/next";
import { PrismaClient } from "@prisma/client";

export async function createContext(_opts: CreateNextContextOptions) {
  const prisma = new PrismaClient();

  return {
    prisma,
  };
}

export type Context = inferAsyncReturnType<typeof createContext>;

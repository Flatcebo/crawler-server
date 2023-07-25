// // "use client";

import { PrismaClient } from "@prisma/client";
import { Cheerio } from "cheerio";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function createDesc({ data }: any) {
  const result = await prisma.description.createMany({
    data: data,
    skipDuplicates: true,
  });

  // console.log(res);
  // return NextResponse.json({ ok: true, result });
}

import * as cheerio from "cheerio";
import { NextResponse } from "next/server";

import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

type Desc = {
  data?: any;
  title?: cheerio.Cheerio<Element>[] | string[];
  userName?: cheerio.Cheerio<Element>[] | string[];
  // listTitle?: cheerio.Cheerio<Element>[] | string[];
  length?: any;
};

// addr 문제
export async function GET(req: Request, res: Response) {
  const addr =
    "http://jowhang.dinak.co.kr/%EC%A0%90%EC%A3%BC%EC%84%A0%EC%9E%A5%EC%A1%B0%ED%99%A9/view?page=12&sYear=2021&seq=378707&tmp=1";

  const $ = cheerio.load(await fetch(addr).then((res: any) => res.text()));
  let rate = $("div:not([id]).contents");
  console.log(rate.text().trim());
  return NextResponse.json({
    // rate,
    ok: true,
  });
}

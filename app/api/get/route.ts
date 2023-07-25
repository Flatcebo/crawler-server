// "use-client";

import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  await fetch("http://localhost:3000/api", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      uri: "https://innak.kr/bbs/board.php?bo_table=D02_2023&page=1642",
    }),
  });

  return NextResponse.json({ ok: true });
}

// export async function POST(req: Request) {
//   await fetch("http://localhost:3000/api/crawler", {
//     method: "GET",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       uri: "https://innak.kr/bbs/board.php?bo_table=D02_2023&page=162",
//     }),
//   });
//   return NextResponse.json({ ok: true });
// }

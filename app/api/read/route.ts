import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  //   if (req.method !== "GET") {
  //     return NextResponse.json({ error: "허용되지 않는 메서드입니다" });
  //   }

  const params = new URL(req.url).searchParams;
  const keyword: any = params.get("keyword");
  console.log("param =====>", params);
  //   console.log("keyword ===>", keyword);

  const result = await fetch(keyword).then((res: any) => res);

  try {
    const descs = await prisma.description.findMany({
      select: {
        userId: true,
        title: true,
        userName: true,
        mainNumber: true,
      },
      //   where: {
      //     OR: [
      //       { userId: { contains: keyword } },
      //       { userName: { contains: keyword } },
      //     ],
      //   },
      take: 10,
    });

    // return res.status(200).json({ ok: true, descs });
    return NextResponse.json({ descs });
  } catch (error) {
    return NextResponse.json({ error: "내부 서버 오류가 발생했습니다" });
  } finally {
    await prisma.$disconnect();
  }
}
// .then(res => res);
//   console.log(descs);

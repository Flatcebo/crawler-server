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
  const offset: any = params.get("offset");
  const count: any = params.get("count");
  const keyword: any = params.get("keyword");
  console.log("param =====>", params);
  console.log("offset =====>", offset);
  console.log("count =====>", count);
  console.log("keyword =====>", keyword);

  try {
    const allCate = await prisma.tB_Innak_Boat_22.findMany({
      select: {
        userId: true,
        title: true,
        userName: true,
        mainNumber: true,
      },
      where: {
        OR: [
          { userId: { contains: keyword } },
          { userName: { contains: keyword } },
          { title: { contains: keyword } },
          { mainNumber: { contains: keyword } },
        ],
      },
      skip: offset ? parseInt(offset) : undefined,
      take: count ? parseInt(count) : 20,
    });
    const selectCate = await prisma.tB_Innak_Boat_22.findMany({
      select: {
        userId: true,
        title: true,
        userName: true,
        mainNumber: true,
      },
      where: {
        OR: [
          { userId: { contains: keyword } },
          { userName: { contains: keyword } },
        ],
      },
      skip: offset ? parseInt(offset) : undefined,
      take: count ? parseInt(count) : 15,
    });

    // return res.status(200).json({ ok: true, descs });
    return NextResponse.json({ allCate, selectCate });
  } catch (error) {
    return NextResponse.json({ error: "내부 서버 오류가 발생했습니다" });
  } finally {
    await prisma.$disconnect();
  }
}
// .then(res => res);
//   console.log(descs);

//   const result = await fetch(req.url).then((res: any) => res.json());

//   const searchKeyword = async () => {
//     result({
//       dd: await prisma.tB_Innak_Boat_22.findMany({
//         select: {
//           userId: true,
//           title: true,
//           userName: true,
//           mainNumber: true,
//         },
//       }),
//     });
//   };
//     const descs = await prisma.description.findMany({
//         select: {
//           userId: true,
//           title: true,
//           userName: true,
//           mainNumber: true,
//         },
//         //   where: {
//         //     OR: [
//         //       { userId: { contains: keyword } },
//         //       { userName: { contains: keyword } },
//         //     ],
//         //   },
//         take: 10,
//       });
// }

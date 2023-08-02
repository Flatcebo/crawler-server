import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

export async function GET(req: Request) {
  const params = new URL(req.url).searchParams;
  const cate: any = params.get("cate");
  const year: any = params.get("year");
  const offset: any = params.get("offset");
  const count: any = params.get("count");
  const keyword: any = params.get("keyword");
  console.log("param =====>", params);

  let Boat: any = prisma.tB_Innak_Boat_23;

  switch (year) {
    case "2023":
      Boat = prisma.tB_Innak_Boat_23;
      break;
    case "2022":
      Boat = prisma.tB_Innak_Boat_22;
      break;
    case "2021":
      Boat = prisma.tB_Innak_Boat_21;
      break;
  }

  try {
    if (cate == "전체" && keyword) {
      const allCate_Boat_22 = await Boat.findMany({
        select: {
          userId: true,
          title: true,
          userName: true,
          mainNumber: true,
        },
        // 검색기능 입력한 키워드 값을 해당 컬럼들에 조회한다
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

      return NextResponse.json({ allCate_Boat_22 });
    } else if (cate == "업체명" && keyword) {
      const userNameCate_Boat_22 = await prisma.tB_Innak_Boat_22.findMany({
        select: {
          userId: true,
          title: true,
          userName: true,
          mainNumber: true,
        },
        where: {
          OR: [{ userName: { contains: keyword } }],
        },
        skip: offset ? parseInt(offset) : undefined,
        take: count ? parseInt(count) : 20,
      });
      return NextResponse.json({ userNameCate_Boat_22 });
    } else if (cate == "유저 아이디" && keyword) {
      const userIdCate_Boat_22 = await prisma.tB_Innak_Boat_22.findMany({
        select: {
          userId: true,
          title: true,
          userName: true,
          mainNumber: true,
        },
        where: {
          OR: [{ userId: { contains: keyword } }],
        },
        skip: offset ? parseInt(offset) : undefined,
        take: count ? parseInt(count) : 20,
      });
      return NextResponse.json({ userIdCate_Boat_22 });
    } else if (cate == "글제목" && keyword) {
      const titleCate_Boat_22 = await prisma.tB_Innak_Boat_22.findMany({
        select: {
          userId: true,
          title: true,
          userName: true,
          mainNumber: true,
        },
        where: {
          OR: [{ title: { contains: keyword } }],
        },
        skip: offset ? parseInt(offset) : undefined,
        take: count ? parseInt(count) : 20,
      });
      return NextResponse.json({ titleCate_Boat_22 });
    } else if (cate == "대표번호" && keyword) {
      const mainNumberCate_Boat_22 = await prisma.tB_Innak_Boat_22.findMany({
        select: {
          userId: true,
          title: true,
          userName: true,
          mainNumber: true,
        },
        where: {
          OR: [{ mainNumber: { contains: keyword } }],
        },
        skip: offset ? parseInt(offset) : undefined,
        take: count ? parseInt(count) : 20,
      });
      return NextResponse.json({ mainNumberCate_Boat_22 });
    }

    // return res.status(200).json({ ok: true, descs });
    // return NextResponse.json({ allCate_Boat_22 });
  } catch (error) {
    return NextResponse.json({ error: "내부 서버 오류가 발생했습니다" });
  } finally {
    await prisma.$disconnect();
  }
}

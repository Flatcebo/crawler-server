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
export async function POST(req: Request, res: Response) {
  const detail = async (addr: string) => {
    const $ = cheerio.load(
      await (await fetch(addr).then((res: any) => res)).text()
    );

    console.log("addr =====>", addr);

    new Array(33).map(i => i);

    const detailImg: any = $(".contents img");
    const detailDesc: any = $(".contents ");

    const detailItems = {
      detailDesc: (detailDesc as any).text().trim() ?? "",
      detailPhoneNumber:
        (detailDesc as any).text().trim().replace(/\D/g, "|") ?? "",
      detailImg:
        [...new Array(detailImg.length)].map((_, i) => {
          // console.log((detailImg as any)[i].attribs.src);
          return (detailImg as any)[i].attribs.src;
        }) ?? "",
    };

    // console.log(detailItems);

    const regex: any =
      /(?=.)(?:02|0[13-9]{1}[0-9]{1})[^0-9]*[0-9]{3,4}[^0-9]*[0-9]{4}/g;
    let result: any = regex.exec(detailItems.detailDesc);
    let results: any = [];
    while (result != null) {
      results.push(result[0]);
      console.log("phone =>", result[0]);
      result = regex.exec(detailItems.detailDesc);
    }

    (detailItems as any).results = results;

    return detailItems;
  };
  //----------------------------------------------------------------------------------------

  const uri = (await req.json()).uri;

  console.log("uri ===>", uri);
  const $ = cheerio.load(
    await (await fetch(uri).then((res: any) => res)).text()
  );

  new Array(50).map(i => i);

  // 리스트 도메인
  const listSubject: any = $(".contents-wrapper tbody td.subject a");
  // 리스트 제목
  const listTitle: any = $(".contents-wrapper tbody td.subject a");
  // 리스트 업체명
  const listName: any | any = $(
    ".contents-wrapper tbody td.writer.member span"
  );
  // // 리스트 게시일
  const listDate: any | any = $(".contents-wrapper tbody td.date");
  // // 리스트 유저 ID
  const listUserId: any | any = $(
    ".contents-wrapper tbody td.writer.member span"
  );
  // 리스트 지역
  const listRegion: any = $(".contents-wrapper tbody td.region span");
  // 리스트 글번호
  const listNumb: any = $(".contents-wrapper tbody td.no");
  // 리스트 타입
  const listType: any = $(".contents-wrapper tbody td.type .typeicon");

  // -----------------------------------------------------------
  // 데이터 찢어줌
  const items: any = await Promise.all(
    [...new Array(listSubject.length)].map(async (_, i) => ({
      addr: (await detail((listSubject as any)[i]?.attribs.href)) ?? "",
      listTitle: (listTitle as any)[i]
        ? (listTitle as any)[i]?.children[0].data.trim()
        : undefined,
      listSubject: (listSubject as any)[i]?.attribs.href ?? "",
      listName: (listName as any)[i]?.children[0].data ?? "",
      listDate: (listDate as any)[i]?.children[0].data.trim() ?? "",
      listUserId:
        (listUserId as any)[i]?.attribs.onclick
          .split(",")[3]
          .replaceAll("'", "")
          .trim() ?? "",
      listRegion: (listRegion as any)[i]?.children[0].data.trim() ?? "",
      listNumb: (listNumb as any)[i]?.children[0].data ?? "",
      listType: (listType as any)[i]?.children[0].data ?? "",
    }))
  );

  // -----------------------------------------------------------------------------------------------------

  const user = await prisma.tB_Dinak_Master_20.createMany({
    data: items.map((value: any) => ({
      title: value.listTitle,
      userName: value.listName,
      userId: value.listUserId,
      uploadDate: value.listDate,
      url: value.listSubject,
      type: value.listType,
      numb: value.listNumb,
      region: value.listRegion,
      imageURL: value.addr.detailImg.join(", "),
      mainNumber: value.addr.results[0],
      phoneNumber: value.addr.results.join(", ").replace(/\D/g, ","),
      desc: value.addr.detailDesc,
      country: undefined,
      fish: undefined,
      tag: undefined,
    })),
    skipDuplicates: true,
  });

  return NextResponse.json({ items, user });
}

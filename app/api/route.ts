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

    const detailImg: any = $(".view-img img");
    const detailDesc: any = $(".view-content");

    const detailItems = {
      detailDesc: (detailDesc as any).text().trim() ?? "",
      detailPhoneNumber:
        (detailDesc as any).text().trim().replace(/\D/g, "|") ?? "",
      detailImg:
        [...new Array(detailImg.length)].map((_, i) => {
          console.log((detailImg as any)[i].attribs.src);
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
    await //
    (await fetch(uri).then((res: any) => res)).text()
  );

  new Array(50).map(i => i);

  // 리스트 도메인
  const listSubject: Desc = $(
    "#list-body .list-item:not(.bg-light) .wr-subject a.item-subject"
  );
  // 리스트 제목
  const listTitle: Desc = $(
    "#list-body .list-item .wr-subject a.item-subject span:first-child"
  );
  // 리스트 업체명
  const listName: Desc | any = $(
    "#list-body .list-item:not(.bg-light) .wr-name .member"
  );
  // 리스트 게시일
  const listDate: Desc | any = $(
    "#list-body .list-item:not(.bg-light) .wr-date"
  );
  // 리스트 유저 ID
  const listUserId: Desc | any = $(
    "#list-body .list-item:not(.bg-light) .wr-name a"
  );

  // [...document.querySelectorAll(".list-item > .wr-subject > a > .wr-icon")].map(item => item.nextSibling.data.trim())

  // 지역 링크
  const countryNav = $(".nav li");
  // 지역 이름
  const countryName = $(".nav li a");

  const cate: any = [...new Array(countryNav.length)].map((_, i) => ({
    countryNav: (countryNav as any)[i].children[1].attribs?.href,
    countryName: (countryName as any)[i].children[0].data.trim(),
  }));

  // -----------------------------------------------------------
  // 데이터 찢어줌
  const items: any = await Promise.all(
    [...new Array(listSubject.length)].map(async (_, i) => ({
      addr: (await detail((listSubject as any)[i]?.attribs.href)) ?? "",
      listTitle: (listTitle as any)[i]
        ? (listTitle as any)[i]?.next.data.trim()
        : undefined,
      listSubject: (listSubject as any)[i]?.attribs.href ?? "",
      listName: (listName as any)[i]?.children[0].data ?? "",
      listDate: (listDate as any)[i]?.children[0].data.trim() ?? "",
      listUserId:
        (listUserId as any)[i]?.attribs.onclick
          .split(",")[1]
          .replaceAll("'", "")
          .trim() ?? "",
    }))
  );

  // -----------------------------------------------------------------------------------------------------

  const user = await prisma.tB_Innak_Rock_23.createMany({
    data: items.map((value: any) => ({
      title: value.listTitle,
      userName: value.listName,
      userId: value.listUserId,
      uploadDate: value.listDate,
      url: value.listSubject,
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

  return NextResponse.json({ cate, items, user });
}

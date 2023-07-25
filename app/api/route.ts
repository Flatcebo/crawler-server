import * as cheerio from "cheerio";
import { NextResponse } from "next/server";
import { createDesc } from "./create";
import { PrismaClient } from "@prisma/client";

export const dynamic = "force-dynamic";

const prisma = new PrismaClient();

type Desc = {
  data?: any;
  title?: cheerio.Cheerio<Element> | string;
  userName?: cheerio.Cheerio<Element> | string;
  length?: any;
};

// addr 문제
export async function POST(req: Request, res: Response) {
  const detail = async (addr: string) => {
    // if (addr === undefined) {
    //   return undefined;
    // }

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
      detailImg: [...new Array(detailImg.length)].map((_, i) => {
        console.log((detailImg as any)[i].attribs.src);
        return (detailImg as any)[i].attribs.src;
      }),
    };

    // const detailItems: any = [...new Array(detailImg.length)].map((_, i) => ({
    //   detailDesc: console.log((detailDesc as any).text().trim() ?? ""),
    //   detailPhoneNumber:
    //     (detailDesc as any).text().trim().replace(/\D/g, "|") ?? "",
    //   detailImg: (detailImg as any)[i]?.attribs.src ?? "",
    // }));

    const regex: any =
      /(?=.)(?:02|0[13-9]{1}[0-9]{1})[^0-9]*[0-9]{3,4}[^0-9]*[0-9]{4}/g;
    let result: any = regex.exec(detailItems.detailDesc);
    let results: any = [];
    while (result != null) {
      results.push(result[0]);
      console.log("phone =>", result[0]);
      result = regex.exec(detailItems.detailDesc);
    }

    // if ('aaa' == 'aaa') {
    // try {
    //   Create(prisma, {
    //     desc: detailItems.detailDesc ?? "",
    //     imageURL: detailItems.detailImg ?? "NO IMAGE",
    //     phoneNumber: results ?? "",
    //   });
    // } catch (err) {
    //   console.log("error =>", err);
    // } finally {
    //   await prisma.$disconnect();
    // }
    // }

    (detailItems as any).results = results;

    // const user = await prisma.description.createMany({
    //   data: detailItems.map((value: any) => ({
    //     imageURL: value.detailImg,
    //     // phoneNumber: value.results
    //   })),
    // });

    return detailItems;
  };
  const uri = (await req.json()).uri;

  // const params = new URL(req.url).searchParams;
  // const addr: any = params.get("addr");

  console.log("uri ===>", uri);
  const $ = cheerio.load(
    await //
    (await fetch(uri).then((res: any) => res)).text()
  );
  // console.log($.root().children()[0].children);

  new Array(50).map(i => i);
  // * table = 지역이름
  // 주소 내의 table=,id= 분리해서 DB에 저장

  // 리스트 도메인
  const listSubject: Desc = $(
    "#list-body .list-item .wr-subject a.item-subject"
  );
  // 리스트 제목
  const listTitle: Desc = $(
    "#list-body .list-item .wr-subject a.item-subject span"
  );
  // 리스트 업체명
  const listName: Desc | any = $("#list-body .list-item .wr-name .member"); // 이미지 파일로 된 업체명은 못가져옴
  // 리스트 게시일
  const listDate: Desc | any = $("#list-body .list-item .wr-date");
  // 리스트 유저 ID
  const listUserId: Desc | any = $("#list-body .list-item .wr-name a");

  // 지역 링크
  const countryNav = $(".nav li");
  // 지역 이름
  const countryName = $(".nav li a");

  // console.log((countryName as any)[0].children[0].data.trim());
  const cate: any = [...new Array(countryNav.length)].map((_, i) => ({
    countryNav: (countryNav as any)[i].children[1].attribs?.href,
    countryName: (countryName as any)[i].children[0].data.trim(),
  }));

  // listSubject, listTitle length 문제
  // https://innak.kr/bbs/board.php?bo_table=D02_2023&page=173 , 245

  // 업체명이 이미지 파일이거나 없는 경우에 어레이 렝스오류
  // , 사용시 다른 레이블로 글이 넘어감

  // const items = [...new Array(listTitle.length)].map((_, i) => ({
  const items: any = await Promise.all(
    [...new Array(listSubject.length)].map(async (_, i) => ({
      // akak: console.log(
      //   await detail((listSubject as any)[i]?.attribs.href ?? "")
      // ),
      phoneNumbers: console.log(await detail((listSubject as any)[i])),
      listTitle: (listTitle as any)[i]?.next.data.trim() ?? "",
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

  console.log(detail((listSubject as any)[0].attribs.href));
  // -----------------------------------------------------------------------------------------------------

  // const item: any = [...new Array(listTitle.length)].map((_, i) => ({
  //   listTitle: (listTitle as any)[i].next.data.trim(),
  // }));

  // console.log((listName as any)[1].children[0].data);
  // countryNav: (countryNav as any)[i].href,

  // console.log((listUserId as any)[0].attribs.onclick);
  const user = await prisma.description.createMany({
    data: items.map((value: any) => ({
      title: value.listTitle,
      userName: value.listName,
      // uploadDate: (listDate as any)[0].children[0].data.trim(),
      // imageURL: (listSubject as any).attribs.href,
      country: undefined,
      fish: undefined,
      tag: undefined,
      phoneNumber: value.results,
    })),
    skipDuplicates: true,
  });

  // await fetch("http://localhost:3000/api/get", {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     listSubject,
  //   }),
  // });

  return NextResponse.json({ cate, items, user });
}

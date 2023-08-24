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
    // 썸네일 이미지
    const detailThumbImg: any = $(
      ".view-wrap .row .img-container .panel #ode_pvi_big a"
    );
    // 설명글 내의 이미지
    const detailDescImg: any = $(".list-group-item .view-content a");
    // 페이지 내의 설명글
    const detailDesc: any = $(".view-content");
    // 패이지 내의 패널 상호/어선명
    const detailPanelBoatName: any = $(
      ".view-wrap .row .img3 div.panel .list-group-item:nth-child(2) div:nth-child(2)"
    );
    // 패이지 내의 패널 개업 일자
    const detailPanelOpenedAt: any = $(
      ".view-wrap .row .img3 div.panel .list-group-item:nth-child(3) div:nth-child(2)"
    );
    // 페이지 내의 패널 홈페이지
    const detailPanelHomePage: any = $(
      ".view-wrap .row .img3 div.panel .list-group-item:nth-child(4) div:nth-child(2) a"
    );
    // 페이지 내의 패널 전화번호
    const detailPanelNumber: any = $(
      ".view-wrap .row .img3 div.panel .list-group-item:nth-child(5) div:nth-child(2)"
    );
    // 페이지 내의 패널 주소
    const detailPanelLocation: any = $(
      ".view-wrap .row .img3 div.panel .list-group-item:nth-child(6) div:nth-child(2)"
    );
    // 페이지 내의 패널 낚시장르
    const detailPanelGenre: any = $(
      ".view-wrap .row .img3 div.panel .list-group-item:nth-child(7) div:nth-child(2)"
    );

    const detailItems = {
      // 페이지 내의 설명글
      detailDesc: (detailDesc as any).text().trim() ?? "",
      // 설명글 내의 전화번호
      detailDescPhoneNumber:
        (detailDesc as any).text().trim().replace(/\D/g, "|") ?? "",
      // 썸네일 이미지
      detailThumbImg:
        [...new Array(detailThumbImg.length)].map((_, i) => {
          //   console.log((detailThumbImg as any)[i].attribs.href);
          return (detailThumbImg as any)[i].attribs.href;
        }) ?? "",
      // 설명글 내의 이미지
      detailDescImg:
        [...new Array(detailDescImg.length)].map((_, i) => {
          //   console.log((detailDescImg as any)[i].attribs.href);
          return (detailDescImg as any)[i].attribs.href;
        }) ?? "",
      detailPanelBoatName: (detailPanelBoatName as any).text() ?? "",
      detailPanelOpenedAt: (detailPanelOpenedAt as any).text() ?? "",
      detailPanelHomePage:
        [...new Array(detailPanelHomePage.length)].map((_, i) => {
          //   console.log((detailDescImg as any)[i].attribs.href);
          return (detailPanelHomePage as any)[i].attribs.href;
        }) ?? "",
      detailPanelNumber: (detailPanelNumber as any).text() ?? "",
      detailPanelLocation: (detailPanelLocation as any).text() ?? "",
      detailPanelGenre: (detailPanelGenre as any).text() ?? "",
    };

    // 설명글 내의 전화번호 정규식 처리
    const regex: any =
      /(?=.)(?:02|0[13-9]{1}[0-9]{1})[^0-9]*[0-9]{3,4}[^0-9]*[0-9]{4}/g;
    let result: any = regex.exec(detailItems.detailDesc);
    let results: any = [];
    while (result != null) {
      results.push(result[0]);
      //   console.log("phone =>", result[0]);
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
  //   const listTitle: Desc = $(
  //     "#list-body .list-item .wr-subject a.item-subject span:first-child"
  //   );
  const listNonSpanTitle: any = $("#list-body .list-item .wr-subject a")
    .map(function () {
      return $(this).clone().children().remove().end().text().trim();
    })
    .get() // map() 결과를 배열로 변환
    .filter((title: any) => title !== ""); // 빈 값 필터링;

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

  // 지역 링크
  //   const countryNav = $(".nav li");
  //   // 지역 이름
  //   const countryName = $(".nav li a");

  //   const cate: any = [...new Array(countryNav.length)].map((_, i) => ({
  //     countryNav: (countryNav as any)[i].children[1].attribs?.href,
  //     countryName: (countryName as any)[i].children[0].data.trim(),
  //   }));

  //   openedAt
  //   homePage
  //   location
  //   genre

  // -----------------------------------------------------------
  // 데이터 찢어줌
  const items: any = await Promise.all(
    [...new Array(listSubject.length)].map(async (_, i) => {
      if (listSubject.length === 0) {
        return null; // 빈 배열이 생길 경우 null 반환
      }

      const addr = (await detail((listSubject as any)[i]?.attribs.href)) ?? "";
      const listNonSpanTitleValue = (listNonSpanTitle as any)[i] ?? "";
      const listSubjectValue = (listSubject as any)[i]?.attribs.href ?? "";
      const listNameValue = (listName as any)[i]?.children[0].data ?? "";
      const listDateValue = (listDate as any)[i]?.children[0].data.trim() ?? "";
      const listUserIdValue =
        (listUserId as any)[i]?.attribs.onclick
          .split(",")[1]
          .replaceAll("'", "")
          .trim() ?? "";

      return {
        addr,
        listSubject: listSubjectValue,
        listName: listNameValue,
        listDate: listDateValue,
        listUserId: listUserIdValue,
        listTitle: listNonSpanTitleValue,
      };
    })
  );

  // 빈 배열 제거
  //   const filteredItems = items.filter((item: any) => item !== null);
  const filteredItems = items.filter((item: any) =>
    Object.values(item).every(val => val !== "")
  );
  // -----------------------------------------------------------------------------------------------------

  const user = await prisma.tB_Innak_OnlyBoat.createMany({
    data: items.map((value: any) => ({
      title: value.listTitle,
      userName: value.listName,
      userId: value.listUserId,
      url: value.listSubject,
      imageURL:
        value.addr.detailThumbImg.join(", ") &&
        value.addr.detailDescImg.join(", "),
      mainNumber: value.addr.detailPanelNumber,
      phoneNumber: value.addr.results.join(", ").replace(/\D/g, ","),
      desc: value.addr.detailDesc,
      country: undefined,
      fish: undefined,
      tag: undefined,
      openedAt: value.addr.detailPanelOpenedAt,
      homePage: value.addr.detailPanelHomePage.join(", "),
      location: value.addr.detailPanelLocation,
      genre: value.addr.detailPanelGenre,
      boatName: value.addr.detailPanelBoatName,
    })),
    skipDuplicates: true,
  });

  return NextResponse.json({ items, user });
}

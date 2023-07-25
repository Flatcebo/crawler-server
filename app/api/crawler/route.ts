// import { PrismaClient } from "@prisma/client";
// import * as cheerio from "cheerio";
// import { NextResponse } from "next/server";

// export async function GET(req: Request) {
//   const prisma = new PrismaClient();

//   const params = new URL(req.url).searchParams;
//   const addr: any = params.get("addr");
//   // const uri = (await req.json()).uri;

//   // console.log("url =====>", req.url);

//   const $ = cheerio.load(
//     await (await fetch(addr).then((res: any) => res)).text()
//   );

//   new Array(33).map(i => i);

//   const detailImg = $(".view-img img");
//   const detailDesc = $(".view-content");

//   const detailItems = {
//     detailDesc: (detailDesc as any).text().trim() ?? "",
//     detailPhoneNumber:
//       (detailDesc as any).text().trim().replace(/\D/g, "|") ?? "",
//     detailImg: [...new Array(detailImg.length)].map((_, i) => {
//       console.log((detailImg as any)[i].attribs.src);
//       return (detailImg as any)[i].attribs.src;
//     }),
//   };

//   // const detailItems: any = [...new Array(detailImg.length)].map((_, i) => ({
//   //   detailDesc: console.log((detailDesc as any).text().trim() ?? ""),
//   //   detailPhoneNumber:
//   //     (detailDesc as any).text().trim().replace(/\D/g, "|") ?? "",
//   //   detailImg: (detailImg as any)[i]?.attribs.src ?? "",
//   // }));

//   const regex: any =
//     /(?=.)(?:02|0[13-9]{1}[0-9]{1})[^0-9]*[0-9]{3,4}[^0-9]*[0-9]{4}/g;
//   let result: any = regex.exec(detailItems.detailDesc);
//   let results: any = [];
//   while (result != null) {
//     results.push(result[0]);
//     console.log("phone =>", result[0]);
//     result = regex.exec(detailItems.detailDesc);
//   }

//   // if ('aaa' == 'aaa') {
//   // try {
//   //   Create(prisma, {
//   //     desc: detailItems.detailDesc ?? "",
//   //     imageURL: detailItems.detailImg ?? "NO IMAGE",
//   //     phoneNumber: results ?? "",
//   //   });
//   // } catch (err) {
//   //   console.log("error =>", err);
//   // } finally {
//   //   await prisma.$disconnect();
//   // }
//   // }

//   (detailItems as any).results = results;

//   // const user = await prisma.description.createMany({
//   //   data: detailItems.map((value: any) => ({
//   //     imageURL: value.detailImg,
//   //     // phoneNumber: value.results
//   //   })),
//   // });

//   return NextResponse.json({ detailItems });
// }

// // console.log((countryName as any).children()[0].children[0].data.trim());

// //   console.log((img as any).children()[0].attribs.content || src);

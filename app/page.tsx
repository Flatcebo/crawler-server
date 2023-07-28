"use client";

import useMutation from "@/lib/client/useMutation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import useSWR from "swr";

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [keyword, setKeyword] = useState("");
  const [searchData, setSearchData] = useState<any>("");

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setMounted(true);
  }, []);
  const fetcher = (offset: any, count: any, keyword: any) =>
    fetch(`/api/read?offset=${offset}&count=${count}&keyword=${keyword}`)
      .then((res: any) => res.json())
      .then((data: any) => {
        return data;
      })
      .catch((error: any) => console.log("error => ", error));

  //   console.log("swr data ===>", data.descs);
  //   console.log(data);

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    console.log(e.target.value);
  };

  const onSubmits = async () => {
    // setSearchData(searchData);
    const res = await fetcher(0, 0, searchData);

    // console.log("datas =>", datas);
  };

  //   const sendDataToServer = async () => {
  //     // const dataToSend = { key1: "value1", key2: "value2" };

  //     return sendDataToServer;
  //   };

  // sendDataToServer 함수를 호출하여 데이터를 서버로 보냅니다.
  //   sendDataToServer();
  //   const itemsPerPage = 10;
  //   const [currentPage, setCurrentPage] = useState(1);
  //   //   const [displayedData, setDisplayedData] = useState([]);

  //   useEffect(() => {
  //     // Calculate the starting and ending index for the current page
  //     const startIndex = (currentPage - 1) * itemsPerPage;
  //     const endIndex = startIndex + itemsPerPage;

  //     // Slice the data array to get the data for the current page
  //     const currentData = datas.slice(startIndex, endIndex);

  //     setSearchData(currentData);
  //   }, [currentPage]);

  //   const totalPages = Math.ceil(datas.length / itemsPerPage);

  //   const handleNextPage = () => {
  //     if (currentPage < totalPages) {
  //       setCurrentPage(prevPage => prevPage + 1);
  //     }
  //   };

  //   const handlePrevPage = () => {
  //     if (currentPage > 1) {
  //       setCurrentPage(prevPage => prevPage - 1);
  //     }
  //   };

  //   console.log(data);

  //   const list: any = [];
  //   for (const it of addrs) {
  //     const result = await fetch(`/api?addr=${encodeURIComponent(it)}`)
  //       .then(res => res.json())
  //       .then(res => (res as any).detailItems)
  //       .catch(error => console.log("error => ", error));
  //     // console.log(result);

  //     list.push(result);
  //   }
  //   setEtc(list);

  const onClickResults = async (e: React.MouseEvent<HTMLButtonElement>) => {};

  return (
    <>
      <div className="relative">
        <div className="flex justify-center  mt-[3%] ">
          <div className="flex justify-center">
            <form onSubmit={handleSubmit(onSubmits)}>
              <input
                {...register("searchData")}
                type="search"
                className=" w-[500px] p-[20px] text-[22px]  bg-[#99ff001b] outline-[1px] outline "
                value={searchData}
                onChange={onSearchInput}
              />
              <button
                type="submit"
                className="p-[25px] w-[100px]  bg-[#ff00001b]"
                onClick={onClickResults}
                onSubmit={handleSubmit(onSubmits)}
              >
                검색
              </button>
            </form>
          </div>
          {/* {data &&
            data.descs.map((items: any, i: any) => (
              <div className="flex flex-col">
                <div key={i} className="outline">
                  {items.userId}{" "}
                </div>
                
              </div>
            ))} */}
        </div>
        {mounted && (
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-[3%]">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    번호
                  </th>
                  <th scope="col" className="px-6 py-3">
                    업체명
                  </th>
                  <th scope="col" className="px-6 py-3">
                    유저 아이디
                  </th>
                  <th scope="col" className="px-6 py-3">
                    글 제목
                  </th>
                  <th scope="col" className="px-6 py-3">
                    대표 번호
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    1
                  </th>
                  <td className="px-6 py-4">투비피싱낚시호</td>
                  <td className="px-6 py-4">tobe02139</td>
                  <td className="px-6 py-4">[목포] 오늘 조황 미쳤습니다.</td>
                  <td className="px-6 py-4">
                    010,5555,5555
                    {/* <a
                      href="#"
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Edit
                    </a> */}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* <div>
          <ul>
            {searchData.map((item: any) => (
              <li key={item.id}>{item.name}</li>
            ))}
          </ul>
          <button onClick={handlePrevPage} disabled={currentPage === 1}>
            이전 페이지
          </button>
          <span>{currentPage}</span>
          <button
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
          >
            다음 페이지
          </button>
        </div> */}
      </div>
    </>
  );
}

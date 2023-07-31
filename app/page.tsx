"use client";

import ExcelDownload from "@/components/ExcelDownload";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import Paginations from "react-js-pagination";
import Pagenation from "@/components/Pagenation";

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<any>([]);
  const [searchData, setSearchData] = useState<any>("");
  const [cateData, setCateData] = useState<any>("");
  const [dropdown, setDropdown] = useState<boolean>(false);
  let [offset, setOffset] = useState<any>(0);
  let [count, setCount] = useState<any>(1);
  const [pageNumber, setPageNumber] = useState<any>(0);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    setMounted(true);
  }, []);

  const fetcher = (offset: any, count: any, keyword: any) =>
    fetch(`/api/read?offset=${offset}&count=${count}&keyword=${keyword}`)
      .then((res: any) => res.json())
      .then((data: any) => {
        console.log(data);
        setSearchResults(data);
        return data;
      })
      .catch((error: any) => console.log("error => ", error));

  const onSearchInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchData(e.target.value);
    // console.log(e.target.value);
  };

  const onSubmits = async () => {
    // 20;
    // setSearchData(searchData);
    // console.log("offset =>", offset);
    // console.log("count =>", count);
    const res = await fetcher((pageNumber - 1) * 20, 20, searchData);

    // console.log("datas =>", datas);
  };

  const onClickNext = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log("asdjflkasjdf");
    // setOffset(offset + 20);
    // setCount(20);
    setPageNumber(pageNumber + 1);
  };
  const onClickPrev = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (pageNumber === 0) {
      return;
    }
    setPageNumber(pageNumber - 1);
  };

  return (
    <div className="relative">
      <div className="mt-[3%] mx-[30%]">
        <form onSubmit={handleSubmit(onSubmits)}>
          <div className="flex h-[5rem] ">
            <label
              htmlFor="search-dropdown"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white outline"
            >
              Your Email
            </label>

            {dropdown ? (
              // 드롭다운 on
              <div className="">
                <button
                  id="dropdown-button"
                  data-dropdown-toggle="dropdown"
                  className="flex-shrink-0 z-10 inline-flex items-center justify-evenly w-[11rem] h-[5rem] py-2.5 px-4 text-lg 
                    font-medium text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200  
                    focus:outline-none  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700
                     dark:text-white dark:border-gray-600"
                  type="button"
                  onClick={() => {
                    setDropdown(false);
                  }}
                >
                  전체
                  <svg
                    className="w-3.5 h-5.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                <div
                  id="dropdown"
                  className="z-10 absolute bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
                >
                  <ul
                    className="py-2 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdown-button"
                  >
                    <li>
                      <button
                        type="button"
                        // onChange={sear}
                        // onClick={onClickResults}
                        // onSubmit={handleSubmit(onSubmits)}
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        업체명
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        유저 아이디
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        글제목
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        className="inline-flex w-full px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        대표번호
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            ) : (
              <div className="flex">
                <button
                  id="dropdown-button"
                  data-dropdown-toggle="dropdown"
                  className="flex-shrink-0 z-10 inline-flex items-center justify-evenly w-[11rem] h-[5rem] py-2.5 px-4 text-lg font-medium 
                    text-center text-gray-900 bg-gray-100 border border-gray-300 rounded-l-lg hover:bg-gray-200 
                    focus:outline-none  dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-700
                     dark:text-white dark:border-gray-600"
                  type="button"
                  onClick={() => {
                    setDropdown(true);
                  }}
                >
                  전체
                  <svg
                    className="w-3.5 h-5.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* </div> */}
              </div>
            )}
            <div className="relative w-full ">
              <input
                type="search"
                id="search-dropdown"
                className="block p-3.5 w-full h-[5rem] z-20 text-xl text-gray-900 bg-gray-50 rounded-r-lg border-l-gray-50
                 border-l-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-l-gray-700 
                  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                placeholder="검색어를 입력해주세요."
                {...register("searchData")}
                value={searchData}
                onChange={onSearchInput}
                // required
              />
              <button
                type="submit"
                className="absolute top-0 right-0 p-2.5 text-sm font-medium h-full text-white bg-blue-700 rounded-r-lg border
                 border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600
                  dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                <svg
                  className="w-14 h-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
                <span className="sr-only">Search</span>
              </button>
            </div>
          </div>
          <div className="my-[3%]">
            <Pagenation
              value={pageNumber}
              onClickPrev={onClickPrev}
              onClickNext={onClickNext}
            />
          </div>
        </form>
        <div className="flex justify-center">
          {/* <form onSubmit={handleSubmit(onSubmits)}>
              <input
              type="search"
              className=" w-[500px] p-[20px] text-[22px]  bg-[#99ff001b] outline-[1px] outline "
              {...register("searchData")}
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
            </form> */}
        </div>
      </div>
      {/* <div className="my-[2%] flex justify-centerf"> */}

      {/* </div> */}

      {mounted && (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mx-[10%]">
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

            {searchResults?.allCate?.map((items: any, i: any) => (
              <tbody key={i}>
                <tr className="bg-white border-b dark:bg-gray-900 dark:border-gray-700">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {i + 1}
                  </th>
                  <td className="px-6 py-4">{items.userName}</td>
                  <td className="px-6 py-4">{items.userId}</td>
                  <td className="px-6 py-4">{items.title}</td>
                  <td className="px-6 py-4">{items.mainNumber}</td>
                </tr>
              </tbody>
            ))}
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
  );
}

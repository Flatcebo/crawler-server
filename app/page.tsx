"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <div className="relative">
        <div className="flex justify-center  mt-[5px] ">
          <div className="flex justify-center">
            <input
              type="search"
              className=" w-[500px] p-[20px] text-[22px]  bg-[#99ff001b] outline-[1px] outline "
            />
            <button
              type="submit"
              className="p-[25px] w-[100px]  bg-[#ff00001b]"
            >
              검색
            </button>
          </div>
        </div>
        {mounted && (
          <div className="flex justify-center">
            <table>
              <thead>
                <tr>
                  <th>Items</th>
                  <th>Expenditure</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th>Donuts</th>
                  <td>3,000</td>
                </tr>
                <tr>
                  <th>Stationery</th>
                  <td>18,000</td>
                </tr>
              </tbody>
              {/* <tfoot>foot</tfoot> */}
            </table>
          </div>
        )}
      </div>
    </>
  );
}

"use client";

export default function Home() {
  return (
    <div className="relative">
      <div className="flex justify-center  mt-[5px] ">
        <div className="flex justify-center">
          <input
            type="search"
            className=" w-[500px] p-[20px] text-[22px]  bg-[#99ff001b] outline-[1px] outline "
          />
          <button type="submit" className="p-[25px] w-[100px]  bg-[#ff00001b]">
            검색
          </button>
        </div>
      </div>
      <div className="flex justify-center">
        <table>
          <thead>
            <th>aaa</th>
          </thead>

          <tbody>
            <tr>
              <td>1</td>
              <td>2</td>
            </tr>
            <tr>
              <td>1</td>
              <td>2</td>
            </tr>
          </tbody>

          <tfoot>foot</tfoot>
        </table>
      </div>
    </div>
  );
}

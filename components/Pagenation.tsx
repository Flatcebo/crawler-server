"use client";

const Pagenation = ({ onClickPrev, onClickNext, value }: any) => {
  return (
    <div className="my-[2%]">
      <nav aria-label="Page navigation example" className="flex justify-center">
        <div className="flex items-center -space-x-px h-10 text-base">
          <div>
            <button
              onClick={e => onClickPrev(e)}
              className="flex items-center justify-center px-6 h-[4rem] ml-0 leading-tight text-gray-500 bg-white border
                 border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700
                  dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Previous</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M5 1 1 5l4 4"
                />
              </svg>
            </button>
          </div>

          <input
            type="text"
            className="flex text-center items-center justify-center px-2 h-[4rem] w-[4rem] leading-tight text-gray-500 bg-white border border-gray-300
                 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                  dark:hover:bg-gray-700 dark:hover:text-white"
            value={value}
          />

          <div>
            <button
              onClick={e => onClickNext(e)}
              className="flex items-center justify-center px-6 h-[4rem] leading-tight text-gray-500 bg-white border border-gray-300 
                rounded-r-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400
                 dark:hover:bg-gray-700 dark:hover:text-white"
            >
              <span className="sr-only">Next</span>
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 6 10"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 9 4-4-4-4"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Pagenation;

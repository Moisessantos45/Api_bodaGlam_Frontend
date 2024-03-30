import Post from "../Components/Post";

const Home = (): JSX.Element => {
  return (
    <>
      <main className="bg-white md:p-8 p-4 rounded-md w-full mt-5 md:mt-0">
        <div className=" grid md:grid-cols-[max-content_1fr] grid-cols-2 md:grid-rows-1 grid-rows-2 gap-5 place-items-center md:place-items-stretch">
          <div className=" w-auto flex flex-col mr-auto md:mr-0 col-start-1 row-start-1 flex-grow px-3">
            <h2 className="text-gray-600 font-semibold">Publish post</h2>
            <span className="text-xs">All post </span>
          </div>
          <div className="flex bg-gray-100 items-center p-2 rounded-md md:w-9/12 w-full md:col-start-2 col-span-2 md:row-start-1 row-start-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-400"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
            <input
              className="bg-gray-50 outline-none ml-1 block w-full"
              type="text"
              name=""
              id=""
              placeholder="search..."
            />
          </div>
          <div className=" space-x-8 md:col-start-3 col-start-2 row-start-1 w-auto justify-self-end">
            <button className="bg-indigo-600 px-4 py-2 rounded-md text-white font-semibold tracking-wide cursor-pointer">
              New Post
            </button>
          </div>
        </div>
        <Post />
      </main>
    </>
  );
};

export default Home;

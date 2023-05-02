import Image from "next/image";
import bar from "../../../public/barcelona.jpg";

export const Trending = () => {
  return (
    <div className="md:px-16 px-4 my-6">
      <p className="md:block text-md hidden text-ankasa-blue">TRENDING</p>
      <p className="text-2xl text-black md:font-bold">Trending Destinations</p>
      <div className="h-64 w-52 bg-gray-500 rounded-2xl mx-4 md:hidden flex"></div>
      <div className="text-black my-4 hidden md:flex justify-center">
        {/* 1 */}
        <div
          className="h-72 w-52 rounded-2xl mx-4 flex-col flex justify-end p-3 text-xl font-bold text-white"
          style={{
            backgroundImage: `url(${bar.src})`,
          }}
        >
          <p>Barcelona,</p>
          <p>Spain</p>
        </div>
        {/* 2 */}
        <div
          className="h-72 w-52 rounded-2xl mx-4 flex-col flex justify-end p-3 text-xl font-bold text-white"
          style={{
            backgroundImage: `url(${bar.src})`,
          }}
        >
          <p>Barcelona,</p>
          <p>Spain</p>
        </div>
        {/* 3 */}
        <div
          className="h-72 w-52 rounded-2xl mx-4 flex-col flex justify-end p-3 text-xl font-bold text-white"
          style={{
            backgroundImage: `url(${bar.src})`,
          }}
        >
          <p>Barcelona,</p>
          <p>Spain</p>
        </div>
        {/* 4 */}
        <div
          className="h-72 w-52 rounded-2xl mx-4 flex-col flex justify-end p-3 text-xl font-bold text-white"
          style={{
            backgroundImage: `url(${bar.src})`,
          }}
        >
          <p>Barcelona,</p>
          <p>Spain</p>
        </div>
        {/* 5 */}
        <div
          className="h-72 w-52 rounded-2xl mx-4 flex-col flex justify-end p-3 text-xl font-bold text-white"
          style={{
            backgroundImage: `url(${bar.src})`,
          }}
        >
          <p>Barcelona,</p>
          <p>Spain</p>
        </div>
      </div>
    </div>
  );
};

export const Popular = () => {
  return (
    <div className="md:px-16 px-4 my-4">
      <p className="md:block text-md hidden text-ankasa-blue md:text-center">
        TOP 10
      </p>
      <p className="text-2xl text-black md:font-bold md:text-center">
        Top 10 destinations
      </p>
      <div className="text-black flex my-4 md:w-full md:h-96 md:bg-ankasa-blue md:rounded-2xl">
        <div className="md:hidden h-64 w-52 bg-gray-500 rounded-2xl"></div>
      </div>
    </div>
  );
};

export const Explore = () => {
  return (
    <div className="hidden xl:block md:px-16 px-4 my-4">
      <div className="w-11/12 bg-transparent flex justify-between absolute">
        <div>
          <p className="text-4xl font-extrabold text-black ">
            Find your <span className="text-ankasa-blue">Flight</span>
          </p>
          <p className="text-gray-600 my-4">And explore the world with us</p>
        </div>
        <Image
          src={"/japan.jpg"}
          width={500}
          height={250}
          alt="japan"
          className="rounded-2xl mt-16 hidden xl:block shadow-2xl"
        />
      </div>
      <Image
        src={"/japan.jpg"}
        width={800}
        height={400}
        alt="japan"
        className="rounded-2xl -ml-24 mt-40 shadow-2xl"
      />
    </div>
  );
};

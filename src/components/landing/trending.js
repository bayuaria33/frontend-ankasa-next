export const Trending = () => {
  return (
    <div className="md:px-16 px-4 my-4">
      <p className="md:block text-md hidden text-ankasa-blue">TRENDING</p>
      <p className="text-2xl text-black md:font-bold">Trending Destinations</p>
      <div className="text-black flex my-4">
        <div className="h-64 w-52 bg-gray-500 rounded-2xl"></div>
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
    <div className="hidden md:block md:px-16 px-4 my-4">
      <p className="text-4xl font-extrabold text-black ">
        Find your <span className="text-ankasa-blue">Flight</span>
      </p>
      <p className="text-gray-600 my-4">And explore the world with us</p>
      <div className="w-2/3 h-96 bg-gray-500 rounded-2xl">

      </div>
    </div>
  );
};

import Image from "next/image";
import { Poppins } from "next/font/google";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Forgot() {
  return (
    <main className={`md:flex min-h-screen md:flex-row ${poppins.className}`}>
      <div className="md:flex hidden md:h-screen md:w-1/2 w-screen bg-ankasa-blue items-center justify-center align-middle">
        <Image
          src={"/illustration.svg"}
          width={360}
          height={420}
          priority
          alt="logo"
        />
      </div>
      <div
        className="md:flex-col flex-row md:h-screen h-screen md:w-1/2 bg-white justify-center items-center p-8 md:p-16"
        style={{ color: "black" }}
      >
        <div className="flex mx-6">
          <Image src={"/plane.svg"} width={50} height={34} alt="logo" />
          <p className="text-3xl font-extrabold mx-6">Ankasa</p>
        </div>
        <form className="w-80 my-16 md:flex-col md:mx-auto">
          <p className="text-4xl font-extrabold">Forgot Password</p>
          <div className="my-8">
            <label>Email </label>
            <input
              autoComplete="off"
              id="email"
              name="email"
              type="text"
              className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
              placeholder="Email address"
            />
          </div>
          <button className="bg-ankasa-blue w-full h-16 rounded-md drop-shadow-md">
            <p className="text-white text-bold">Send</p>
          </button>
          <div className="text-center mt-8">
            <p className="text-gray-500">
              You’ll get message soon on your email
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}

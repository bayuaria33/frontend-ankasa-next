import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { BsChevronDown } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";

import { useState } from "react";
import Image from "next/image";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Landing() {
  const [photo, setPhoto] = useState(
    "https://res.cloudinary.com/dedas1ohg/image/upload/v1680685005/peworld_images/Default_pfp_odp1oi_ockrk2.png"
  );
  return (
    <Layout>
      <Head>
        <title>Ankasa App Profile</title>
      </Head>
      <main
        className={`md:flex-row md:flex min-h-screen p-6 px-2 ${poppins.className} bg-ankasa-grey text-black`}
      >
        <div className="md:w-1/5 md:h-screen mx-4 rounded-xl p-2 bg-white">
          <div className="w-full h-full rounded-xl bg-white flex flex-col items-center pt-4 p-1">
            {/* photo */}
            <Image
              src={photo}
              width={120}
              height={120}
              alt="userphoto"
              className="bg-white rounded-full border-2 border-ankasa-blue max-h-32"
            />
            {/* profile info */}
            <button className="border-2 border-ankasa-blue rounded-xl bg-white text-ankasa-blue text-md font-bold p-3 my-4">
              Select Photo
            </button>
            <p className="font-semibold">Mike Kowalski</p>
            <p className="text-sm text-gray-500">Medan, Indonesia</p>
            <div className="w-full h-24 mt-2 pt-2">
              <p className="text-sm font-bold ml-2">Cards</p>
              <div className="w-full h-16 mt-2 bg-ankasa-blue rounded-xl p-3">
                <p className="text-white text-bold text-sm">
                  4441 1235 5512 5551
                </p>
                <p className="text-white text-sm">X - Card</p>
              </div>
            </div>

            <div className="w-full h-8 mt-6 flex-row flex p-2 items-center justify-between text-center hover:text-ankasa-blue">
              <BsPersonCircle color="grey" size={20} />
              <p className="font-bold">Profile</p>
              <BsChevronRight color="grey" size={20} />
            </div>
            <div className="w-full h-8 mt-2 flex-row flex p-2 items-center justify-between hover:text-ankasa-blue">
              <BsFillStarFill color="grey" size={20} />
              <p className="font-bold">My Review</p>
              <BsChevronRight color="grey" size={20} />
            </div>
            <div className="w-full h-8 mt-2 flex-row flex p-2 items-center justify-between hover:text-ankasa-blue">
              <BsFillGearFill color="grey" size={20} />
              <p className="font-bold">Settings</p>
              <BsChevronRight color="grey" size={20} />
            </div>
            <div className="w-full h-8 mt-2 flex-row flex p-2 items-center justify-between hover:text-ankasa-blue">
              <BsFillDoorOpenFill color="grey" size={20} />
              <p className="font-bold">Logout</p>
              <BsChevronRight color="grey" size={20} />
            </div>
          </div>
        </div>
        <div className="md:w-4/5 md:h-full mx-4 mt-2 md:mt-0 rounded-xl p-2 ">
          <div className="w-full h-16 rounded-xl p-2 bg-white">
            <p className="text-md text-ankasa-blue">B O O K I N G S</p>
            <p className="text-lg font-bold text-BLACK">Bookings</p>
          </div>

          {/* book1 */}
          <div className="w-full h-full rounded-xl bg-white mt-2 mr-1 px-3 py-4">
            <p className="font-bold mb-2">Monday, 20 July 2023 - 12.33</p>
            <div className="flex text-2xl font-bold w-44 justify-between my-3">
              <p>IDN</p>
              <Image src="/plane.svg" width={36} height={36} alt="logo" />
              <p>JPN</p>
            </div>
            <p>Garuda Indonesia</p>
            <hr className="h-px my-8 bg-gray-300 border-0 " />
            <div className="font-bold text-xl flex-row flex justify-between align-middle">
              <div className="flex flex-row">
                <p className="text-gray-400 md:mr-16 mr-8">Status</p>
                <div className="w-fit bg-orange-400 p-2 rounded-lg md:text-sm text-xs text-white">
                  <p>Waiting for Payment</p>
                </div>
              </div>
              <div className="flex align-middle text-center items-center w-40 justify-between">
                <p className="text-md text-ankasa-blue">View Details</p>
                <FaChevronDown className="text-ankasa-blue" />
              </div>
            </div>
          </div>

          {/* book2 */}
          <div className="w-full h-full rounded-xl bg-white mt-2 mr-1 px-3 py-4">
            <p className="font-bold mb-2">Monday, 20 July 2023 - 12.33</p>
            <div className="flex text-2xl font-bold w-44 justify-between my-3">
              <p>IDN</p>
              <Image src="/plane.svg" width={36} height={36} alt="logo" />
              <p>JPN</p>
            </div>
            <p>Garuda Indonesia</p>
            <hr className="h-px my-8 bg-gray-300 border-0 " />
            <div className="font-bold text-xl flex-row flex justify-between align-middle">
              <div className="flex flex-row">
                <p className="text-gray-400 md:mr-16 mr-8">Status</p>
                <div className="w-fit bg-green-500 p-2 rounded-lg md:text-sm text-xs text-white">
                  <p>E-ticket Issued</p>
                </div>
              </div>
              <div className="flex align-middle text-center items-center w-40 justify-between">
                <p className="text-md text-ankasa-blue">View Details</p>
                <FaChevronDown className="text-ankasa-blue" />
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

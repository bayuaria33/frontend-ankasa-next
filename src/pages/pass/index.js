import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Pass() {
  return (
    <Layout>
      <Head>
        <title>Booking Pass</title>
      </Head>
      <main
        className={`flex-col flex min-h-screen pt-6 px-2 ${poppins.className} bg-ankasa-blue`}
      >
        <div className="flex flex-col h-auto w-1/2 bg-white rounded-xl mx-auto mt-16 text-black p-12 ">
          <div className="flex w-full justify-between align-middle mb-4">
            <p className="font-bold text-lg">Booking Pass</p>
            <BsThreeDotsVertical className="text-ankasa-blue" size={20} />
          </div>
          <div className="w-auto h-auto bg-white border border-gray-400 rounded-xl p-6 flex justify-between">
            <div className="">
              <div className="flex">
                <Image src={"/garuda.png"} width={100} height={57} alt="garuda"/>
                <div className="flex text-2xl font-bold w-44 justify-between my-3 mx-6">
                  <p>IDN</p>
                  <Image src="/plane.svg" width={36} height={36} alt="logo" />
                  <p>JPN</p>
                </div>
              </div>
              <div className="flex w-auto justify-between mt-4 text-black">
                <p>Code</p>
                <p>Class</p>
              </div>
              <div className="flex w-auto justify-between text-gray-500">
                <p>AB - 221</p>
                <p>Economy</p>
              </div>
              <div className="flex w-auto justify-between mt-4 text-black">
                <p>Terminal</p>
                <p>Gate</p>
              </div>
              <div className="flex w-auto justify-between text-gray-500">
                <p>A</p>
                <p>221</p>
              </div>
              <div className="flex w-auto justify-between mt-4 text-black">
                <p>Departure</p>
              </div>
              <div className="flex w-auto justify-between text-gray-500">
                <p>Monday, 20 July 23 - 12:33</p>
              </div>
            </div>
            <div className="w-16 h-auto flex align-middle ">
              <Image height={265} width={85} src={"/barcode.svg"} alt="barcode" />
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

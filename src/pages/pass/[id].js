import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { BsThreeDotsVertical } from "react-icons/bs";
import Image from "next/image";
import axios from "axios";
import generateBarcode from "../../../lib/barcode";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import formatDate from "../../../lib/formatDate";

const url = "http://localhost:4000/";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });
export async function getServerSideProps(context) {
  const id = context.query.id;
  try {
    const res = await axios.get(url + `bookings/${id}`);
    const data = await res.data.data;
    const formattedData = formatDate(data);

    return { props: { formattedData } };
  } catch (error) {
    return { props: { error: error.message } };
  }
}

export default function Pass({ formattedData, error }) {
  const data =
    formattedData && formattedData.length && formattedData.find((obj) => true);
  const bar_id = data.id.split("-").pop() + "-" + data.terminal + data.gate
  useEffect(() => {
    generateBarcode("barcodeCanvas", bar_id);
  }, [bar_id]);

//data user
const [cookies, setCookie, removeCookie] = useCookies(["user"]);
const [token, setToken] = useState(null);

const [user, setUser] = useState({
  fullname: "Full Name",
});

useEffect(() => {
  if (cookies.accessToken) {
    setToken(jwtDecode(cookies.accessToken));
  } else {
    router.push("/auth/login");
  }
}, [cookies]);
useEffect(() => {
  if (token) {
    setUser({
      id: token.id,
      fullname: token.fullname,
    });
  }
}, [token]);

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
                <Image src={data.photo} width={100} height={57} alt="garuda" />
                <div className="flex text-2xl font-bold w-44 justify-between my-3 mx-6">
                  <p>{data.departure_code}</p>
                  <Image src="/plane.svg" width={36} height={36} alt="logo" />
                  <p>{data.arrival_code}</p>
                </div>
              </div>
              <div className="flex w-auto justify-between mt-4 text-black">
                <p>Passenger Name :</p>
                <p className="font-semibold">{user.fullname}</p>
              </div>
              <div className="flex w-auto justify-between mt-4 text-black">
                <p>Code</p>
                <p>Class</p>
              </div>
              <div className="flex w-auto justify-between text-gray-500">
                <p>{data.terminal} - {data.gate}</p>
                <p>{data.flight_class}</p>
              </div>
              <div className="flex w-auto justify-between mt-4 text-black">
                <p>Terminal</p>
                <p>Gate</p>
              </div>
              <div className="flex w-auto justify-between text-gray-500">
                <p>{data.terminal}</p>
                <p>{data.gate}</p>
              </div>
              <div className="flex w-auto justify-between mt-4 text-black">
                <p>Departure</p>
              </div>
              <div className="flex w-auto justify-between text-gray-500">
                <p>{data.departure_date}</p>
              </div>
            </div>
            <div className="w-44 max-w-44 flex p-2 border-l-2 border-dashed">
              <canvas className="mt-24 rotate-90 w-64 h-1/4" id="barcodeCanvas"></canvas>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

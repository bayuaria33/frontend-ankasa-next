import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { FaChevronDown } from "react-icons/fa";
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import axios from "axios";
import { useRouter } from "next/router";
import formatDate from "../../../lib/formatDate";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const url = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps(context) {
  const { accessToken } = context.req.cookies;
  try {
    const res = await axios.get(url + `bookings/my-bookings`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const data = await res.data.data;
    // format waktu arrival - departure
    const formattedData = formatDate(data);
    return { props: { formattedData } };
  } catch (error) {
    return { props: { error: true } };
  }
}
export default function Booking({ formattedData, error }) {
  const router = useRouter();
  const [token, setToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [preview, setPreview] = useState("");
  const [user, setUser] = useState({
    fullname: "Full Name",
    email: "Email",
    city: "City",
    country: "Country",
    phone: "Phone",
    photo:
      "https://res.cloudinary.com/dedas1ohg/image/upload/v1680685005/peworld_images/Default_pfp_odp1oi_ockrk2.png",
    postalcode: "Postal Code",
  });
  const logout = () => {
    // remove all cookies
    cookies &&
      Object.keys(cookies).forEach((cookieName) =>
        removeCookie(cookieName, { path: "/" })
      );
    router.push("/");
  };
  useEffect(() => {
    if (cookies.accessToken) {
      setToken(jwtDecode(cookies.accessToken));
    }
  }, [cookies]);
  useEffect(() => {
    if (token) {
      setUser({
        id: token.id,
        fullname: token.fullname,
        email: token.email,
        city: token.city,
        country: token.country,
        phone: token.phone,
        photo: token.photo,
        postalcode: token.postalcode,
      });
    }
  }, [token]);
  const [photo, setPhoto] = useState(
    "https://res.cloudinary.com/dedas1ohg/image/upload/v1680685005/peworld_images/Default_pfp_odp1oi_ockrk2.png"
  );

  const checkPaymentStatus = (data, id) => {
    switch (data) {
      case 0:
        return (
          <div className="flex items-center">
            <div className="w-fit bg-orange-400 p-2 rounded-lg md:text-sm text-xs text-white">
              <button
                onClick={() => {
                  router.push(`/payment/${id}`);
                }}
              >
                Unpaid
              </button>
            </div>
            <button
              className="ml-4 text-ankasa-blue underline"
              onClick={() => {
                router.push(`/payment/${id}`);
              }}
            >
              Pay Now
            </button>
          </div>
        );
      case 1:
        return (
          <div className="w-fit bg-yellow-400 p-2 rounded-lg md:text-sm text-xs text-white">
            <button
              onClick={() => {
                router.push(`/payment/${id}`);
              }}
            >
              Payment Pending
            </button>
          </div>
        );
      case 2:
        return (
          <div className="w-fit bg-green-400 p-2 rounded-lg md:text-sm text-xs text-white">
            <button
              onClick={() => {
                router.push(`/payment/${id}`);
              }}
            >
              E-ticket Issued
            </button>
          </div>
        );
      default:
        console.log("Invalid Payment Status");
    }
  };
  return (
    <Layout>
      <Head>
        <title>Ankasa App My Bookings</title>
      </Head>
      <main
        className={`md:flex-row md:flex min-h-screen p-6 px-2 ${poppins.className} bg-ankasa-grey text-black`}
      >
        <div className="md:w-1/5 md:h-screen mx-4 rounded-xl p-2 bg-white">
          <div className="w-full h-full rounded-xl bg-white flex flex-col items-center pt-4 p-1">
            {/* photo */}
            {preview ? (
              <Image
                src={preview}
                width={120}
                height={120}
                alt="userphotopreview"
                className="bg-white rounded-full border-2 border-ankasa-blue max-h-32"
              />
            ) : (
              <Image
                src={user.photo}
                width={120}
                height={120}
                alt="userphoto"
                className="bg-white rounded-full border-2 border-ankasa-blue max-h-32"
              />
            )}

            {/* profile info */}

            <p className="font-semibold">{user.fullname}</p>
            <p className="text-sm text-gray-500">
              {user.city}, {user.country}
            </p>
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
            <button
              className="w-full h-8 mt-2 flex-row flex p-2 items-center justify-between hover:border-2 hover:text-red-700 rounded-lg"
              onClick={logout}
            >
              <BsFillDoorOpenFill color="grey" size={20} />
              <p className="font-bold">Logout</p>
              <BsChevronRight color="grey" size={20} />
            </button>
          </div>
        </div>

        <div className="md:w-4/5 md:h-full mx-4 mt-2 md:mt-0 rounded-xl p-2 ">
          <div className="w-full h-16 rounded-xl p-2 bg-white">
            <p className="text-md text-ankasa-blue">B O O K I N G S</p>
            <p className="text-lg font-bold text-BLACK">Bookings</p>
          </div>

          {formattedData.map((item, index) => (
            <div key={index}>
              <div className="w-full h-full rounded-xl bg-white mt-2 mr-1 px-3 py-4">
                <p className="font-bold mb-2">{item.departure_date}</p>
                <div className="flex text-2xl font-bold w-44 justify-between my-3">
                  <p>{item.departure_code}</p>
                  <Image src="/plane.svg" width={36} height={36} alt="logo" />
                  <p>{item.arrival_code}</p>
                </div>
                <p className="font-bold text-gray-500">{item.airline_name}</p>
                <hr className="h-px my-8 bg-gray-300 border-0 " />
                <div className="font-bold text-xl flex-row flex justify-between align-middle">
                  <div className="flex flex-row">
                    <p className="text-gray-400 md:mr-16 mr-8">Status</p>
                    {checkPaymentStatus(item.payment_status, item.id)}
                  </div>
                  <button className="flex align-middle text-center items-center w-40 justify-evenly">
                    <p
                      className="text-md text-ankasa-blue"
                      onClick={() => {
                        router.push(`/pass/${item.id}`);
                      }}
                    >
                      View Pass
                    </p>

                    <FaChevronDown className="text-ankasa-blue" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </Layout>
  );
}

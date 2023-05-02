import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { BsPersonCircle } from "react-icons/bs";
import { BsFillStarFill } from "react-icons/bs";
import { BsFillGearFill } from "react-icons/bs";
import { BsFillDoorOpenFill } from "react-icons/bs";
import { BsChevronRight } from "react-icons/bs";
import { useEffect, useState } from "react";
import Image from "next/image";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Profile() {
  const [token, setToken] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [photo, setPhoto] = useState(
    "https://res.cloudinary.com/dedas1ohg/image/upload/v1680685005/peworld_images/Default_pfp_odp1oi_ockrk2.png"
  );
  const [fullname, setFullname] = useState("name");
  const [email, setEmail] = useState('email')
  const [city, setCity] = useState('City')
  const [country, setCountry] =useState('Country')

  useEffect(() => {
    if (cookies.accessToken) {
      setToken(jwtDecode(cookies.accessToken));
    }
  }, [cookies]);
  useEffect(() => {
    if (token) {
      setPhoto(token.photo);
      setFullname(token.fullname)
      setEmail(token.email)
    }
  }, [token]);
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
            <p className="font-semibold">{fullname}</p>
            <p className="text-sm text-gray-500">{city}, {country}</p>
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
        <div className="md:w-4/5 md:h-full mx-4 mt-2 md:mt-0 rounded-xl p-2 bg-white">
          <div className="w-full h-16 rounded-xl bg-white p-2">
            <p className="text-md text-ankasa-blue">P R O F I L E</p>
            <p className="text-lg font-bold text-BLACK">Profile</p>
          </div>
          <div className="flex-row flex">
            <div className="w-1/2 h-full rounded-xl bg-white mt-2 mr-1">
              <p className="p-2 font-bold mb-4">Contact</p>
              <form className="px-2">
                <label>Email </label>
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Email address"
                  value={email}
                  //   onChange={(e) => setEmail(e.target.value)}
                />
                <label>Phone Number</label>
                <input
                  autoComplete="off"
                  id="phonenumber"
                  name="phonenumber"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Phone Number"
                  //   onChange={(e) => setEmail(e.target.value)}
                />
              </form>
            </div>
            <div className="w-1/2 h-full rounded-xl bg-white mt-2 ml-1">
              <p className="p-2 font-bold mb-4">Biodata</p>
              <form className="px-2">
                <label>Fullname </label>
                <input
                  autoComplete="off"
                  id="fullname"
                  name="fullname"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Fullname"
                  //   onChange={(e) => setEmail(e.target.value)}
                />
                <label>City</label>
                <input
                  autoComplete="off"
                  id="city"
                  name="city"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="City"
                  //   onChange={(e) => setEmail(e.target.value)}
                />
                <label>Country </label>
                <input
                  autoComplete="off"
                  id="country"
                  name="country"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Country"
                  //   onChange={(e) => setEmail(e.target.value)}
                />
                <label>Postal Code </label>
                <input
                  autoComplete="off"
                  id="postalcode"
                  name="postalcode"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Postal Code"
                  //   onChange={(e) => setEmail(e.target.value)}
                />
              </form>
            </div>
          </div>
          <div className="w-full h-20 bg-white justify-end flex flex-row p-2 mt-2">
            <button className="rounded-xl bg-ankasa-blue text-white text-md font-bold p-3 my-4 self-end w-32 shadow-lg">
              Save
            </button>
          </div>
        </div>
      </main>
    </Layout>
  );
}

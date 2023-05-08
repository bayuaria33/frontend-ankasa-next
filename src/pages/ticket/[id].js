import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { FaExchangeAlt } from "react-icons/fa";
import { MdWarning } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import Image from "next/image";
import { useRouter } from "next/router";
import planes from "../../../public/illustration.svg";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import jwtDecode from "jwt-decode";
import { Alert, FormControlLabel, FormGroup, Switch } from "@mui/material";
import axios from "axios";
import Link from "next/link";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const url = "http://localhost:4000/";
export async function getServerSideProps(context) {
  try {
    const id = context.query.id;
    const res = await axios.get(url + `tickets/${id}`);
    const data = await res.data.data;
    const formattedData = data.map((item) => {
      const date1 = new Date(item.departure_date);
      const date2 = new Date(item.arrival_date);
      const formattedDate1 = date1.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      const formattedDate2 = date2.toLocaleDateString("id-ID", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      });
      const diffs = Math.abs(date2 - date1);
      const diffsInHours = Math.floor(diffs / (1000 * 60 * 60));
      const diffsInMinutes = Math.floor((diffs / (1000 * 60)) % 60);
      let diffStr = "";

      if (diffsInHours > 0) {
        diffStr += `${diffsInHours} hour${diffsInHours > 1 ? "s" : ""}`;
      }
      if (diffsInMinutes > 0) {
        diffStr += `${diffStr ? " " : ""}${diffsInMinutes} minute${
          diffsInMinutes > 1 ? "s" : ""
        }`;
      }

      return {
        ...item,
        departure_date: formattedDate1,
        arrival_date: formattedDate2,
        diffs: diffStr,
      };
    });

    return { props: { formattedData } };
  } catch (error) {
    return { props: { error: true } };
  }
}

export default function Ticket({ formattedData, error }) {
  const [errorMsg, setErrormsg] = useState();
  const [isError, setIserror] = useState(false);
  //data ticket
  const data =
    formattedData && formattedData.length && formattedData.find((obj) => true);
  console.log(data);
  const router = useRouter();
  const [ticket, setTicket] = useState({
    airline: "Airline name",
    airline_photo: "",
    arrival_city: "City",
    arrival_country: "Country",
    departure_city: "City",
    departure_country: "Country",
    departure_date: "Departure Date",
    price: "",
    flight_class: "Class"
  });

  useEffect(() => {
    if (!data) {
      return <p>Error!</p>;
    }
    setTicket({
      id: data.id,
      airline: data.airline,
      airline_photo: data.airline_photo,
      arrival_city: data.arrival_city,
      arrival_country: data.arrival_country,
      departure_city: data.departure_city,
      departure_country: data.departure_country,
      departure_date: data.departure_date,
      price: data.price,
      flight_class: data.flight_class
    });
  }, [data]);

  //data user
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);
  const [token, setToken] = useState(null);
  const [title, setTitle] = useState();
  const [insured, setInsured] = useState(false);

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

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    if (cookies.accessToken) {
      setToken(jwtDecode(cookies.accessToken));
    } else {
      router.push("/auth/login");
    }
  }, [cookies, router]);
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

  //form
  const formData = {
    tickets_id: ticket.id,
    users_id: user.id,
    passengers: 1,
    title: title,
    payment_status: 0,
    insured: insured,
  };
  const ticketForm = (e) => {
    e.preventDefault();
    axios
      .post(url + `bookings/`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log("Create booking success");
        console.log(res.data.data);
        setTimeout(() => {
          router.push("/booking");
        }, 2000);
      })
      .catch((err) => {
        console.log("Create booking fail");
        console.log(err);
        console.log(err.response.data.error);
        setErrormsg(err.response.data.error);
        setIserror(true);
      });
  };

  return (
    <Layout>
      <Head>
        <title>Ankasa App Tickets</title>
      </Head>

      <main className={` ${poppins.className} bg-ankasa-grey text-black`}>
        {/* top */}
        <div
          className="h-44 w-full bg-ankasa-blue rounded-b-2xl px-6 flex flex-row items-center justify-between"
          style={{
            backgroundImage: `url(${planes.src})`,
            backgroundRepeat: `no-repeat`,
          }}
        ></div>
        {/* content */}
        <div className="md:flex-row md:flex h-full p-6 px-2 -mt-36">
          <div className="md:w-3/5 md:h-full mx-4 rounded-xl p-2 ">
            {/* Contact detail */}
            <p className="text-lg font-bold text-white">
              Contact Person Detail
            </p>
            <div className="md:w-full md:h-auto bg-white rounded-xl mt-2">
              <div className="w-full h-full bg-white rounded-xl p-3">
                <label>Fullname </label>
                <input
                  autoComplete="off"
                  id="fullname"
                  name="fullname"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Fullname"
                  value={user.fullname}
                  onChange={handleChange}
                  disabled
                  required
                />
                <label>Email </label>
                <input
                  autoComplete="off"
                  id="email"
                  name="email"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Email address"
                  value={user.email}
                  onChange={handleChange}
                  disabled
                />
                <label>Phone Number</label>
                <input
                  autoComplete="off"
                  id="phonenumber"
                  name="phonenumber"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Phone Number"
                  value={user.phone}
                  onChange={handleChange}
                  disabled
                />
                <div className="w-full h-auto flex justify-end my-2">
                  <Link href={"/profile"}>
                    <p className="font-extrabold text-ankasa-blue">
                      Update Profile
                    </p>
                  </Link>
                </div>
                <div className="flex items-center bg-red-200 p-2 rounded-xl">
                  <MdWarning />
                  <p className="ml-2">Make sure all data is correct</p>
                </div>
              </div>
            </div>
            {/* Passenger detail */}
            <p className="text-lg font-bold text-BLACK my-2">
              Passenger Detail
            </p>
            <div className="md:w-full md:h-auto bg-white rounded-xl mt-2">
              <div className="w-full h-full bg-white rounded-xl p-3">
                <div className="flex items-center bg-sky-200 p-2 rounded-xl my-2 justify-between">
                  <p className="ml-2">Passenger: 1 Adult</p>
                  <p className="ml-2"></p>
                  <FormGroup>
                    <FormControlLabel
                      control={<Switch defaultChecked disabled />}
                      label={
                        <p className={`${poppins.className}`}>
                          Same as contact person
                        </p>
                      }
                    />
                  </FormGroup>
                </div>
                <label>Fullname </label>
                <input
                  autoComplete="off"
                  id="fullname"
                  name="fullname"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Fullname"
                  required
                  value={user.fullname}
                  onChange={handleChange}
                  disabled
                />
                <label>Title </label>
                <select
                  id="title"
                  name="title"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  onChange={(e) => setTitle(e.target.value)}
                  defaultValue={0}
                >
                  <option value="0">--Select Title--</option>
                  <option value="Mr.">Mr.</option>
                  <option value="Mrs.">Ms.</option>
                </select>
                <label>Nationality</label>
                <input
                  autoComplete="off"
                  id="nationality"
                  name="nationality"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Nationality"
                  value={user.country}
                  onChange={handleChange}
                  disabled
                  //   onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            {/* Insurance detail */}
            <p className="text-lg font-bold text-BLACK my-2">
              Insurance Detail
            </p>
            <div className="md:w-full md:h-auto bg-white rounded-xl mt-2">
              <div className="w-full h-full bg-white rounded-xl p-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center my-4">
                    <input
                      id="insured"
                      type="checkbox"
                      name="insured"
                      checked={insured}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      onChange={(e) => {
                        setInsured(e.target.checked);
                      }}
                    />
                    <label
                      htmlFor="insured"
                      className="ml-2 text-sm font-bold text-gray-900"
                    >
                      Travel Insurance
                    </label>
                  </div>
                  <div className="flex">
                    <p className="text-ankasa-blue font-bold">$ 2,00 </p>
                    <p className="text-sm text-gray-400">/pax</p>
                  </div>
                </div>
                <p className="text-sm">
                  Get travel compensation up to $ 10.000,00
                </p>
              </div>
            </div>

            {isError && (
              <Alert severity="error" className={`${poppins.className} my-4 `}>
                {errorMsg ? errorMsg : <p>Something Went Wrong</p>}
              </Alert>
            )}
            <div className="flex w-full h-auto justify-center">
              <button
                className="rounded-xl bg-ankasa-blue text-white text-md font-bold p-3 my-4 w-1/2 shadow-lg "
                onClick={ticketForm}
              >
                Book Ticket
              </button>
            </div>
          </div>

          <div className="md:w-2/5 md:h-full mx-4 mt-2 md:mt-0 rounded-xl p-2 ">
            {error && (
              <Alert
                severity="error"
                className={`${poppins.className} font-bold`}
              >
                Connection error!
              </Alert>
            )}

            <div className="w-full flex justify-between px-2 items-center">
              <p className="text-lg font-bold text-white">Flight Details</p>
              <p className="text-sm font-bold text-white">View Details</p>
            </div>
            {/* ticket1 */}
            <div className="w-full h-auto rounded-xl bg-white mt-2 mr-1 px-3 py-4 flex flex-col">
              <div className="flex flex-row align-middle items-center">
                <Image
                  src={
                    ticket.airline_photo ? ticket.airline_photo : "/plane.svg"
                  }
                  width={100}
                  height={57}
                  alt="garuda"
                />
                <p className="font-bold mb-2 ml-4">{ticket.airline}</p>
              </div>
              <div className="flex-col w-4/5 text-black ">
                <div className="flex justify-between mt-2 font-bold">
                  <p className="">
                    {ticket.departure_city} ({ticket.departure_country})
                  </p>
                  <FaExchangeAlt color="black" />
                  <p className="">
                    {ticket.arrival_city} ({ticket.arrival_country})
                  </p>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-xs">{ticket.departure_date}</p>
                  <p className="text-xs">•</p>
                  <p className="text-xs">{ticket.flight_class}</p>
                </div>
                <div className="flex items-center text-ankasa-blue mt-2">
                  <MdCheckCircleOutline className="mr-2" size={20} />
                  <p>Refundable</p>
                </div>
                <div className="flex items-center text-ankasa-blue">
                  <MdCheckCircleOutline className="mr-2" size={20} />
                  <p>Can reschedule</p>
                </div>
                <div className="flex w-full justify-between mt-2 font-bold">
                  <p className="">Ticket Price</p>
                  <p className="text-ankasa-blue"> $ {ticket.price}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

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
import { Alert, FormControlLabel, FormGroup, Switch } from "@mui/material";
import axios from "axios";
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
  const data = formattedData[0];
  const router = useRouter();
  // const data = router.query;
  const [ticket, setTicket] = useState({
    airline: "Airline name",
    airline_photo: "",
    arrival_city: "City",
    arrival_country: "Country",
    departure_city: "City",
    departure_country: "Country",
    departure_date: "Departure Date",
    price: "",
  });

  useEffect(() => {
    setTicket({
      airline: data.airline,
      airline_photo: data.airline_photo,
      arrival_city: data.arrival_city,
      arrival_country: data.arrival_country,
      departure_city: data.departure_city,
      departure_country: data.departure_country,
      departure_date: data.departure_date,
      price: data.price,
    });
  }, [data]);
  
  if (!formattedData) {
    return (
      <Alert severity="error" className={`${poppins.className} font-bold`}>
        Connection error!
      </Alert>
    );
  }
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
                  onChange={(e) => setFullname(e.target.value)}
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
                      control={<Switch defaultChecked />}
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
                  onChange={(e) => setFullname(e.target.value)}
                  required
                />
                <label>Title </label>
                <input
                  autoComplete="off"
                  id="title"
                  name="title"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Mr."
                  //   onChange={(e) => setEmail(e.target.value)}
                />
                <label>Nationality</label>
                <input
                  autoComplete="off"
                  id="nationality"
                  name="nationality"
                  type="text"
                  className="peer placeholder-grey h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600 mb-4"
                  placeholder="Nationality"
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
                      id="tnc-checkbox"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                      required
                    />
                    <label
                      htmlFor="tnc-checkbox"
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
            <div className="flex w-full h-auto justify-center">
              <button
                className="rounded-xl bg-ankasa-blue text-white text-md font-bold p-3 my-4 w-1/2 shadow-lg "
                onClick={() => {
                  router.push("/ticket/payment");
                }}
              >
                Proceed to Payment
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
                  src={ticket.airline_photo}
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
                  <p className="text-xs">{ticket.departure_date} •</p>
                  <p className="text-xs">6 Passengers •</p>
                  <p className="text-xs">Economy</p>
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
                  <p className="">Total Payment</p>
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

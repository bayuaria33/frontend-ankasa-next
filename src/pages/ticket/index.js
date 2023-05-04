import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from '@mui/material/Alert';
import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { MdLuggage } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { MdWifi } from "react-icons/md";
import { useState } from "react";
import Image from "next/image";
import { Slider } from "@mui/material";
import axios from "axios";
import Link from "next/link";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const url = "http://localhost:4000/";
export async function getServerSideProps() {
  try {
    const res = await axios.get(url + `tickets/all`);
    const data = await res.data.data;

    // format waktu arrival - departure
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
    return { props: { error:true } };
  }
}

export default function Ticket({ formattedData, error }) {
  console.log("data: ", formattedData);
  const [sliderValue, setsliderValue] = useState([145, 300]);
  const handleSlider = (event, newValue) => {
    setsliderValue(newValue);
  };
  return (
    <Layout>
      <Head>
        <title>Ankasa App Tickets</title>
      </Head>
      <main className={` ${poppins.className} bg-ankasa-grey text-black`}>
        {/* top */}
        <div className="h-44 w-full bg-ankasa-blue rounded-b-2xl px-6 flex flex-row items-center justify-between">
          <div className="flex items-center">
            <Image
              width={176}
              height={176}
              src={"/illustration.svg"}
              alt="logo"
            />
            <div className="w-72  p-2 flex-col ml-16">
              <div className="flex justify-between mt-2">
                <p className="text-white">From</p>
                <p className="text-white">To</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-white">Medan (IDN)</p>
                <FaExchangeAlt color="white" />
                <p className="text-white">Tokyo (JPN)</p>
              </div>
              <div className="flex justify-between mt-2 text-white">
                <p className="text-xs">Monday, 20 July 23 •</p>
                <p className="text-xs">6 Passengers •</p>
                <p className="text-xs">Economy</p>
              </div>
            </div>
          </div>
          <p className="text-white font-bold">Change Search</p>
        </div>
        <div className="md:flex-row md:flex h-full p-6 px-2">
          <div className="md:w-1/5 md:h-full mx-4 rounded-xl p-2 ">
            <p className="text-lg font-bold text-BLACK">Filter</p>
            <div className="md:w-full md:h-auto bg-white rounded-xl mt-2">
              {/* Transit */}
              <Accordion disableGutters className="rounded-t-xl">
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Transit</p>
                </AccordionSummary>
                <AccordionDetails>
                  {/* op 1 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-direct" className="p-1 text-black">
                      Direct
                    </label>
                    <input id="chk-direct" type="checkbox"></input>
                  </div>
                  {/* op 2 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-transit1" className="p-1 text-black">
                      Transit 1
                    </label>
                    <input id="chk-transit1" type="checkbox"></input>
                  </div>
                  {/* op 3 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-transit2" className="p-1 text-black">
                      Transit 2+
                    </label>
                    <input id="chk-transit2" type="checkbox"></input>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Facilities */}
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Facilities</p>
                </AccordionSummary>
                <AccordionDetails>
                  {/* op 1 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-luggage" className="p-1 text-black">
                      Luggage
                    </label>
                    <input id="chk-luggage" type="checkbox"></input>
                  </div>
                  {/* op 2 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-meal" className="p-1 text-black">
                      In-Flight Meal
                    </label>
                    <input id="chk-meal" type="checkbox"></input>
                  </div>
                  {/* op 3 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-wifi" className="p-1 text-black">
                      Wifi
                    </label>
                    <input id="chk-wifi" type="checkbox"></input>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Departure Time */}
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Departure Time</p>
                </AccordionSummary>
                <AccordionDetails>
                  {/* op 1 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-0" className="p-1 text-black">
                      00:00 - 06:00
                    </label>
                    <input id="chk-0" type="checkbox"></input>
                  </div>
                  {/* op 2 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-6" className="p-1 text-black">
                      06:00 - 12:00
                    </label>
                    <input id="chk-6" type="checkbox"></input>
                  </div>
                  {/* op 3 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-12" className="p-1 text-black">
                      12:00 - 18:00
                    </label>
                    <input id="chk-12" type="checkbox"></input>
                  </div>
                  {/* op 4 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-18" className="p-1 text-black">
                      18:00 - 24:00
                    </label>
                    <input id="chk-18" type="checkbox"></input>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Arrival Time */}
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Arrival Time</p>
                </AccordionSummary>
                <AccordionDetails>
                  {/* op 1 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-0a" className="p-1 text-black">
                      00:00 - 06:00
                    </label>
                    <input id="chk-0a" type="checkbox"></input>
                  </div>
                  {/* op 2 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-6a" className="p-1 text-black">
                      06:00 - 12:00
                    </label>
                    <input id="chk-6a" type="checkbox"></input>
                  </div>
                  {/* op 3 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-12a" className="p-1 text-black">
                      12:00 - 18:00
                    </label>
                    <input id="chk-12a" type="checkbox"></input>
                  </div>
                  {/* op 4 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-18a" className="p-1 text-black">
                      18:00 - 24:00
                    </label>
                    <input id="chk-18a" type="checkbox"></input>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Airlines */}
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Airlines</p>
                </AccordionSummary>
                <AccordionDetails>
                  {/* op 1 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-garuda" className="p-1 text-black">
                      Garuda Indonesia
                    </label>
                    <input id="chk-garuda" type="checkbox"></input>
                  </div>
                  {/* op 2 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-lion" className="p-1 text-black">
                      Lion Air
                    </label>
                    <input id="chk-lion" type="checkbox"></input>
                  </div>
                  {/* op 3 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-air" className="p-1 text-black">
                      Air Asia
                    </label>
                    <input id="chk-air" type="checkbox"></input>
                  </div>
                </AccordionDetails>
              </Accordion>
              {/* Ticket Price */}
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Ticket Price</p>
                </AccordionSummary>
                <AccordionDetails>
                  <div className="flex flex-row  w-full justify-between">
                    <p>Lowest</p>
                    <p>Highest</p>
                  </div>
                  <Slider
                    valueLabelDisplay="auto"
                    value={sliderValue}
                    onChange={handleSlider}
                    step={5}
                    min={100}
                    max={500}
                  />
                  <div className="flex flex-row  w-full justify-between">
                    <p className="font-bold text-ankasa-blue">
                      $ {sliderValue[0]},00
                    </p>
                    <p className="font-bold text-ankasa-blue">
                      $ {sliderValue[1]},00
                    </p>
                  </div>
                </AccordionDetails>
              </Accordion>
            </div>
          </div>

          <div className="md:w-4/5 md:h-full mx-4 mt-2 md:mt-0 rounded-xl p-2 ">
            <div className="w-full  flex justify-between px-2">
              <p className="text-lg font-bold text-BLACK">Select Ticket</p>
              <div className="flex items-center">
                <p className="font-bold text-BLACK mx-2">Sort by</p>
                <FaExchangeAlt
                  color="black"
                  style={{ transform: "rotate(90deg)" }}
                />
              </div>
            </div>
            {error && <Alert severity="error" className={`${poppins.className} font-bold`} >Connection error!</Alert>}
            {formattedData?.map((item, index) => (
              <div key={index}>
                {/* ticket */}
                <div className="w-full h-full rounded-xl bg-white mt-2 mr-1 px-3 py-4">
                  <div className="flex flex-row align-middle items-center">
                    <Image
                      src={item.airline_photo}
                      width={100}
                      height={57}
                      alt="garuda"
                    />
                    <p className="font-bold mb-2 ml-6">{item.airline}</p>
                  </div>
                  <div className="flex w-full align-middle items-center justify-between px-2 mt-2 text-gray-500">
                    <div className="flex text-2xl font-bold w-44 justify-between my-3">
                      <p>{item.departure_country}</p>
                      <Image
                        src="/plane.svg"
                        width={36}
                        height={36}
                        alt="logo"
                      />
                      <p>{item.arrival_country}</p>
                    </div>
                    <div>
                      <p>{item.diffs}</p>
                      <p>{item.transit}</p>
                    </div>
                    <div className="flex w-40  justify-evenly">
                      <MdLuggage size={24} />
                      <MdFastfood size={24} />
                      <MdWifi size={24} />
                    </div>
                    <div className="flex">
                      <p className="font-bold text-ankasa-blue mr-2">
                        $ {item.price}
                      </p>
                      <span> /pax</span>
                    </div>
                    <Link
                      href={{
                        pathname: "/ticket/add",
                        query: {
                          id: item.id,
                          // airline: item.airline,
                          // arrival_city: item.arrival_city,
                          // arrival_country: item.arrival_country,
                          // departure_city: item.departure_city,
                          // departure_country: item.departure_country,
                          // departure_date: item.departure_date
                        },
                      }}
                    >
                      <button className="rounded-xl bg-ankasa-blue text-white text-md font-bold p-3 my-4 self-end w-32 shadow-lg">
                        Select
                      </button>
                    </Link>
                  </div>
                  <hr className="h-px my-3 bg-gray-300 border-0 " />
                  {/* <p>Here</p> */}
                  <div className="text-lg font-bold flex-row flex justify-between align-middle">
                    <div className="flex align-middle text-center items-center w-40 justify-between px-2">
                      <p className="text-md text-ankasa-blue">View Details</p>
                      <FaChevronDown className="text-ankasa-blue" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </Layout>
  );
}

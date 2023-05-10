import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Alert from "@mui/material/Alert";
import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import { FaChevronUp } from "react-icons/fa";
import { FaChevronDown } from "react-icons/fa";
import { FaExchangeAlt } from "react-icons/fa";
import { MdLuggage } from "react-icons/md";
import { MdFastfood } from "react-icons/md";
import { MdWifi } from "react-icons/md";
import { useEffect, useState } from "react";
import Image from "next/image";
import { Slider } from "@mui/material";
import axios from "axios";
import { useRouter } from "next/router";
import formatDate from "../../../lib/formatDate";

const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const url = "http://localhost:4000/";

export async function getServerSideProps() {
  try {
    const res = await axios.get(url + `tickets/filter`);
    const data = await res.data.data;
    const formattedData = formatDate(data);
    return { props: { formattedData } };
  } catch (error) {
    return { props: { error: true } };
  }
}

export default function Ticket({ formattedData, error }) {
  const [errorMsg, setErrormsg] = useState();
  const [isError, setIserror] = useState(false);
  const [data, setData] = useState();
  const router = useRouter();
  const [sliderValue, setsliderValue] = useState([100, 2000]);
  const validateFacilities = (data) => {
    if (data === 1) {
      return (
        <div className="flex flex-row items-center sm:gap-1">
          <MdWifi size={24} />
        </div>
      );
    } else if (data === 2) {
      return (
        <div className="flex flex-row items-center sm:gap-1">
          <MdLuggage size={24} />
        </div>
      );
    } else if (data === 3) {
      return (
        <div className="flex flex-row items-center sm:gap-1">
          <MdWifi size={24} />
          <MdLuggage size={24} />
        </div>
      );
    } else if (data === 4) {
      return (
        <div className="flex flex-row items-center sm:gap-1">
          <MdFastfood size={24} />
        </div>
      );
    } else if (data === 5) {
      return (
        <div className="flex flex-row items-center sm:gap-1">
          <MdFastfood size={24} />
          <MdWifi size={24} />
        </div>
      );
    } else if (data === 6) {
      return (
        <div className="flex flex-row items-center sm:gap-1">
          <MdFastfood size={24} />
          <MdLuggage size={24} />
        </div>
      );
    } else if (data === 7) {
      return (
        <div className="flex flex-row items-center sm:gap-1">
          <MdLuggage size={24} />
          <MdFastfood size={24} />
          <MdWifi size={24} />
        </div>
      );
    }
    return null;
  };

  const [filter, setFilter] = useState({
    facilities: 0,
    t1: 0,
    t2: 24,
    airlines_id: "",
    search: "",
    transit: "",
    p1: "",
    p2: "",
    sort: "ASC",
  });

  const [facilities, setFacilities] = useState("");
  const handleFacilitiesChange = (event) => {
    const { value, checked } = event.target;
    const facilityValue = parseInt(value, 2); // convert binary string to integer
    if (checked) {
      setFacilities((prev) => prev | facilityValue); // bitwise OR operator to set the bit
    } else {
      setFacilities((prev) => prev & ~facilityValue); // bitwise AND operator with complement to unset the bit
    }
    setFilter({ ...filter, facilities: facilities });
  };
  const handleSlider = (event, newValue) => {
    setsliderValue(newValue);
    setFilter({ ...filter, p1: sliderValue[0], p2: sliderValue[1] });
  };
  const clearFilter = () => {
    setFilter({
      facilities: 0,
      t1: 0,
      t2: 24,
      airlines_id: "",
      search: "",
      transit: "",
      p1: "",
      p2: "",
      sort: "ASC",
    });
  };

  const filterData = (filter) => {
    axios
      .get(
        url +
          "tickets/filter?" +
          "transit=" +
          filter.transit +
          "&facilities=" +
          filter.facilities +
          "&t1=" +
          filter.t1 +
          "&t2=" +
          filter.t2 +
          "&airlines_id=" +
          filter.airlines_id +
          "&search=" +
          filter.search +
          "&p1=" +
          filter.p1 +
          "&p2=" +
          filter.p2 +
          "&sort=" +
          filter.sort
      )
      .then((res) => {
        console.log("get filtered data success");
        res.data.data && setData(formatDate(res.data.data));
      })
      .catch((error) => {
        console.log("error: ", error);
        setIserror(true);
        setErrormsg("Something went wrong");
      });
  };
  useEffect(() => {
    setData(formattedData);
    setIserror(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
              <p className="text-white font-bold text-xl">Filters: </p>
              <div className="flex justify-between mt-2">
                <p className="text-white">Transit : </p>
                <p className="text-white">{filter.transit}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-white">Departure Time </p>
                <p className="text-white">
                  {filter.t1} - {filter.t2}
                </p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-white">Destination : </p>
                <p className="text-white">{filter.search}</p>
              </div>
              <div className="flex justify-between mt-2">
                <p className="text-white">Price Range : </p>
                <p className="text-white">
                  {filter.p1} - {filter.p2}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="md:flex-row md:flex h-full p-6 px-2">
          <div className="md:w-1/5 md:h-full mx-4 rounded-xl p-2 ">
            <div className="flex justify-between">
              <p className="text-lg font-bold text-BLACK">Filter</p>
              <button
                className="font-bold text-ankasa-blue"
                onClick={() => {
                  clearFilter();
                }}
              >
                Reset
              </button>
            </div>

            <div className="md:w-full md:h-auto bg-white rounded-xl mt-2">
              {/* Search */}
              <Accordion disableGutters>
                <AccordionSummary
                  expandIcon={<FaChevronUp className="text-ankasa-blue" />}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                >
                  <p className="font-bold">Search</p>
                </AccordionSummary>
                <AccordionDetails>
                  {/* op 1 */}
                  <div className="flex flex-row justify-between">
                    <input
                      id="searchinput"
                      type="text"
                      placeholder="Search Destination"
                      className="focus:outline-none"
                      value={filter.search}
                      onChange={(e) =>
                        setFilter({ ...filter, search: e.target.value })
                      }
                    ></input>
                  </div>
                </AccordionDetails>
              </Accordion>
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
                    <input
                      id="chk-direct"
                      type="checkbox"
                      value={"Direct"}
                      checked={filter.transit === "Direct"}
                      onChange={(e) =>
                        setFilter({ ...filter, transit: e.target.value })
                      }
                    ></input>
                  </div>
                  {/* op 2 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-transit1" className="p-1 text-black">
                      Transit 1
                    </label>
                    <input
                      id="chk-transit1"
                      type="checkbox"
                      value={"1 Transit"}
                      checked={filter.transit === "1 Transit"}
                      onChange={(e) =>
                        setFilter({ ...filter, transit: e.target.value })
                      }
                    ></input>
                  </div>
                  {/* op 3 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-transit2" className="p-1 text-black">
                      Transit 2+
                    </label>
                    <input
                      id="chk-transit2"
                      type="checkbox"
                      value={"2 Transit"}
                      checked={filter.transit === "2 Transit"}
                      onChange={(e) =>
                        setFilter({ ...filter, transit: e.target.value })
                      }
                    ></input>
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
                    <label htmlFor="chk-Wifi" className="p-1 text-black">
                      Wifi
                    </label>
                    <input
                      id="chk-Wifi"
                      type="checkbox"
                      value="010"
                      checked={facilities & 0b010} // bitwise AND operator to check if the bit is set
                      onChange={handleFacilitiesChange}
                    ></input>
                  </div>
                  {/* op 2 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-meal" className="p-1 text-black">
                      In-Flight Meal
                    </label>
                    <input
                      id="chk-meal"
                      type="checkbox"
                      value="100"
                      checked={facilities & 0b100}
                      onChange={handleFacilitiesChange}
                    ></input>
                  </div>
                  {/* op 3 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-Luggage" className="p-1 text-black">
                      Luggage
                    </label>
                    <input
                      id="chk-Luggage"
                      type="checkbox"
                      value="001"
                      checked={facilities & 0b001}
                      onChange={handleFacilitiesChange}
                    ></input>
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
                    <input
                      id="chk-0"
                      type="checkbox"
                      value={"6"}
                      checked={filter.t2 === "6"}
                      onChange={(e) =>
                        setFilter({ ...filter, t2: "6", t1: "0" })
                      }
                    ></input>
                  </div>
                  {/* op 2 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-6" className="p-1 text-black">
                      06:00 - 12:00
                    </label>
                    <input
                      id="chk-6"
                      type="checkbox"
                      value={"12"}
                      checked={filter.t2 === "12"}
                      onChange={(e) =>
                        setFilter({ ...filter, t2: "12", t1: "6" })
                      }
                    ></input>
                  </div>
                  {/* op 3 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-12" className="p-1 text-black">
                      12:00 - 18:00
                    </label>
                    <input
                      id="chk-12"
                      type="checkbox"
                      value={"18"}
                      checked={filter.t2 === "18"}
                      onChange={(e) =>
                        setFilter({ ...filter, t2: "18", t1: "12" })
                      }
                    ></input>
                  </div>
                  {/* op 4 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-18" className="p-1 text-black">
                      18:00 - 24:00
                    </label>
                    <input
                      id="chk-18"
                      type="checkbox"
                      value={"24"}
                      checked={filter.t2 === "24"}
                      onChange={(e) =>
                        setFilter({ ...filter, t2: "24", t1: "18" })
                      }
                    ></input>
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
                    <input
                      id="chk-garuda"
                      type="checkbox"
                      value={"099d3f32-c794-4640-8d6f-dedca000fda8"}
                      checked={
                        filter.airlines_id ===
                        "099d3f32-c794-4640-8d6f-dedca000fda8"
                      }
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          airlines_id: "099d3f32-c794-4640-8d6f-dedca000fda8",
                        })
                      }
                    ></input>
                  </div>
                  {/* op 2 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-lion" className="p-1 text-black">
                      Lion Air
                    </label>
                    <input
                      id="chk-lion"
                      type="checkbox"
                      value={"13bba5fb-b88a-4ece-9be1-2f8b2d198001"}
                      checked={
                        filter.airlines_id ===
                        "13bba5fb-b88a-4ece-9be1-2f8b2d198001"
                      }
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          airlines_id: "13bba5fb-b88a-4ece-9be1-2f8b2d198001",
                        })
                      }
                    ></input>
                  </div>
                  {/* op 3 */}
                  <div className="flex flex-row justify-between">
                    <label htmlFor="chk-air" className="p-1 text-black">
                      Air Asia
                    </label>
                    <input
                      id="chk-air"
                      type="checkbox"
                      value={"89afa181-7e8d-46b8-b570-6ab0855c7e56"}
                      checked={
                        filter.airlines_id ===
                        "89afa181-7e8d-46b8-b570-6ab0855c7e56"
                      }
                      onChange={(e) =>
                        setFilter({
                          ...filter,
                          airlines_id: "89afa181-7e8d-46b8-b570-6ab0855c7e56",
                        })
                      }
                    ></input>
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
                    max={2000}
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
              {/* Filter Buttons */}
              <div className="flex justify-end px-2">
                <button
                  className="rounded-xl bg-ankasa-blue text-white text-md font-bold p-3 my-4 w-32 shadow-lg"
                  onClick={() => {
                    filterData(filter);
                  }}
                >
                  Filter Tickets
                </button>
              </div>
            </div>
          </div>

          <div className="md:w-4/5 md:h-full mx-4 mt-2 md:mt-0 rounded-xl p-2 ">
            <div className="w-full  flex justify-between px-2">
              <p className="text-lg font-bold text-BLACK">Select Ticket</p>
              <div className="flex items-center">
                <button
                  className="font-bold text-BLACK mx-2"
                  onClick={() => {
                    setFilter({
                      ...filter,
                      sort: filter.sort === "ASC" ? "DESC" : "ASC",
                    });
                    filterData(filter);
                  }}
                >
                  Sort by Date Added
                </button>
                <FaExchangeAlt
                  color="black"
                  style={{ transform: "rotate(90deg)" }}
                />
                <p className="mx-2 font-bold">{filter.sort}</p>
              </div>
            </div>
            {error && (
              <Alert
                severity="error"
                className={`${poppins.className} font-bold`}
              >
                Connection error!
              </Alert>
            )}
            {isError && (
              <Alert
                severity="error"
                className={`${poppins.className} font-bold`}
              >
                {errorMsg}
              </Alert>
            )}
            {data?.map((item, index) => (
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
                      <div className="flex-col">
                        <p>{item.departure_code}</p>
                        <p className="text-sm font-medium ">
                          {item.departure_time}
                        </p>
                      </div>
                      <Image
                        src="/plane.svg"
                        width={36}
                        height={36}
                        alt="logo"
                      />
                      <div className="flex-col">
                        <p>{item.arrival_code}</p>
                        <p className="text-sm font-medium ">
                          {item.arrival_time}
                        </p>
                      </div>
                    </div>
                    <div>
                      <p>{item.diffs}</p>
                      <p>{item.transit}</p>
                    </div>
                    <div className="flex w-40  justify-evenly">
                      {validateFacilities(item.facilities)}
                      {/* <MdLuggage size={24} />
                      <MdFastfood size={24} />
                      <MdWifi size={24} /> */}
                    </div>
                    <div className="flex">
                      <p className="font-bold text-ankasa-blue mr-2">
                        $ {item.price}
                      </p>
                      <span> /pax</span>
                    </div>
                    <button
                      className="rounded-xl bg-ankasa-blue text-white text-md font-bold p-3 my-4 self-end w-32 shadow-lg"
                      onClick={() => {
                        router.push(`/ticket/${item.id}`);
                      }}
                    >
                      Select
                    </button>
                  </div>
                  <hr className="h-px my-3 bg-gray-300 border-0 " />
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

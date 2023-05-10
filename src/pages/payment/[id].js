import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import LogoPaypal from "../../../public/paypal.svg";
import LogoMastercard from "../../../public/mastercard.svg";
import LogoStripe from "../../../public/stripe.svg";
import LogoVisa from "../../../public/visa.svg";
import Layout from "@/components/Layout";
import { BsFillLockFill } from "react-icons/bs";
import { BsCalendar3 } from "react-icons/bs";
import { BsFillCreditCardFill } from "react-icons/bs";
import { BsClock } from "react-icons/bs";
import { Poppins } from "next/font/google";
import axios from "axios";
import { useState } from "react";
import { Alert } from "@mui/material";
import { useRouter } from "next/router";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });
const url = process.env.NEXT_PUBLIC_API_URL;

export async function getServerSideProps(context) {
  try {
    const id = context.query.id;
    const res = await axios.get(url + `bookings/${id}`);
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
    return { props: { error: true } };
  }
}
export default function Payment({ formattedData }) {
  const router = useRouter();
  const [errorMsg, setErrormsg] = useState();
  const [isError, setIserror] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const data =
    formattedData && formattedData.length && formattedData.find((obj) => true);

  const countSubTotal = (data) => {
    let sub;
    data.insured
      ? (sub = data.price * data.passengers + 2)
      : (sub = data.price * data.passengers);
    return sub;
  };

  const countTotal = (sub) => {
    let vat = sub * 0.2;
    let total = sub + vat;
    return total;
  };

  const formData = {
    id: data.id,
    status: 2,
  };
  const updatePayment = async () => {
    try {
      const res = await axios
        .post(url + "bookings/update-payment", formData)
        .then((res) => {
          console.log(res.data.message);
          setIsSuccess(true);
          setTimeout(() => {
            router.push("/booking");
          }, 2000);
        });
    } catch (error) {
      console.log(error);
      setErrormsg(error);
      setIserror(true);
    }
  };
  return (
    <Layout>
      <Head>
        <title>Payment</title>
      </Head>
      <main
        className={`max-w-full flex flex-col w-full bg-white text-black ${poppins.className}`}
      >
        <div className="w-full mx-auto" style={{ backgroundColor: "#2395FF" }}>
          <div className="container mx-auto bg-white mt-20 mb-20 ">
            <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4 p-20">
              {/* left menu */}
              <div className="col-span-1">
                <div className="">
                  <p>Payment Method</p>
                </div>
                <div className="ms-3 mt-5">
                  <div className="flex flex-row justify-between border items-center p-2 bg-gray-100 rounded-lg">
                    <div className="">
                      <p>Paypal</p>
                    </div>
                    <div className="">
                      <Image
                        className="w-auto"
                        src={LogoPaypal}
                        alt="logo-paypal"
                      />
                    </div>
                  </div>
                  <div className="flex flex-row justify-between mt-5 border items-center p-2 bg-gray-100 rounded-lg">
                    <div className="">
                      <p>Credit Card</p>
                    </div>
                    <div className="flex flex-row">
                      <Image
                        className="w-auto"
                        src={LogoVisa}
                        alt="logo-visa"
                      />
                      <Image
                        className="w-auto"
                        src={LogoStripe}
                        alt="logo-stripe"
                      />
                      <Image
                        className="w-auto"
                        src={LogoMastercard}
                        alt="logo-mastercard"
                      />
                    </div>
                  </div>
                  <div className="flex flex-col mt-5">
                    <label className="mb-1">Card Number</label>
                    <div className="flex px-2 items-center  border-2 border-500 ">
                      <BsFillCreditCardFill className=" text-gray-400" />
                      <input
                        className="w-11/12 h-10 p-5 focus:outline-none"
                        type="text"
                        placeholder="0000 0000 0000 0000"
                      />
                    </div>
                  </div>
                  <div className="flex-row grid grid-cols-2 mt-5">
                    {/* 1 */}
                    <div className="flex flex-col mr-2">
                      <label className="mb-1">Expiry Date</label>
                      <div className="flex px-2 items-center  border-2 border-500 ">
                        <BsCalendar3 className=" text-gray-400" />
                        <input
                          className="w-11/12 h-10 p-5 focus:outline-none"
                          type="text"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                    </div>
                    {/* 2 */}
                    <div className="flex flex-col">
                      <label className="mb-1">CVC/CCC</label>
                      <div className="flex px-2 items-center  border-2 border-500 ">
                        <BsFillLockFill className=" text-gray-400" />
                        <input
                          className="w-11/12 h-10 p-5 focus:outline-none"
                          type="text"
                          placeholder="0000 0000 0000 0000"
                        />
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-row mt-5 items-center text-gray-600">
                    <BsFillLockFill />
                    <p className="mx-2">
                      Your transaction is secured with ssl sertificate
                    </p>
                  </div>
                </div>
              </div>
              {/* right menu */}
              <div className="col-span-1">
                <div className="">
                  <p>Summary</p>
                </div>
                <div className="ms-3 mt-5">
                  <div className="flex flex-row justify-between">
                    <div className="">
                      <select
                        id="countries"
                        className="bg-white-50 text-black text-sm w-auto rounded-lg focus:ring-blue-500 focus:border-blue-500 block bg-gray-100 p-3 mb-6"
                        defaultValue={1}
                      >
                        <option value="1" className="">
                          Pro(Billed Monthly)
                        </option>
                        <option value="2" className="">
                          Pro(Billed Weekly)
                        </option>
                      </select>
                      <p className="ms-3 text-sm text-blue-400 -mt-2 border-b-2 border-blue-200">
                        Save 20% with annual billing
                      </p>
                    </div>
                    <div className="flex flex-row">
                      <p className="text-2xl">$9.99</p>
                      <p className="text-sm mt-2 ms-2">/Month</p>
                    </div>
                  </div>
                  <div className="flex flex-col ms-3 mt-5">
                    <div className="flex flex-row justify-between">
                      <p>Ticket Price</p>
                      <p>${data.price}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>Passengers</p>
                      <p>{data.passengers}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                      <p>Insurance</p>
                      {data.insured ? <p>$2.00</p> : <p>$0.00</p>}
                    </div>
                    <div className="flex flex-row justify-between mt-4">
                      <p>Sub Total</p>
                      <p>${countSubTotal(data)}.00</p>
                    </div>
                    <div className="flex flex-row justify-between mt-1">
                      <div className="flex items-center">
                        <p className="mr-2">Value Added Tax</p>
                        <BsClock />
                      </div>
                      <p>20%</p>
                    </div>
                    <div className="flex flex-row justify-between mt-4 font-bold">
                      <p>Total</p>
                      <p>${countTotal(countSubTotal(data))}</p>
                    </div>
                  </div>
                  <div className="flex flex-col ms-3 mt-5">
                    <div className="flex flex-row justify-between">
                      <p>Today you pay(US Dollars)</p>
                      <p>$0</p>
                    </div>
                    <div className="flex flex-col mt-1">
                      <p>After 30 days $9.59</p>
                    </div>
                  </div>
                  {isError && (
                    <Alert
                      severity="error"
                      className={`${poppins.className} mb-4 `}
                    >
                      {errorMsg}
                    </Alert>
                  )}
                  {isSuccess && (
                    <Alert
                      severity="success"
                      className={`${poppins.className} mb-4 `}
                    >
                      Payment Completed
                    </Alert>
                  )}
                  <div className="flex flex-col mt-5">
                    {data.payment_status == 0 ? (
                      <button
                        className="rounded-lg w-auto p-2 text-xl drop-shadow-xl bg-blue-500 text-white"
                        onClick={updatePayment}
                      >
                        Complete Payment
                      </button>
                    ) : (
                      <button
                        className="rounded-lg w-auto p-2 text-xl drop-shadow-xl bg-green-400 text-white"
                        onClick={updatePayment}
                        disabled
                      >
                        Payment Completed
                      </button>
                    )}
                  </div>
                  <div className="flex justify-center">
                    <Link className="underline text-blue-400 mt-2" href={""}>
                      Have a promo code?
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </Layout>
  );
}

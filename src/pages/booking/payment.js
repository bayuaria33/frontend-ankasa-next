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
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Payment() {
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
                      >
                        <option selected value="" className="">
                          Pro(Billed Monthly)
                        </option>
                        <option value="" className="">
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
                      <p>Refferal Bonuses</p>
                      <p>-$2.00</p>
                    </div>
                    <div className="flex flex-row justify-between mt-1">
                      <div className="flex items-center">
                        <p className="mr-2">Vat</p>
                        <BsClock />
                      </div>
                      <p>-20%</p>
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
                  <div className="flex flex-col mt-5">
                    <button className="rounded-lg w-auto p-2 text-xl drop-shadow-xl bg-blue-500 text-white">
                      Try it free for 30 Days
                    </button>
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

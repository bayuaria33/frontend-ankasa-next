import { Poppins } from "next/font/google";
import Layout from "@/components/Layout";
import Head from "next/head";
import {Explore, Popular, Trending} from "@/components/landing/trending";
const poppins = Poppins({ weight: "400", subsets: ["latin"] });

export default function Landing() {
  return (
    <Layout>
      <Head>
        <title>Ankasa App Landing</title>
      </Head>
      <main
        className={`flex-col flex min-h-screen pt-6 ${poppins.className} bg-ankasa-grey`}
      >

        <input type="text"
          id="search-navbar"
          className="md:hidden block w-72 p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 self-center"
          placeholder="Where do you want to go ... ?"
        />
        <Explore/>
        <Trending/>
        <Popular/>
      </main>
    </Layout>
  );
}

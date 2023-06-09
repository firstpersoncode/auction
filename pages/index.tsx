import Head from "next/head";
import Header from "@/components/header";
import Login from "@/components/login";
import Register from "@/components/register";
import Items from "@/components/items";
import CreateItem from "@/components/createItem";
import Deposit from "@/components/deposit";
import getSession from "@/libs/getSession";
import Bid from "@/components/bid";

export default function Home() {
  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />
      <Login />
      <Register />
      <CreateItem />
      <Bid />
      <Deposit />

      <Items />
    </>
  );
}

export async function getServerSideProps(ctx: any) {
  const { req, res } = ctx;
  const user = await getSession(req, res);
  return { props: { user: user ? JSON.parse(JSON.stringify(user)) : null } };
}

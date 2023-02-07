import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { promises } from "stream";
import Header from "../components/header/Header";
import WizardCard from "../components/WizardCard";
import styles from "../styles/Index.module.css";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Wizard World Website</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.body}>
        <WizardCard />
      </main>
    </div>
  );
};

export default Home;

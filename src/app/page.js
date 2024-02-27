import Image from "next/image";
import Header from "./components/shared/Header";
import Slider from "./components/home/Slider";
import Footer from "./components/shared/Footer";
import card1 from "../../public/image/card1.jpg";
import card2 from "../../public/image/card2.jpg";
import privateBoard from "../../public/image/private.jpg";
import Link from "next/link";

export default async function Home() {
  return (
    <main className="">
      <Header />p
      <Slider />
      <div className="container my-12">
        <h2 className="text-3xl font-semibold my-8">
          Manage you task easily with your partners
        </h2>
        <div className="grid grid-cols-2 gap-8">
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image src={card1} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Private Task</h2>
              <p>Secure Your Focus: Manage Personal Tasks with Confidence</p>
              <div className="card-actions justify-end">
                <Link href={"/account/login"} className="btn btn-primary">
                  Start Now
                </Link>
              </div>
            </div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <figure>
              <Image src={card2} alt="Shoes" />
            </figure>
            <div className="card-body">
              <h2 className="card-title">Public task</h2>
              <p>
                Team Harmony in Action: Visualize Progress and Drive Results
              </p>
              <div className="card-actions justify-end">
                <Link href={"/account/login"} className="btn btn-primary">
                  Start Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className=" my-12">
        <h2 className="text-3xl font-semibold container my-8">
          Continue your work with partners
        </h2>
        <Image src={privateBoard} className="max-h-[600px] object-fill" />
      </div>
      {/* <Image src={kanban} /> */}
      <Footer />
    </main>
  );
}

import React from "react";

export default function ShopByCategory() {
  const Category = ({ title }) => (
    <button className="bg-black bg-opacity-80 text-white uppercase px-5 w-max  h-[50px] rounded font-sans font-thin ">
      {title}
    </button>
  );
  return (
    <div className="bg-[url('https://static.wixstatic.com/media/c837a6_f135504c6d7546fc853e1acdfac58f79~mv2.jpg/v1/crop/x_72,y_40,w_3278,h_1839/fill/w_2476,h_1020,fp_0.50_0.50,q_90,usm_0.66_1.00_0.01,enc_auto/Untitled-(3).jpg')] w-screen h-[500px] rounded-t-3xl bg-cover bg-center relative p-10">
      {/* <p className="absolute bottom-0 py-5 text-xl font-light bg-black text-white w-full px-5 bg-opacity-40">
      10% off all smart watches with every purchase <br/> Explore limited time
      offers
    </p> */}

      {/* links */}
      <div className="grid gap-2 absolute  bottom-10">
        <Category title="Speakers & Headphones" />
        <Category title="Home Appliances" />
        <Category title="Smart Phones & Watches" />
        <Category title="Sale" />
      </div>
    </div>
  );
}

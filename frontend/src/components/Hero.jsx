import {
  AdjustmentsIcon,
  EmojiHappyIcon,
  HomeIcon,
} from "@heroicons/react/outline";
import React from "react";

import bgImg from "../assets/adopt-nb.png";
const Hero = () => {
  return (
    <div
      name="home"
      className="w-full h-screen bg-zinc-200 flex flex-col justify-between"
    >
      <div className="grid md:grid-cols-2 max-w-[1240px] m-auto">
        <div className="flex flex-col justify-center md:items-start w-full px-2 py-8">
          <p className="text-2xl">Adopt and Rescue</p>
          <h1 className="py-3 text-5xl md:text-7xl font-bold">
            Finding a home for our rescue.
          </h1>
          <p className="text-2xl">Save a life today. </p>
          <button className="py-3 px-6 sm:w-[60%] my-4">Meet our Pets</button>
        </div>
        <div>
          <img src={bgImg} alt="/" />
        </div>
        <div
          className="absolute flex flex-col py-8 md:min-w-[760px] bottom-[5%]
            mx-1 md:left-1/2 transform md:-translate-x-1/2 bg-zinc-200
            border border-slate-300 rounded-xl text-center shadow-xl"
        >
          <p>Pet Services</p>
          <div className="flex justify-between flex-wrap px-4">
            <p className="flex px-4 py-2 text-slate-500">
              <EmojiHappyIcon className="h-6 text-indigo-600" /> Rescue
            </p>
            <p className="flex px-4 py-2 text-slate-500">
              <AdjustmentsIcon className="h-6 text-indigo-600" /> Train
            </p>
            <p className="flex px-4 py-2 text-slate-500">
              <HomeIcon className="h-6 text-indigo-600" /> Rehome
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;

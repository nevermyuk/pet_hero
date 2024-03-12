import React from "react";

const About = () => {
  return (
    <div name="about" className="w-full my-32">
      <div className="max-w-[1240px] mx-auto">
        <div className="text-center">
          <h2 className="text-5xl font-bold">What We Do</h2>
          <p className="text-3xl py-6 text-gray-500"></p>
        </div>

        <div className="grid md:grid-cols-3 gap-1 px-2 text-center">
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-6xl font-bold text-indigo-600">Rescue</p>
            <p className="text-gray-400 m-6 text-left ">
              From preparation to actual rescue, it takes a lot to assist
              animals in need, and many strays and abandoned dogs suffer serious
              illnesses or injuries. Find out how you can help by reading about
              them.
            </p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-6xl font-bold text-indigo-600">Rehab</p>
            <p className="text-gray-400 m-6 text-left">
              The true work of helping these dogs through their tribulations and
              showing them that there is still love in the world begins after
              they have been rescued.
            </p>
          </div>
          <div className="border py-8 rounded-xl shadow-xl">
            <p className="text-6xl font-bold text-indigo-600">Rehome</p>
            <p className="text-gray-400 m-6 text-left">
              Finding their forever home and living happily ever after is the
              goal of every dog's life journey.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;

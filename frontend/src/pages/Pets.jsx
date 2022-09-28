import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PetListing from "../components/Pets/PetListing";
const Pets = () => {
  return (
    <div>
      <Navbar />
      <PetListing />
      <Footer />
    </div>
  );
};

export default Pets;

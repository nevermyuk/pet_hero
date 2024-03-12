import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import PetProfile from "../components/Pets/PetProfile";

const PetProfilePage = () => {
  return (
    <>
      <Navbar />
      <PetProfile />
      <Footer />
    </>
  );
};

export default PetProfilePage;

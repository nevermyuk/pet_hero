import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import CreateProfile from "../components/Profile/CreateProfile";

const CreateProfilePage = () => {
  return (
    <>
      <Navbar />
      <CreateProfile />
      <Footer />
    </>
  );
};

export default CreateProfilePage;

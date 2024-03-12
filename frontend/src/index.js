import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import CreateProfilePage from "./pages/CreateProfile";
import HomePage from "./pages/Home";
import LoginPage from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import PetProfilePage from "./pages/PetProfile";
import Pets from "./pages/Pets";
import SignupPage from "./pages/Signup";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/createProfile" element={<CreateProfilePage />} />

      {/* Pets */}
      <Route path="/pets" element={<Pets />}></Route>
      <Route path="/pets/:id" element={<PetProfilePage />} />

      <Route path="*" element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>
);

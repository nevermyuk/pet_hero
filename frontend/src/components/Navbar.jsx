import { MenuIcon, XIcon } from "@heroicons/react/outline";
import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Link as LinkScroll } from "react-scroll";
const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleNavClick = () => setNav(!nav);
  const location = useLocation();

  const navigate = useNavigate();
  return (
    <div className="w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold mr-4 sm:text-4xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            PET HERO
          </h1>
          <ul className="hidden md:flex">
            <li>
              {location.pathname === "/" ? (
                <LinkScroll
                  to="home"
                  smooth={true}
                  duration={500}
                  className="hover:scale-125 hover:bg-gray-50"
                >
                  Home
                </LinkScroll>
              ) : (
                <Link className="hover:scale-125 hover:bg-gray-50" to="/">
                  Home
                </Link>
              )}
            </li>

            <li>
              {location.pathname === "/" ? (
                <LinkScroll
                  to="about"
                  smooth={true}
                  offset={-200}
                  duration={500}
                  className="hover:scale-125 hover:bg-gray-50"
                >
                  About
                </LinkScroll>
              ) : (
                <Link className="hover:scale-125 hover:bg-gray-50" to="/">
                  About
                </Link>
              )}
            </li>

            <li>
              {location.pathname === "/" ? (
                <LinkScroll
                  to="contact"
                  smooth={true}
                  offset={-50}
                  duration={500}
                  className="hover:scale-125 hover:bg-gray-50"
                >
                  Contact
                </LinkScroll>
              ) : (
                <Link className="hover:scale-125 hover:bg-gray-50" to="/">
                  Contact
                </Link>
              )}
            </li>
            <li>
              <Link className="hover:scale-125 hover:bg-gray-50" to="/pets">
                Pets
              </Link>
            </li>
          </ul>
        </div>
        <div className="hidden md:flex pr-4">
          <button
            className="border-none bg-transparent text-black mr-4"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          <button className="px-8 py-3" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
        <div className="md:hidden" onClick={handleNavClick}>
          {!nav ? (
            <MenuIcon className="w-5 mr-4" />
          ) : (
            <XIcon className="w-5 mr-4" />
          )}
        </div>
      </div>
      <ul className={!nav ? "hidden" : "absolute bg-zinc-200 w-full px-8"}>
        <li className="border-b-2 border-x-zinc-300 w-full">
          {location.pathname === "/" ? (
            <LinkScroll
              to="home"
              smooth={true}
              duration={500}
              className="hover:scale-125 hover:bg-gray-50"
              onClick={handleNavClick}
            >
              Home
            </LinkScroll>
          ) : (
            <Link className="hover:scale-125 hover:bg-gray-50" to="/">
              Home
            </Link>
          )}
        </li>
        <li className="border-b-2 border-x-zinc-300 w-full">
          {location.pathname === "/" ? (
            <LinkScroll
              to="about"
              smooth={true}
              duration={500}
              className="hover:scale-125 hover:bg-gray-50"
              onClick={handleNavClick}
            >
              About
            </LinkScroll>
          ) : (
            <Link className="hover:scale-125 hover:bg-gray-50" to="/">
              About
            </Link>
          )}
        </li>
        <li className="border-b-2 border-x-zinc-300 w-full">
          {location.pathname === "/" ? (
            <LinkScroll
              to="contact"
              smooth={true}
              duration={500}
              className="hover:scale-125 hover:bg-gray-50"
              onClick={handleNavClick}
            >
              Contact
            </LinkScroll>
          ) : (
            <Link className="hover:scale-125 hover:bg-gray-50" to="/">
              Contact
            </Link>
          )}
        </li>
        <li className="border-b-2 border-x-zinc-300 w-full">
          <Link className="hover:scale-125 hover:bg-gray-50" to="/pets">
            Pets
          </Link>
        </li>
        <div className="flex flex-col my-4">
          <button
            className="bg-transparent text-indigo-600 px-8 py-3 mb-4"
            onClick={() => navigate("/login")}
          >
            Sign In
          </button>
          <button className="px-8 py-3" onClick={() => navigate("/signup")}>
            Sign up
          </button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;

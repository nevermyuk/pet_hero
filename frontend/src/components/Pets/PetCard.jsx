import { CakeIcon } from "@heroicons/react/outline";
import React from "react";
import { FaHome, FaVenusMars } from "react-icons/fa";
import { Link } from "react-router-dom";
const PetCard = ({ pet }) => {
  return (
    <div className="m-2">
      {pet && (
        <div className="max-w-sm  rounded-lg border border-gray-200 shadow-md bg-zinc-50">
          <a href="/pets">
            <img
              className="object-scale-down h-48 w-96"
              src={pet.imageUrl}
              alt=""
            />
          </a>
          <div className="p-5">
            <a href="/pets">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
                {pet.name}
              </h5>
            </a>
            <div className="flex">
              <CakeIcon className="w-5 h-5 align-middle" />
              <p className="ml-2 font-normal">{pet.age} Years</p>
            </div>
            <div className="flex">
              <FaVenusMars className="w-5 h-5 align-middle" />
              <p className="ml-2 font-normal">{pet.gender}</p>
            </div>
            <div className="flex">
              <FaHome className="w-5 h-5 align-middle" />
              <p className="ml-2 font-normal">
                {pet.hdb_approved ? "HDB Approved" : "Not HDB Approved"}
              </p>
            </div>
            <Link to={`${pet.id}`}>
              <button
                type="button"
                className=" text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
              >
                Pet me
              </button>
            </Link>
          </div>
        </div>
      )}
      <div></div>
    </div>
  );
};

export default PetCard;

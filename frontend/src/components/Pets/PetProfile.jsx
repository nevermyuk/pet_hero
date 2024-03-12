import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaHome } from "react-icons/fa";
import { useParams } from "react-router-dom";

const PetProfile = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_API_URL}/pets/${id}`
        );
        setProfile(response);
      } catch (error) {
        console.error(error.message);
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);
  return (
    <div className="md:flex items-start justify-center py-12 2xl:px-20 md:px-6 px-4 pt-32">
      <div className="xl:w-2/6 lg:w-2/5 w-80 md:block">
        <img className="w-full" alt="" src={profile.imageUrl} />
      </div>
      <div className="xl:w-2/5 md:w-1/2 lg:ml-8 md:ml-6 md:mt-0 mt-6">
        <div className="border-b border-gray-200 pb-6">
          <h1
            className="
							lg:text-2xl
							text-xl
							font-semibold
							lg:leading-6
							leading-7
							text-gray-800
							mt-2
						"
          >
            {profile.name}
          </h1>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Species</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 mr-3">
              {profile.species}
            </p>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Breed</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 mr-3">
              {profile.breed}
            </p>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Gender</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 mr-3">
              {profile.gender}
            </p>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Age</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 mr-3">
              {profile.age}
            </p>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">HDB Approved</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 mr-3">
              {profile.hdb_approved ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Sterilized</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 mr-3">
              {profile.sterilized ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Vaccinated</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 mr-3">
              {profile.vaccinated ? "Yes" : "No"}
            </p>
          </div>
        </div>
        <div className="py-4 border-b border-gray-200 flex items-center justify-between">
          <p className="text-base leading-4 text-gray-800">Microchipped</p>
          <div className="flex items-center justify-center">
            <p className="text-sm leading-none text-gray-600 mr-3">
              {profile.microchipped ? "Yes" : "No"}
            </p>
          </div>
        </div>

        <div>
          <p className="xl:pr-48 text-base lg:leading-tight leading-normal text-gray-600 mt-7 mb-3">
            {profile.story}
          </p>
        </div>
        <button
          className="
						focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-800
						text-base
						flex
						items-center
						justify-center
						leading-none
						text-white
						bg-gray-800
						w-full
						py-4
						hover:bg-gray-700
					"
        >
          <FaHome />
          Adopt me
        </button>
      </div>
    </div>
  );
};

export default PetProfile;

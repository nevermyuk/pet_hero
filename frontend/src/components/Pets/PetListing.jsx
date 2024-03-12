import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../Loading";
import PetCard from "./PetCard";
const PetListing = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const { data: response } = await axios.get(
          `${process.env.REACT_APP_API_URL}/pets`
        );
        setData(response);
      } catch (error) {
        console.error(error.message);
        setError(true);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  return (
    <div className="pt-20 container max-w-[1640px] mx-auto p-4">
      <div>
        {loading && <Loading />}
        {!loading && data && (
          <ul className="grid grid-cols-4">
            {data.map((pet) => (
              <li key={pet.id}>
                <PetCard pet={pet} />
              </li>
            ))}
          </ul>
        )}
        {!loading && error && (
          <div
            className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800 text-center"
            role="alert"
          >
            <span className="font-medium">Error</span> An error occured. Please
            try again later.
          </div>
        )}
      </div>
    </div>
  );
};

export default PetListing;

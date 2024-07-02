import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AccountNav from "./AccountNav";
import axios from "axios";

const Places = () => {
  const [places, setPlaces] = useState([]);
  useEffect(() => {
    try {
      axios.get("/user-places").then(({ data }) => {
        setPlaces(data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>
      <AccountNav />
      <div className="text-center">
        <Link
          to={"/account/places/new"}
          className="inline-flex gap-2 bg-primary text-white py-2 px-6 rounded-full"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          Add new Places
        </Link>
      </div>
      <div className="mt-4">
        {places.length > 0 &&
          places.map((t) => (
            <Link
              to={"/account/places/" + t._id}
              className="flex cursor-pointer gap-4 bg-gray-100 p-4 rounded-2xl "
            >
              <div className="flex w-32 h-32 bg-ray-300 grow shrink-0">
                {t.photos.length > 0 && (
                  <img
                    className="object-cover"
                    src={"http://localhost:4000/uploads/" + t.photos[0]}
                  />
                )}
              </div>
              <div className="grow-0 shrink">
                <h2 className="text-xl">{t.title}</h2>
                <p className="text-sm mt-2">{t.description}</p>
              </div>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default Places;

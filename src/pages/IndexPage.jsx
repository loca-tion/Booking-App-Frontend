import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IndexPage = () => {
  const [places, setPlaces] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [check, setCheck] = useState(false);
  useEffect(() => {
    try {
      axios.get("/places").then((response) => {
        setPlaces(response.data);
      });
    } catch (error) {
      console.log(error);
    }
  }, []);
  const handleSearch = (event) => {
    event.preventDefault();
    const term = event.target.value;
    setSearchTerm(term);
  };
  function submit(e) {
    e.preventDefault();
    if (searchTerm) {
      const results = places.filter((place) =>
        place.address.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
      setCheck(true);
    } else {
      setSearchResults([]);
    }
  }

  return (
    <>
      <form
        onSubmit={submit}
        className="flex gap-2 border border-gray-300 rounded-full py-2 px-4 shadow-md shadow-gray-300 md:w-1/3 md:mx-auto w-full"
      >
        <input
          className="border-none outline-none"
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for a place..."
        />
        <button className="bg-primary text-white p-4 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
            />
          </svg>
        </button>
      </form>
      {searchResults.length > 0 && (
        <>
          <h2 className="block font-bold text-2xl ">Search Results : </h2>
          <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {searchResults.length > 0 &&
              searchResults.map((place) => (
                <Link to={"/place/" + place._id}>
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {place.photos?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square"
                        src={
                          "http://localhost:4000/uploads/" + place.photos?.[0]
                        }
                        alt="No Image"
                      />
                    )}
                  </div>
                  <h2 className="font-bold">{place.address}</h2>
                  <h3 className="text-sm text-gray-500">{place.title}</h3>
                  <div className="mt-1">
                    <span className="font-bold">${place.price}</span> per night
                  </div>
                </Link>
              ))}
          </div>
          <h1 className="block text-2xl font-bold"> Here's More : </h1>
          <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            {places.length > 0 &&
              places.map((place) => (
                <Link to={"/place/" + place._id}>
                  <div className="bg-gray-500 mb-2 rounded-2xl flex">
                    {place.photos?.[0] && (
                      <img
                        className="rounded-2xl object-cover aspect-square"
                        src={
                          "http://localhost:4000/uploads/" + place.photos?.[0]
                        }
                        alt="No Image"
                      />
                    )}
                  </div>
                  <h2 className="font-bold">{place.address}</h2>
                  <h3 className="text-sm text-gray-500">{place.title}</h3>
                  <div className="mt-1">
                    <span className="font-bold">${place.price}</span> per night
                  </div>
                </Link>
              ))}
          </div>
        </>
      )}
      {searchResults.length >= 0 && !check && (
        <div className="mt-8 grid gap-x-6 gap-y-8 grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
          {places.length > 0 &&
            places.map((place) => (
              <Link to={"/place/" + place._id}>
                <div className="bg-gray-500 mb-2 rounded-2xl flex">
                  {place.photos?.[0] && (
                    <img
                      className="rounded-2xl object-cover aspect-square"
                      src={"http://localhost:4000/uploads/" + place.photos?.[0]}
                      alt="No Image"
                    />
                  )}
                </div>
                <h2 className="font-bold">{place.address}</h2>
                <h3 className="text-sm text-gray-500">{place.title}</h3>
                <div className="mt-1">
                  <span className="font-bold">${place.price}</span> per night
                </div>
              </Link>
            ))}
        </div>
      )}
      {check && searchResults.length == 0 && (
        <>
          <h1 className="text-center font-bold text-4xl block  m-auto text-gray-400">
            No Result Found
          </h1>
        </>
      )}
    </>
  );
};

export default IndexPage;

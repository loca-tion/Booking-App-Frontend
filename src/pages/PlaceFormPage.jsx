import React, { useState, useEffect } from "react";
import PhotosUploader from "../components/PhotosUploader";
import Perks from "../components/perks";
import AccountNav from "../components/AccountNav";
import { Navigate, useParams } from "react-router-dom";
import axios from "axios";

const PlaceFormPage = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [addedPhotos, setAddedPhotos] = useState([]);
  const [description, setDescription] = useState("");
  const [perks, setPerks] = useState([]);
  const [extraInfo, setExtraInfo] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [maxGuests, setMaxGuests] = useState(1);
  const [price, setPrice] = useState(100);
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    if (!id) {
      return;
    }
    try {
      axios.get("/places/" + id).then((response) => {
        const { data } = response;
        setTitle(data.title);
        setAddress(data.address);
        setAddedPhotos(data.photos);
        setDescription(data.description);
        setPerks(data.perks);
        setExtraInfo(data.extraInfo);
        setCheckIn(data.checkIn);
        setCheckOut(data.checkOut);
        setMaxGuests(data.maxGuests);
        setPrice(data.price);
      });
    } catch (error) {
      console.log(error);
    }
  }, [id]);

  async function addNewPlace(e) {
    e.preventDefault();

    const placeData = {
      title,
      address,
      addedPhotos,
      description,
      perks,
      extraInfo,
      price,
      checkIn,
      checkOut,
      maxGuests,
    };
    if (id) {
      // update
      try {
        await axios.put("/places", {
          id,
          ...placeData,
        });
        setRedirect(true);
      } catch (error) {
        console.log(error);
      }
    } else {
      // new place
      try {
        await axios.post("/places", placeData);
        setRedirect(true);
      } catch (error) {
        console.log(error);
      }
    }
  }

  if (redirect) {
    return <Navigate to={"/account/places"} />;
  }
  return (
    <>
      <div>
        <AccountNav />
        <form onSubmit={addNewPlace}>
          <h2 className="text-xl mt-4">Title</h2>
          <input
            type="text"
            placeholder="Title , My lovely apt.."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <h2 className="text-xl mt-4">Address</h2>
          <input
            type="text"
            placeholder="Address , Munich, Germany..."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <h2 className="text-xl mt-4">Photos</h2>
          <PhotosUploader addedPhotos={addedPhotos} onChange={setAddedPhotos} />
          <h2 className="text-xl mt-4">Description</h2>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <h2 className="text-xl mt-4">Perks</h2>
          <div className="grid mt-2 gap-2 grid-cols-2 md:grid-cols-3 lg:grid-cols-6">
            <Perks selected={perks} onChange={setPerks} />
          </div>
          <h2 className="text-xl mt-4">Extra Info</h2>
          <textarea
            value={extraInfo}
            onChange={(e) => setExtraInfo(e.target.value)}
          />
          <h2 className="text-xl mt-4">Check in&out Time</h2>
          <div className="grid gap-2 sm:grid-cols-4">
            <div>
              <h3 className="mt-2 -mb-1">Price</h3>
              <input
                type="number"
                placeholder="$40000"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check in</h3>
              <input
                type="text"
                placeholder="14:00"
                value={checkIn}
                onChange={(e) => setCheckIn(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Check Out</h3>
              <input
                type="text"
                placeholder="11:00"
                value={checkOut}
                onChange={(e) => setCheckOut(e.target.value)}
              />
            </div>
            <div>
              <h3 className="mt-2 -mb-1">Max Guest</h3>
              <input
                type="number"
                placeholder="4"
                value={maxGuests}
                onChange={(e) => setMaxGuests(e.target.value)}
              />
            </div>
          </div>
          <button className="primary my-4">Save</button>
        </form>
      </div>
    </>
  );
};

export default PlaceFormPage;

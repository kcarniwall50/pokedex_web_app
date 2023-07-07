import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowRightShort } from "react-icons/bs";
import { AiFillHeart } from "react-icons/ai";
import { NavLink, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "../utils/Loader";

const Detail = () => {
  const [Pokemon, setPokemon] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [colour, setColour] = useState("white");

  const { id } = useParams();
  const number = id;
  let bookmarkedCart = localStorage.getItem("bookmarkedCart");

  useEffect(() => {
    const getPokemon = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${id}`
        );
        setIsLoading(false);

        setPokemon(response.data);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
        alert(error?.message);
      }
    };

    getPokemon();
  }, []);

  useEffect(() => {
    let cartArray = JSON.parse(localStorage.getItem("bookmarkedCart"));
    cartArray = cartArray?.filter((item) => item.id === id);

    for (let i = 0; i < cartArray?.length; i++) {
      if (Number(cartArray[i].id) === Number(id)) {
        setColour("yellow");
        return;
      }
    }
  }, []);

  const bookmarkHandler = () => {
    let prevColour = colour;
    setColour((prev) => {
      if (prev === "white") {
        setColour("yellow");
        toast.success("saved succesfully");
      } else {
        setColour("white");
        toast.success("unsaved succesfully");
      }
    });

    if (!bookmarkedCart) {
      let arr = [
        {
          id: id,
          name: Pokemon?.name,
        },
      ];

      return localStorage.setItem("bookmarkedCart", JSON.stringify(arr));
    } else {
      let cartArray = JSON.parse(localStorage.getItem("bookmarkedCart"));

      if (prevColour === "white") {
        cartArray.push({
          id: id,
          name: Pokemon?.name,
        });
      } else {
        cartArray = cartArray.filter((item) => item.id !== id);
      }

      localStorage.setItem("bookmarkedCart", JSON.stringify(cartArray));
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <NavLink
        to="/"
        style={{
          display: "flex",
          justifyContent: "left",
          padding: "0.4rem",
          alignItems: "center",
          marginTop: "0.5rem",
          textDecoration: "none",
          fontFamily: "cursive",
        }}
      >
        <h2>Pokédex</h2>
      </NavLink>
      <div className=" detail-container  display">
        <div>
          <img
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
            alt="Loading..."
          />
        </div>
        <div>
          <div className="name">
            <AiFillHeart
              color={colour}
              style={{ cursor: "pointer" }}
              onClick={bookmarkHandler}
            />

            <p>
              {" "}
              <span style={{ textAlign: "start" }}>#{number}</span> &nbsp;{" "}
              {Pokemon?.name}
            </p>
          </div>

          <div className="quality">
            <div className=" flexDisplay">
              <p>Types</p>
              <p>
                {Pokemon?.types[0]?.type?.name} &nbsp;
                {Pokemon?.types[1]?.type?.name}{" "}
              </p>
            </div>
            <hr />
            <div className="flexDisplay">
              <p>Height</p>
              <p>{Pokemon?.height} </p>
            </div>
            <hr />
            <div className="flexDisplay">
              <p>Weight</p>
              <p>{Pokemon?.weight} </p>
            </div>
          </div>

          <div className="ability">
            {Pokemon?.stats.map((stat, key) => (
              <div key={key}>
                <div className="flexDisplay">
                  <p>{stat?.stat?.name}</p>
                  <p>{stat?.base_stat}</p>
                </div>
                <hr />
              </div>
            ))}
          </div>
          <NavLink
            style={{
              padding: "0.4rem",
              fontSize: "13px",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
            to="/bookmarks"
          >
            bookmarks <BsArrowRightShort size={15} />
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Detail;

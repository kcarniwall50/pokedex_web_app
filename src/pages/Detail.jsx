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
      <div
     style={{
      paddingBottom: "2rem",
      width: "100%",
      marginBottom: "1.3rem",
      boxShadow:
        "0 8px 16px 0 rgba(0,0,0,.3), 0 6px 20px 0 rgba(0,0,0,.19)",
      backgroundColor: "#cee2f4",
      borderRadius: "0px 0px  3rem  3rem",
    }}
    >

   
      <span
        style={{
          display: "flex",
          justifyContent: "flex-start",
          marginLeft: "1rem",
        }}
      >
        <NavLink className="navlink" to="/" title="got to Home Page">
          {" "}
          <h2>Pokédex</h2>
        </NavLink>
      </span>

      <div className="search-container">
     <span 
     style={{
      boxShadow:" inset rgba(0, 0, 0, 0.3) 0px 1px 7px 8px, rgba(0, 0, 0, 0.19) -2px 9px 20px 0px inset",
      // boxShadow:"2px 1px 14px 0px rgba(0,0,0,.3), inset -2px 9px 20px 0 rgba(0,0,0,.19)",
     fontWeight:'bolder', padding:'0.38rem', textTransform:'capitalize', marginBottom:'-1.3rem', color:'blue', fontFamily:'monospace', fontSize:'20px', borderRadius:'5px' }}
     >{Pokemon?.name}</span> 
          </div>

      </div>
      <div className=" detail-container  display">
        <div>
          <img
            className="effect"
            src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${id}.svg`}
            alt="Loading..."
            style={{
              border: "0px solid",
              padding: "1rem",
              borderRadius: "20%",
            }}
          />
        </div>
        <div className="effect">
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

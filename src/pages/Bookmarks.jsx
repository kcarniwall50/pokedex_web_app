import React, { useEffect, useState } from "react";
import { MdBookmarkRemove } from "react-icons/md";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { NavLink, useNavigate } from "react-router-dom";

const Bookmarks = () => {
  const [savedPokemons, setSavedPokemos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let cartArray = JSON.parse(localStorage.getItem("bookmarkedCart"));
    setSavedPokemos(cartArray);
  }, []);

  const deleteItem = async (index) => {
    const newArr = [...savedPokemons];
    newArr.splice(index, 1);
    setSavedPokemos(newArr);
    localStorage.removeItem("bookmarkedCart");
    localStorage.setItem("bookmarkedCart", JSON.stringify(newArr));
  };

  const confirmDelete = (index) => {
    confirmAlert({
      title: "Remove",
      message: "Are you sure you want to remove it.",
      buttons: [
        {
          label: "Remove",
          onClick: () => deleteItem(index),
        },
        {
          label: "Cancel",
        },
      ],
    });
  };

  const imageClickHandler = (number) => {
    navigate(`/detail/${number}`);
  };

  return (
    <>
    <div
     style={{
      paddingBottom: "2.95rem",
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

      </div>

      <h3 style={{ color: "blue", margin: "1rem 0" }}>Bookmarked Pokemons</h3>

      {(savedPokemons?.length === 0 || savedPokemons === null) && (
        <p>You have not saved any Pokemon</p>
      )}
      <div className="bookmark-container">
        {savedPokemons &&
          savedPokemons.map((Pokemon, key) => (
            <div
              key={key}
              className="effect"
              style={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                gap: "20%",
                backgroundColor: "#92abf5",
                margin: "0.5rem 0",
                padding: "0.5rem",
                color: "white",
                borderRadius: "4px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  gap: "10%",
                }}
              >
                <span>#{Pokemon?.id}</span>
                &nbsp;
                <img
                  src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${Pokemon?.id}.svg`}
                  alt="Loading..."
                  onClick={() => imageClickHandler(Pokemon?.id)}
                  style={{ width: "30px", height: "40px", cursor: "pointer" }}
                />{" "}
              </div>
              <p
                onClick={() => imageClickHandler(Pokemon?.id)}
                style={{ textTransform: "capitalize", cursor: "pointer" }}
              >
                {Pokemon?.name}
              </p>
              <p>
                <MdBookmarkRemove
                  color="yellow"
                  size={18}
                  style={{ cursor: "pointer" }}
                  onClick={() => confirmDelete(key)}
                />
              </p>
            </div>
          ))}
      </div>
    </>
  );
};

export default Bookmarks;

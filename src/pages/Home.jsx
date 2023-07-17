import axios from "axios";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Loader from "../utils/Loader";

const Home = () => {
  const navigate = useNavigate();

  const [searchText, setSearchText] = useState("");
  const [searchedPokemon, setSearchedPokemon] = useState();
  const [isSearched, setIsSearched] = useState(false);
  const [Pokemons, setPokemons] = useState([]);
  const [limit, setLimit] = useState(20);
  const [isLoading, setIsLoading] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const getPokemons = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon?offset=${limit}&limit=${limit}`
        );
        setPokemons(response.data.results);
      } catch (error) {
        console.log(error);
        alert(error?.message);
      }
    };

    getPokemons();
  }, [limit]);

  const handleInfiniteScroll = async () => {
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLimit((prev) => prev + 10);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleInfiniteScroll);
  }, []);

  const Reset = () => {
    setSearchText("");
    setIsSearched(false);
  };

  const search = async () => {
    if (!searchText) return alert("Please enter name or number");

    try {
      setIsLoading(true);
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${searchText.toLowerCase()}`
      );
      setIsLoading(false);
      setIsSearched(true);
      console.log(response);

      setSearchedPokemon(response.data);
    } catch (error) {
      setIsLoading(false);
      Reset();
      if (error.response.status === 404) {
        alert("Not Found 😔!.  Please enter valid name or number");
      } else {
        alert(error?.message);
      }
      console.log(error);
    }
  };

  useEffect(() => {
    window.onscroll = function () {
      scrollFunction();
    };
  }, []);

  function scrollFunction() {
    if (
      document.body.scrollTop > 60 ||
      document.documentElement.scrollTop > 60
    ) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  }

  function topFunction() {
    document.documentElement.scrollTop = 0;
  }

  const imageClickHandler = (number) => {
    navigate(`/detail/${number}`);
  };

  const goToHome = () => {
    Reset();
  };

  return (
    <>
      {isLoading && <Loader />}
      <a name="top"></a>
      <div className="header">
        <span
          onClick={goToHome}
          style={{
            display: "flex",
            justifyContent: "flex-start",
            marginLeft: "1rem",
          }}
        >
          <NavLink className="navlink">
            {" "}
            <h2>Pokédex</h2>
          </NavLink>
        </span>
        <div className="search-container">
          <div>
            <input
              className="effect"
              type="text"
              value={searchText}
              placeholder="search by name or number"
              onChange={(e) => setSearchText(e.target.value)}
              style={{ padding: "0.4em 0.6em", borderRadius: "1rem" }}
            />
          </div>

          <div>
            <input
              className="effect"
              type="submit"
              value="Search"
              onClick={search}
              style={{
                padding: "0.4em 0.6em",
                borderRadius: "0.7rem",
                cursor: "pointer",
              }}
            />
          </div>

          <div>
            <input
              className="effect"
              type="reset"
              value="Reset"
              onClick={Reset}
              style={{
                padding: "0.4em 0.6em",
                borderRadius: "0.7rem",
                cursor: "pointer",
              }}
            />
          </div>
        </div>
      </div>

      {isSearched && (
        <div className="search-img">
          <div onClick={() => imageClickHandler(searchedPokemon?.id)}>
            <img
              src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${searchedPokemon?.id}.svg`}
              alt="Loading..."
              style={{ width: "80px", height: "80px", cursor: "pointer" }}
            />

            <p
              style={{
                color: "white",
                margin: "0.4rem 0",
                fontWeight: "bold",
                textTransform: "capitalize",
              }}
            >
              {searchedPokemon?.name}
            </p>
            <p
              className="moreDetail"
              onClick={() => imageClickHandler(searchedPokemon?.id)}
            >
              more detail..
            </p>
          </div>
        </div>
      )}

      {!isSearched && (
        <div
          style={{ width: "95%", marginInline: "auto", marginBottom: "1rem" }}
        >
          <a
            href="#top"
            id="myBtn"
            style={{ display: isScrolled ? "block" : "none" }}
          >
            go to top
          </a>

          {/* pokemons */}

          <div className="displayGridHome">
            {Pokemons?.length > 0 &&
              Pokemons.map((Pokemon, key) => (
                <div
                  style={{
                    margin: "0 0.2rem 0.4rem 0.2rem",
                    backgroundColor: "#82c4f7",
                    // padding: "0.7rem",
                    // borderRadius: "8px",

                    border: "1px solid #008b8b",
                    borderRadius: "0.5rem",
                    boxShadow:
                      " 0 8px 16px 0 rgba(0,0,0,.3), 0 6px 20px 0 rgba(0,0,0,.19)",
                    padding: "0.5rem",
                  }}
                  key={key}
                >
                  <div onClick={() => imageClickHandler(key + 1)} style={{}}>
                    <img
                      src={`https://unpkg.com/pokeapi-sprites@2.0.2/sprites/pokemon/other/dream-world/${
                        key + 1
                      }.svg`}
                      alt="Loading..."
                      style={{
                        width: "80px",
                        height: "80px",
                        cursor: "pointer",
                      }}
                    />

                    <p
                      style={{
                        color: "white",
                        margin: "0.4rem 0",
                        fontWeight: "bold",
                        textTransform: "capitalize",
                      }}
                    >
                      {Pokemon?.name}
                    </p>
                    <p
                      className="moreDetail"
                      onClick={() => imageClickHandler(key + 1)}
                    >
                      more detail..
                    </p>
                  </div>
                </div>
              ))}
          </div>

          {isLoading && (
            <>
              <iframe
                src="https://giphy.com/embed/sSgvbe1m3n93G"
                width="40"
                height="40"
                className="giphy-embed"
                allowFullScreen
              ></iframe>
              <a href="https://giphy.com/gifs/juan-gabriel-sSgvbe1m3n93G" />
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Home;

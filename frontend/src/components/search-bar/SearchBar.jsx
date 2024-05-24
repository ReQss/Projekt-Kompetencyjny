import { useState } from "react";
import "./searchBar.css";
import Button from "../button/Button";
import { Link, useLocation } from "react-router-dom";

const SearchBar = () => {
  const [showItems, setShowItems] = useState(false);

  const toggleItems = () => {
    setShowItems(!showItems);
  };

  const location = useLocation();
  const token = localStorage.getItem("token");
  const userRole = localStorage.getItem("role");

  return (
    <div className="search-bar">
      {token === null ? (
        <></>
      ) : (
        <>
          {userRole === "ADMIN" ? (
            <>
              <Link to="/add-form">
                <Button>Dodaj przedmiot</Button>
              </Link>

              <Link to="/rent-form">
                <Button> Wypożycz </Button>
              </Link>

              <Link to={"/history-form/"}>
                <Button>Historia wypożyczeń</Button>
              </Link>
              {location.pathname === "/delete" ? (
                <Link to="/">
                  <Button> Wróć na stronę główną </Button>
                </Link>
              ) : (
                <>
                  <Link to="/delete">
                    <Button> Usuń przedmiot </Button>
                  </Link>
                </>
              )}

              {token === null ? (
                <></>
              ) : location.pathname === "/modify" ? (
                <Link to="/">
                  <Button> Wróć na stronę główną </Button>
                </Link>
              ) : (
                <>
                  <Link to="/modify">
                    <Button> Modyfikuj </Button>
                  </Link>
                </>
              )}
            </>
          ) : (
            <></>
          )}

          {userRole === "USER" &&
            (location.pathname !== "/user-items" ? (
              <Link to="/user-items">
                <Button> Twoje przedmioty </Button>
              </Link>
            ) : (
              <Link to="/">
                <Button> Wróć na stronę główną </Button>
              </Link>
            ))}
        </>
      )}
    </div>
  );
};

export default SearchBar;

import React from "react";
import "./home.css";
import Header from "../../components/header/Header";
import Navbar from "../../components/navbar/Navbar";
import ItemsSection from '../../containers/items-section/ItemsSection'

/**
 * Komponent reprezentujący widok strony głównej.
 * @returns {JSX.Element} Element strony głównej.
 */
const Home = () => {
  return (
    <div className="home">
      <Navbar />
      <Header />
      <ItemsSection/>
    </div>
  );
};

export default Home;

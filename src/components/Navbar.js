import React from "react";

const Navbar = ({ account }) => {
  return (
    <nav className="navbar navbar-dark fixed-top bg-dark flex-md-nowrap p-0 shadow">
      <a
        className="navbar-brand col-sm-3 col-md-2 mr-0"
        href="#"
      >
        NFT TOKEN
      </a>
      <p className="text-white">{account}</p>
    </nav>
  );
};

export default Navbar;

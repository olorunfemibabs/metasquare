import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }) => {
  return (
    <div className="w-screen font-rubik flex flex-col">
      <Navbar />
      <div className="pt-24">
        <main>{children}</main>
      </div>
      <Footer />
    </div>
  );
};

export default Layout;

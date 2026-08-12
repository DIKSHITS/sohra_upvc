import React from "react";
import Navbar from "./Navbar";
import Body from "./Body";
import WhyChooseSohra from "./WhyChooseSohra";
import Products from "./Products";
import Footer from "./Footer";
import AboutUs from "./about";
import TeamPage from "./TeamPage";
import SuccessfulProjects from "./SuccessfulProjects";

function index() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      <Body/>
      <AboutUs includeLayout={false} />
      <WhyChooseSohra/>
      <Products/>
      <TeamPage includeLayout={false} />
      <SuccessfulProjects includeLayout={false} />
      <Footer/>
    </div>
  );
}

export default index;

'use client'

import { useEffect, useState } from "react";
import Banner from "@/components/pages/Home/Banner";
import CustomerReviews from "@/components/pages/Home/CustomerReviews";
import FeaturedProducts from "@/components/pages/Home/FeaturedProducts";
import Gallery from "@/components/pages/Home/Gallery";
import HowItWorks from "@/components/pages/Home/HowItWorks";
import OfferSection from "@/components/pages/Home/OfferSection";
import GetBouquet from "@/components/pages/Home/GetBouquet";
import NewFooter from "@/components/pages/Home/NewFooter";

const Home = () => {
  const [bgColor, setBgColor] = useState("bg-[#b8cedc]");
 
  
  useEffect(() => {

 
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setBgColor("bg-[#b8cedc]"); // Change color when scrolled past 100px
      }

     if (window.scrollY > 500){
        setBgColor("bg-white"); // Default background color
      }

     if (window.scrollY > 3300){
        setBgColor("bg-[#b8cedc]"); // Default background color
      }
      console.log(window.scrollY);
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${bgColor} transition-colors duration-300 `}>
      <Banner></Banner>
      <HowItWorks/>
      <FeaturedProducts/>
      <GetBouquet/>
      <NewFooter/>
    </div>
  );
};

export default Home;
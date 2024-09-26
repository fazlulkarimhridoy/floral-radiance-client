'use client'

import { useEffect, useState } from "react";
import Banner from "@/components/pages/Home/Banner";
import CustomerReviews from "@/components/pages/Home/CustomerReviews";
import FeaturedProducts from "@/components/pages/Home/FeaturedProducts";
import Gallery from "@/components/pages/Home/Gallery";
import HowItWorks from "@/components/pages/Home/HowItWorks";
import OfferSection from "@/components/pages/Home/OfferSection";

const Home = () => {
  const [bgColor, setBgColor] = useState("bg-[#b8cedc]");
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setBgColor(""); // Change color when scrolled past 100px
      } else {
        setBgColor("bg-[#b8cedc]"); // Default background color
      }
    };

    // Add event listener for scroll
    window.addEventListener("scroll", handleScroll);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className={`${bgColor} transition-colors duration-300`}>
      <Banner></Banner>
      <HowItWorks/>
    </div>
  );
};

export default Home;
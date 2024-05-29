import Banner from "@/components/pages/Home/Banner";
import CustomerReviews from "@/components/pages/Home/CustomerReviews";
import FeaturedProducts from "@/components/pages/Home/FeaturedProducts";
import Gallery from "@/components/pages/Home/Gallery";
import OfferSection from "@/components/pages/Home/OfferSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <OfferSection />
      <FeaturedProducts />
      <Gallery />
      <CustomerReviews />
    </div>
  );
};

export default Home;
import Banner from "@/components/pages/Home/Banner";
import CustomerReviews from "@/components/pages/Home/CustomerReviews";
import FeaturedProducts from "@/components/pages/Home/FeaturedProducts";
import OfferSection from "@/components/pages/Home/OfferSection";

const Home = () => {
  return (
    <div>
      <Banner></Banner>
      <OfferSection />
      <FeaturedProducts />
      <CustomerReviews/>
    </div>
  );
};

export default Home;
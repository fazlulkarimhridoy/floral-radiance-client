import Banner from "@/components/pages/Home/Banner";
import CustomerReviews from "@/components/pages/Home/CustomerReviews";
import FeaturedProducts from "@/components/pages/Home/FeaturedProducts";
import OfferSection from "@/components/pages/Home/OfferSection";

const Home = () => {
  return (
    <div>
      <OfferSection />
      <FeaturedProducts />
      <Banner></Banner>
      <CustomerReviews img={""} review={""} name={""} />
    </div>
  );
};

export default Home;
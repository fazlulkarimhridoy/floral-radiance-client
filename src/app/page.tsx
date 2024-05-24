import CustomerReviews from "@/components/pages/Home/CustomerReviews";
import FeaturedProducts from "@/components/pages/Home/FeaturedProducts";
import Gallery from "@/components/pages/Home/Gallery";
import OfferSection from "@/components/pages/Home/OfferSection";

const Home = () => {
  return (
    <div>
      <OfferSection />
      <FeaturedProducts />
      <Gallery />
      <CustomerReviews img={""} review={""} name={""} />
    </div>
  );
};

export default Home;
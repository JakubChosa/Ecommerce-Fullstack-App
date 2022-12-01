import { Link } from "react-router-dom";
import Wrapper from "./LandingStyled";
import home1 from "../../assets/images/home1.jpg";
import home2 from "../../assets/images/home2.jpg";
import { FeaturedProducts } from "../../components";

const Landing = () => {
  return (
    <Wrapper>
      <div className="page full-page container">
        <div className="main-text">
          <h1>Design your perfect home</h1>
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Facilis
            placeat exercitationem ipsam minima mollitia est, dolorem inventore
            beatae itaque, odit obcaecati. Qui eius quaerat quam.
          </p>
          <Link to="/products" className="btn btn-hero">
            Shop Now
          </Link>
        </div>
        <div className="main-images">
          <img src={home2} alt="" className="image-small" />
          <img src={home1} alt="" className="image-big" />
          <div className="bg-shape"></div>
        </div>
        <div className="popular-items">
          <FeaturedProducts />
        </div>
      </div>
    </Wrapper>
  );
};
export default Landing;

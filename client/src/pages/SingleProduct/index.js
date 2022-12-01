import Wrapper from "./SingleProductStyled";
import { useProductsContext } from "../../context/productsContext";
import { useEffect } from "react";
import {
  Loading,
  Error,
  ProductImages,
  Stars,
  AddToCart,
  ReviewsContainer,
} from "../../components";
import { useParams, useNavigate, Link } from "react-router-dom";
import { formatPrice } from "../../utils/helpers";
import imagesArray from "../../utils/imagesArray";

const SingleProduct = () => {
  const {
    getSingleProduct,
    single_product_loading: loading,
    single_product_error: error,
    single_product: product,
  } = useProductsContext();

  const navigate = useNavigate();
  const { productId } = useParams();

  useEffect(() => {
    getSingleProduct(productId);
    // eslint-disable-next-line
  }, [productId]);

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, navigate]);
  if (loading) {
    return <Loading fullHeight />;
  }
  if (error) {
    return <Error fullHeight />;
  }
  const {
    name,
    price,
    description,
    averageRating,
    reviews = [],
    company,
    id,
    image,
    inventory,
    numOfReviews,
  } = product;

  let imagePath;
  if (image) {
    imagePath = require(`../../assets/images/${image}`);
  }
  return (
    <Wrapper className="container">
      <div className="section section-center full-page">
        <Link to="/products" className="btn">
          back to products
        </Link>
        <div className="product-center">
          <ProductImages images={[imagePath, ...imagesArray]} />
          <section className="content">
            <h2>{name}</h2>
            <div className="average-reviews">
              <Stars
                stars={averageRating || 0}
                reviews={numOfReviews}
                rating={false}
              />
              <p className="reviews">({numOfReviews}) customer reviews</p>
            </div>
            <h5 className="price">{formatPrice(price)}</h5>
            <p className="desc">{description}</p>
            <p className="info">
              <span>SKU: </span>
              {id}
            </p>
            <p className="info">
              <span>Available: </span>
              {inventory > 0 ? "In stock" : "out of stock"}
            </p>
            <p className="info">
              <span>Brand: </span>
              {company}
            </p>
            <hr />
            {inventory > 0 && <AddToCart product={product} />}
          </section>
        </div>
        <ReviewsContainer product={id} reviews={reviews} />
      </div>
    </Wrapper>
  );
};
export default SingleProduct;

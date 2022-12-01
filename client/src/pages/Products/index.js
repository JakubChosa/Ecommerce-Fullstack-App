import Wrapper from "./ProductsStyled";
import { useProductsContext } from "../../context/productsContext";
import { ProductsGrid, Filters, Sort } from "../../components";

const Products = () => {
  const { totalProducts } = useProductsContext();
  return (
    <Wrapper className="page full-page container">
      <Filters />
      <div>
        <Sort />
        <ProductsGrid />
      </div>
    </Wrapper>
  );
};
export default Products;

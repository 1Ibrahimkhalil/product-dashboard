import ProductCard from "./components/ProductCard";
import { productList } from "./Data";

const App = () => {
  // renders
  const renderProductList = productList.map(product =>  <ProductCard  key={product.id} product={product}  /> )
  return (
    <main className=" container mx-auto">
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-8 gap-4">
    {renderProductList}
  
    </div>
    </main>
  );
};

export default App;

import type { IProduct } from "../interface";
import { textSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";

interface IProps {
  product : IProduct
}

const ProductCard = ({product}: IProps) => {
  return (
    <div className=" max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image imgURL={product.imageURL} alt={product.title}className="rounded-md mb-2 h-[200px] md:h-[250px] " />
      <h3>{product.title}</h3>
      <p>
        {textSlicer(product.description)}
      </p>
      <div className="flex items-center my-4 space-x-2">
        <span className="w-5 h-5 bg-indigo-600 rounded-full cursor-pointer " />
        <span className="w-5 h-5 bg-yellow-500 rounded-full cursor-pointer" />
        <span className="w-5 h-5 bg-red-600 rounded-full cursor-pointer" />
      </div>
      <div className="flex items-center justify-between">
        <span>${product.price}</span>

        <Image
          imgURL={product.imageURL}
          alt="product name"
          className="w-10 h-10 rounded-full object-center"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-indigo-700 " width="w-full" onClick={() => console.log("500")}>
          EDIT
        </Button>
        <Button className="bg-red-700 "  width="w-full">DELETE</Button>
      </div>
    </div>
  );
};

export default ProductCard;

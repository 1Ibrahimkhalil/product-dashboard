import type { IProduct } from "../interface";
import { textSlicer } from "../utils/functions";
import Image from "./Image";
import Button from "./ui/Button";
import CircleColor from "./ui/CircleColor";

interface IProps {
  product: IProduct;
  setProductToEdit: (product: IProduct) => void;
  openEditModal: () => void;
  setProductToEditIdx: (value: number) => void;
  idx:number
}

const ProductCard = ({ product, setProductToEdit, openEditModal,setProductToEditIdx ,idx}: IProps) => {
  // render
  const renderColors = product.colors.map((color) => (
    <CircleColor color={color} key={color} />
  ));
  // HANDLER
  const onEdit = () => {
    setProductToEdit(product);
    openEditModal();
setProductToEditIdx(idx)
  };
  return (
    <div className=" max-w-sm md:max-w-lg mx-auto md:mx-0 border rounded-md p-2 flex flex-col">
      <Image
        imgURL={product.imageURL}
        alt={product.title}
        className="rounded-md mb-2 h-[200px] md:h-[250px] "
      />
      <h3>{product.title}</h3>
      <div className=" pe-2 break-words ">
        <p>{textSlicer(product.description)}</p>
      </div>
      <div className="flex items-center my-4 space-x-2">
        <div className="flex items-center my-4 space-x-2">{renderColors}</div>
      </div>
      <div className="flex items-center justify-between">
        <span>${product.price}</span>

        <Image
          imgURL={product.category.imageURL}
          alt={product.category.name}
          className="w-10 h-10 rounded-full object-center"
        />
      </div>
      <div className="flex items-center justify-between space-x-2 mt-5">
        <Button className="bg-indigo-700 " width="w-full" onClick={onEdit}>
          EDIT
        </Button>
        <Button className="bg-red-700 " width="w-full">
          DELETE
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;

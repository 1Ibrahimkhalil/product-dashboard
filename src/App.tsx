import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/modal";
import { formInputsList, productList } from "./Data";
import { useState, type ChangeEvent } from "react";
import type { IProduct } from "./interface";

const App = () => {
  /*  _________STATE__________ */
  const [product, setProduct] = useState<IProduct>({
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  });

  const [isOpen, setIsOpen] = useState(false);

  /*  _________HANDLER__________ */
  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });
  };

  /*  _________RENDER__________ */

  const renderProductList = productList.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className=" flex flex-col ">
      <label htmlFor={input.id} className=" mb-[1px] font-medium text-gray-700">
        {input.label}
      </label>
      <Input
        type="text"
        id={input.id}
        name={input.name}
        value={product[input.name]}
        onChange={onChangeHandler}
      />
    </div>
  ));
  return (
    <main className=" container mx-auto">
      <Button className="bg-indigo-700 " width="w-full" onClick={openModal}>
        Add
      </Button>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-8 gap-4">
        {renderProductList}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3">
          {renderFormInputList}
          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 " width="w-full">
              Submit
            </Button>
            <Button className="bg-gray-400 " width="w-full">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;

import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/modal";
import { colors, formInputsList, productList } from "./Data";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { IProduct } from "./interface";
import { productValidation } from "./validation";
import Error from "./components/Error";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from "uuid";

const App = () => {
  const defaultProductObj = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };

  /*  _________STATE__________ */
  const [product, setProduct] = useState<IProduct>(defaultProductObj);
  const [products, setProducts] = useState<IProduct[]>(productList);
  const [tempColors, setTempClors] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  /*  _________HANDLER__________ */
  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);

  const onCancel = () => {
    setProduct(defaultProductObj);
    setIsOpen(false);
  };

  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProduct({
      ...product,
      [name]: value,
    });

    setError({
      ...error,
      [name]: "",
    });
  };
  const submitHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errors = productValidation({
      title: product.title,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setError(errors);
      return;
    }
    setProducts((prev) => [{ ...product, id: uuid() ,colors: tempColors},...prev ]);
    setProduct(defaultProductObj);
    setTempClors([])
    setIsOpen(false);
  };

  /*  _________RENDER__________ */

  const renderProductList = products.map((product) => (
    <ProductCard key={product.id} product={product} />
  ));
  const renderFormInputList = formInputsList.map((input) => (
    <div className=" flex flex-col " key={input.id}>
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

      <Error msg={error[input.name]} />
    </div>
  ));

  const renderColors = colors.map((color) => (
    <CircleColor
      color={color}
      onClick={() => {
        if (tempColors.includes(color)) {
          setTempClors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempClors((prev) => [...prev, color]);
      }}
      key={color}
    />
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
        <form className="space-y-3" onSubmit={submitHandler}>
          {renderFormInputList}
          <div className="flex items-center my-4 space-x-2">{renderColors}</div>
          <div className="flex items-center my-4  flex-wrap gap-2">
            {tempColors.map((color) => (
              <span
                key={color}
                className=" text-xs text-white p-1 font-bold rounded-md"
                style={{ backgroundColor: color }}
              >
               
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button className="bg-indigo-700 " width="w-full">
              Submit
            </Button>
            <Button className="bg-gray-400 " width="w-full" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;

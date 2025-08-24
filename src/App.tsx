import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Input from "./components/ui/Input";
import Modal from "./components/ui/modal";
import { categories, colors, formInputsList, productList } from "./Data";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { IProduct } from "./interface";
import { productValidation } from "./validation";
import Error from "./components/Error";
import CircleColor from "./components/ui/CircleColor";
import { v4 as uuid } from "uuid";
import { Select } from "./components/ui/Select";
import type { ProductNameTypes } from "./types";

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
  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(categories[0]);
  const [productToEdit, setProductToEdit] =
    useState<IProduct>(defaultProductObj);
  const [productToEditIdx, setProductToEditIdx] = useState<number>(0);
  const [error, setError] = useState({
    title: "",
    description: "",
    imageURL: "",
    price: "",
  });

  /*  _________HANDLER__________ */
  const closeModal = () => setIsOpen(false);

  const openModal = () => setIsOpen(true);
  const closeModalEdit = () => setIsOpenEdit(false);

  const openModalEdit = () => setIsOpenEdit(true);

  const onCancel = () => {
    setProduct(defaultProductObj);
    setIsOpen(false);
  };
  const onCancelEditModal = () => {
    setProductToEdit(defaultProductObj);
    setIsOpenEdit(false);
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
  const onChangeEditHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProductToEdit({
      ...productToEdit,
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
    setProducts((prev) => [
      {
        ...product,
        id: uuid(),
        colors: tempColors,
        category: selectedCategory,
      },
      ...prev,
    ]);
    setProduct(defaultProductObj);
    setTempClors([]);
    setIsOpen(false);
  };
  const submitEditHandler = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const errors = productValidation({
      title: productToEdit.title,
      description: productToEdit.description,
      price: productToEdit.price,
      imageURL: productToEdit.imageURL,
    });

    const hasErrorMsg =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    if (!hasErrorMsg) {
      setError(errors);
      return;
    }
    const updatedProducts = [...products];
    updatedProducts[productToEditIdx] = {
      ...productToEdit,
      colors: tempColors.concat(productToEdit.colors),
    };
    setProducts(updatedProducts);
    setProductToEdit(defaultProductObj);
    setTempClors([]);
    setIsOpenEdit(false);
  };

  /*  _________RENDER__________ */

  const renderProductList = products.map((product, idx) => (
    <ProductCard
      key={product.id}
      product={product}
      setProductToEdit={setProductToEdit}
      openEditModal={openModalEdit}
      setProductToEditIdx={setProductToEditIdx}
      idx={idx}
    />
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
        if (productToEdit.colors.includes(color)) {
          setTempClors((prev) => prev.filter((item) => item !== color));
          return;
        }
        setTempClors((prev) => [...prev, color]);
      }}
      key={color}
    />
  ));
  const renderProductEditWithErrorMsg = (
    id: string,
    label: string,
    name: ProductNameTypes
  ) => {
    return (
      <div className=" flex flex-col ">
        <label htmlFor={id} className=" mb-[2px] font-medium text-gray-700">
          {label}
        </label>
        <Input
          type="text"
          id={id}
          name={name}
          value={productToEdit[name]}
          onChange={onChangeEditHandler}
        />
        <Error msg={error[name]} />
      </div>
    );
  };
  return (
    <main className=" container mx-auto">
      <div className="text-center pt-5">
        <Button
          className="bg-indigo-700 py-2 px-6 "
          width="w-fit"
          onClick={openModal}
        >
          Build Product
        </Button>
      </div>
      <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-8 gap-4">
        {renderProductList}
      </div>
      {/* Add Product Modal */}
      <Modal isOpen={isOpen} closeModal={closeModal} title="ADD NEW PRODUCT">
        <form className="space-y-3 " onSubmit={submitHandler}>
          {renderFormInputList}
          <Select
            selected={selectedCategory}
            setSelected={setSelectedCategory}
          />
          <div className="flex items-center my-4 space-x-2">{renderColors}</div>
          <div className="flex items-center my-4  flex-wrap gap-2">
            {tempColors.map((color) => (
              <span
                key={color}
                className=" text-xs text-white p-1 font-bold rounded-md"
                style={{ backgroundColor: color }}
                aria-label={`Color ${color}`}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button type="submit" className="bg-indigo-700 " width="w-full">
              Submit
            </Button>
            <Button
              type="button"
              className="bg-gray-400 "
              width="w-full"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
      {/* Edit Product Modal */}
      <Modal
        isOpen={isOpenEdit}
        closeModal={closeModalEdit}
        title="ADD NEW PRODUCT"
      >
        <form className="space-y-3 " onSubmit={submitEditHandler}>
          {renderProductEditWithErrorMsg("title", "Product Title ", "title")}
          {renderProductEditWithErrorMsg(
            "description",
            "Product Description ",
            "description"
          )}
          {renderProductEditWithErrorMsg(
            "imageURL",
            "Product image URL ",
            "imageURL"
          )}
          {renderProductEditWithErrorMsg("price", "Product price ", "price")}

          {/* <Select selected={selectedCategory} setSelected={setSelectedCategory} /> */}
          <div className="flex items-center my-4 space-x-2">{renderColors}</div>
          <div className="flex items-center my-4  flex-wrap gap-2">
            {tempColors.concat(productToEdit.colors).map((color) => (
              <span
                key={color}
                className=" text-xs text-white p-1 font-bold rounded-md"
                style={{ backgroundColor: color }}
                aria-label={`Color ${color}`}
              >
                {color}
              </span>
            ))}
          </div>

          <div className="flex items-center space-x-3">
            <Button type="submit" className="bg-indigo-700 " width="w-full">
              Submit
            </Button>
            <Button
              type="button"
              className="bg-gray-400 "
              width="w-full"
              onClick={onCancelEditModal}
            >
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </main>
  );
};

export default App;

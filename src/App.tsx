
import ProductCard from "./components/ProductCard";
import Button from "./components/ui/Button";
import Modal from "./components/ui/modal";
import { productList } from "./Data";
import { useState } from "react";

const App = () => {
   /*  _________STATE__________ */
   let [isOpen, setIsOpen] = useState(false)


   /*  _________HANDLER__________ */
  function closeModal() {
    setIsOpen(false)
  }

  function openModal() {
    setIsOpen(true)
  }


  /*  _________RENDER__________ */


  const renderProductList = productList.map(product =>  <ProductCard  key={product.id} product={product}  /> )
  return (
    <main className=" container mx-auto">
      <Button className="bg-indigo-700 " width="w-full" onClick={openModal}>Add </Button>
    <div className=" grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 m-8 gap-4">
    {renderProductList}
  
    </div>
    <Modal isOpen={isOpen} closeModal={closeModal} openModal={openModal} title="ADD NEW PRODUCT" >

      <div className="flex items-center space-x-3">
        <Button className="bg-indigo-700 " width="w-full">Submit</Button>
       <Button className="bg-gray-300 " width="w-full">Cancel</Button>
      </div>
    </Modal>
    </main>
  );
};

export default App;

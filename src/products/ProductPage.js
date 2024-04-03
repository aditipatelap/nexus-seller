import React, { useContext } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import DataContext from '../context/DataContext';
import Header from '../header/Header';

const ProductPage = () => {
  const headerLine = "YOUR PRODUCT 🛒";
  const navigate = useNavigate();
  const { id } = useParams();
  const { productsList, setProductsList, products, setProducts, sellerId } = useContext(DataContext);
  const product = products.find((product) => product.id === id);

  const handleDeleteProduct = async () => {
    const shouldDelete = window.confirm('Are you sure you want to delete this product?');
    if (shouldDelete) {
      navigate("/home/products");
      try {
        const response = await axios.delete("https://nexus-backend-380o.onrender.com/product/delete", { data: { id, sellerId } });
        if(response.data.status === "deleted"){
          // delete locally
          const updatedProductList = productsList.filter((productId) => String(productId) !== id);
          const updatedProducts = products.filter((product) => String(product.id) !== id);
          setProductsList(updatedProductList);
          setProducts(updatedProducts);
          navigate("/home/products");
        }
        else if (response.data.status === "fail") {
          alert("Something went wrong");
        }
        else{
          alert(response.data.status);
        }
      } 
      catch (error) {
        console.error(error);  
      }
    }

  }

  return (
    <div>
      <Header headerLine={headerLine}/>

      <div className="px-6 mt-6 font-poppins">
        <Link to="/home/products">
          <p className="flex"> &larr; &nbsp;
            <p className="mb-7 hover:underline focus:underline text-lg">Back</p>        
          </p>
        </Link>

        {/* name  */}
        <div className="flex flex-col mb-4">
          <label htmlFor="name" className="mb-2 font-semibold">Product Name:</label>
          <h3 className="border border-black rounded-md p-3 min-h-5">
            {product.name}
          </h3>
        </div>

        {/* description */}
        <div className="flex flex-col mb-4">
          <label htmlFor="description" className="mb-2 font-semibold">Description:</label>
          <ul className="border border-black rounded-md p-3 min-h-96 space-y-3">
            {product.description.split('\n').map((line, index) => (
              <li key={index} className="list-disc ml-3"> {line} </li>
            ))}
          </ul>
        </div>

        {/* brand and price */}
        <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 mb-4">
          {/* brand */}
          <div className="flex flex-col pr-2 sm:pr-0 xs:pr-0">
            <label htmlFor="brand" className="mb-2 font-semibold">Brand:</label>
            <p className="border border-black rounded-md p-2">
              {product.brand}
            </p>
          </div>

          {/* price */}
          <div className="flex flex-col pl-2 sm:pl-0 xs:pl-0">
            <label htmlFor="price" className="mb-2 font-semibold">Price (₹):</label>
            <p className="border border-black rounded-md p-2">
              {product.price}
            </p>
          </div>
        </div>

        {/* category and sub category */}
        <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 mb-4">
          {/* category */}
          <div className="flex flex-col pr-2 sm:pr-0 xs:pr-0">
            <label htmlFor="category" className="mb-2 font-semibold">Category:</label>
            <p className="border border-black rounded-md p-2">
              {product.category}
            </p>
          </div>

          {/* sub category */}
          <div className="flex flex-col pl-2 sm:pl-0 xs:pl-0">
            <label htmlFor="subcategory" className="mb-2 font-semibold">Sub-Category:</label>
            <p className="border border-black rounded-md p-2">
              {product.subCategory}
            </p>
          </div>
        </div>

        {/* discount & type */}
        <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 mb-4">
          {/* discount */}
          <div className="flex flex-col pr-2 sm:pr-0 xs:pr-0">
            <label htmlFor="discount" className="mb-2 font-semibold">Discount (%):</label>
            <p className="border border-black rounded-md p-2">
              {product.discount}
            </p>
          </div>

          {/* discount type */}
          <div className="flex flex-col pl-2 sm:pl-0 xs:pl-0">
            <label htmlFor="distype" className="mb-2 font-semibold">Discount Type:</label>
            <p className="border border-black rounded-md p-2">
              {product.discountType}
            </p>
          </div>
        </div>

        {/* photo */}
        <div className="flex flex-col">
          <label htmlFor="photo" className="mb-2 font-semibold">Photo:</label>
          <div className="h-96 w-96 border">
            <img src={product.photo} alt="Preview" className="h-full w-full object-contain"/>
          </div> 
        </div>
        
        {/* button */}
        <Link to={`/home/products/edit/${id}`}>
          <div className="text-center my-5">
            <button 
              className="w-full mt-5 px-20 py-3 md:px-14 md:py-2 sm:px-14 sm:py-2 xs:px-14 xs:py-2 rounded-lg shadow-lg font-podkova font-semibold bg-sky-900 text-white text-2xl lg:text-xl md:text-lg sm:text-base xs:text-sm"
            >
              EDIT
            </button>
          </div>
        </Link>

      {/* button for delete */}
      <button 
        type="submit"
        className="font-podkova font-semibold my-4 px-20 py-3 md:px-14 md:py-2 sm:px-14 sm:py-2 xs:px-14 xs:py-2 w-full rounded-lg shadow-md bg-[#E23232] text-white text-xl md:text-lg sm:text-lg xs:text-lg"
        onClick={handleDeleteProduct}
      >
        DELETE PRODUCT
      </button>

      </div>
    </div>
  )
}

export default ProductPage

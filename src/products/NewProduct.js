import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { RxCrossCircled } from "react-icons/rx";
import DataContext from '../context/DataContext';
import Header from '../header/Header';

const NewProduct = () => {
  axios.defaults.maxBodyLength = 10 * 1024 * 1024; // 10 MB
  const navigate = useNavigate();
  const headerLine = "ADD YOUR PRODUCT 🛒";
  const { sellerId, sellerName, productsList, setProductsList, products, setProducts } = useContext(DataContext);

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState();
  const [category, setCategory] = useState("Apparel and Fashion");
  const [subCategory, setSubCategory] = useState("Accessories");
  const [discount, setDiscount] = useState();
  const [discountType, setDiscountType] = useState("percentage");
  const [photo, setPhoto] = useState("");

  const categoryList = [
    "Apparel and Fashion", "Electronics", "Home and Furniture", 
    "Beauty and Personal Care", "Books and Media", "Sports and Outdoors", 
    "Toys and Games", "Automotive", "Health and Wellness", "Jewelry and Accessories", 
    "Pet Supplies", "Grocery and Gourmet", "Office Supplies", "Art and Craft", 
    "Travel and Luggage", "Baby and Maternity", "Tech and Gadgets",
  ];

  const subCategoryList = {
    "Apparel and Fashion": ["Accessories", "Kids' Clothing", "Men's Clothing", "Shoes", "Women's Clothing"],
    "Art and Craft": ["Art Supplies", "Craft Kits", "DIY Materials", "Home Decor"],
    "Automotive": ["Auto Parts", "Car Accessories", "Motorcycle Gear", "Tools and Equipment"],
    "Baby and Maternity": ["Baby Clothing", "Diapers and Wipes", "Maternity Wear", "Nursery Furniture"],
    "Beauty and Personal Care": ["Fragrances", "Haircare", "Makeup", "Personal Care Products", "Skincare"],
    "Books and Media": ["Books", "eBooks", "Games", "Movies", "Music"],
    "Electronics": ["Audio Devices", "Cameras", "Laptops", "Smartphones", "Wearables"],
    "Grocery and Gourmet": ["Food and Beverages", "Fresh Produce", "Gourmet Products", "Snacks"],
    "Health and Wellness": ["Fitness Equipment", "Health Monitoring Devices", "Natural Remedies", "Vitamins and Supplements"],
    "Home and Furniture": ["Appliances", "Bedding", "Furniture", "Home Decor", "Kitchenware"],
    "Jewelry and Accessories": ["Fashion Jewelry", "Fine Jewelry", "Handbags", "Sunglasses", "Watches"],
    "Office Supplies": ["Electronics", "Office Furniture", "Organizational Tools", "Stationery"],
    "Pet Supplies": ["Beds and Furniture", "Pet Care Products", "Pet Food", "Toys for Pets"],
    "Sports and Outdoors": ["Active wear", "Fitness Accessories", "Footwear", "Outdoor Gear", "Sports Equipment"],
    "Tech and Gadgets": ["Gadgets and Gizmos", "Smart Home Devices", "Tech Accessories"],
    "Toys and Games": ["Board Games", "Educational Toys", "Outdoor Play", "Puzzles", "Toys for Kids"],
    "Travel and Luggage": ["Backpacks", "Luggage", "Outdoor Gear", "Travel Accessories"]
  };

  const convertToBase64 = (e) => {
    const file = e.target.files[0];
    const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB
    if (file && file.size <= maxSizeInBytes) {
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            setPhoto(reader.result); // base64encoded string
        }
        reader.onerror = (error) => {
            console.error(error);
        }
    } 
    else {
        alert('Please select an image smaller than 1 MB.');
        // Clear the input value to allow the user to select another file
        e.target.value = null;
    }
  }

  const removePhoto = () => {
    setPhoto("");
  }

  const handleNewProduct = async () => {
    const data = {name, description, sellerId, sellerName, brand, price, category, subCategory, discount, discountType, photo}
    try {
      const response = await axios.post("https://nexus-backend-380o.onrender.com/product/add", data);
      if (response.data.status === "data missing"){
        alert("Some data is missing. Please add all required data and try again.");
      }
      else if(response.data.status === "added") {
        const updatedList = [...productsList, response.data.item.id]
        setProductsList(updatedList);
        
        const updatedProducts = [...products, response.data.item];
        setProducts(updatedProducts);

        alert("Your Product has been successfully added.");
        navigate("/home/products");
      }
      else if (response.data.status === "fail") {
        alert("Something went wrong");
      }
    }
    catch (error) {
      console.error(error);
    }
  }

  const handleCancelProduct = () => {
    navigate("/home/products");
  }

  return (
    <div>
      <Header headerLine={headerLine}/>

      {/* get all info  */}
      <form id="newProductPage" action="POST" onSubmit={(e) => e.preventDefault()}>
        <div className="px-6 mt-6 font-poppins">
          {/* name  */}
          <div className="flex flex-col mb-4">
            <label htmlFor="name" className="mb-2 font-semibold">Product Name:</label>
            <input 
              id="name"
              type="text" 
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-black rounded-md p-3 min-h-5"
              />
          </div>

          {/* description */}
          <div className="flex flex-col mb-4">
            <label htmlFor="description" className="mb-2 font-semibold">Description:</label>
            <textarea 
              id="description"
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-black rounded-md p-3 min-h-96 resize-none"
            ></textarea>
          </div>

          {/* brand and price */}
          <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 mb-4">
            {/* brand */}
            <div className="flex flex-col pr-2 sm:pr-0 xs:pr-0">
              <label htmlFor="brand" className="mb-2 font-semibold">Brand:</label>
              <input 
                id="brand"
                type="text"
                required
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="border border-black rounded-md p-2"
              />
            </div>
            {/* price */}
            <div className="flex flex-col pl-2 sm:pl-0 xs:pl-0">
              <label htmlFor="price" className="mb-2 font-semibold">Price (₹):</label>
              <input 
                id="price"
                type="number"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-black rounded-md p-2"
              />
            </div>
          </div>

          {/* category and sub category */}
          <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 mb-4">
            {/* category */}
            <div className="flex flex-col pr-2 sm:pr-0 xs:pr-0">
              <label htmlFor="category" className="mb-2 font-semibold">Category:</label>
              <select
                id="category"
                value={category}
                required
                className="border border-black rounded-md p-2"
                onChange={(e) => setCategory(e.target.value)}
              >
                { 
                  categoryList.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))
                }
              </select>
            </div>
            {/* sub category */}
            <div className="flex flex-col pl-2 sm:pl-0 xs:pl-0">
              <label htmlFor="subcategory" className="mb-2 font-semibold">Sub-Category:</label>
              <select
                id="subcategory"
                value={subCategory}
                required
                className="border border-black rounded-md p-2"
                onChange={(e) => setSubCategory(e.target.value)}
              
              >
                { 
                  subCategoryList[category].map((subCategory) => (
                    <option key={subCategory} value={subCategory}>{subCategory}</option>
                  ))
                }
              </select>
            </div>
          </div>

          {/* discount & type */}
          <div className="grid grid-cols-2 sm:grid-cols-1 xs:grid-cols-1 mb-4">
            {/* discount */}
            <div className="flex flex-col pr-2 sm:pr-0 xs:pr-0">
              <label htmlFor="discount" className="mb-2 font-semibold">Discount (%):</label>
              <input 
                id="discount"
                type="number"
                min="0"
                max="100"
                required
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
                className="border border-black rounded-md p-2"
              />
            </div>
            {/* discount type */}
            <div className="flex flex-col pl-2 sm:pl-0 xs:pl-0">
              <label htmlFor="distype" className="mb-2 font-semibold">Discount Type:</label>
              <select
                id="distype"
                value={discountType}
                required
                className="border border-black rounded-md p-2"
                onChange={(e) => setDiscountType(e.target.value)}
              >
                <option key="percentage" value="percentage">Percentage (%)</option>
                {/* <option key="amount" value="amount">Amount (₹)</option> */}
              </select>
            </div>
          </div>

          {/* photo */}
          <div className="flex flex-col">
            <label htmlFor="photo" className="mb-2 font-semibold">Photo:</label>
            <div className="relative">
              <div className="flex items-end">
                <label htmlFor="fileInput" className="cursor-pointer border border-black bg-gray-200 rounded-sm p-1  text-sm">Choose Image*</label>
                <h6 className="font-poppins text-xs text-[#E23232] ml-1"> (max size: 1 MB)</h6>
              </div>
              <input 
                id="fileInput"
                type="file"
                accept="image/*"
                onChange={convertToBase64}
                className="hidden"
              />
            </div>
            {photo &&
              <div className="relative w-fit mt-7">
                <div className="h-32 w-32 border">
                  <img src={photo} alt="Preview" className="h-full w-full object-contain" />
                </div>
                {photo && (
                  <div className="absolute -top-2 -right-2 cursor-pointer">
                    <RxCrossCircled onClick={removePhoto} />
                  </div>
                )}
              </div>
            }
          </div>
          
          {/* button */}
          <div className="flex text-center my-5 space-x-10">
            <button 
              className="px-20 w-full py-3 md:px-14 md:py-2 sm:px-14 sm:py-2 xs:px-14 xs:py-2 rounded-lg shadow-lg font-podkova font-semibold bg-sky-900 text-white text-2xl lg:text-xl md:text-lg sm:text-base xs:text-sm"
              onClick={handleNewProduct}
            >
              ADD
            </button>

            <button 
              className="px-20 w-full py-3 md:px-14 md:py-2 sm:px-14 sm:py-2 xs:px-14 xs:py-2 rounded-lg shadow-lg font-podkova font-semibold bg-sky-900 text-white text-2xl lg:text-xl md:text-lg sm:text-base xs:text-sm"
              onClick={handleCancelProduct}
            >
              CANCEL
            </button>
          </div>

        </div>
      </form>
    </div>
  )
}

export default NewProduct;

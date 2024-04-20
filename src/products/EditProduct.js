import React, { useContext, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { RxCrossCircled } from "react-icons/rx";
import DataContext from '../context/DataContext';
import Header from '../header/Header';
import { categoryList, subCategoryList } from '../dataLists';

const EditProduct = () => {
    const URL = process.env.REACT_APP_BACKEND_URL;
    axios.defaults.maxBodyLength = 10 * 1024 * 1024; // 10 MB
    const headerLine = "UPDATE YOUR PRODUCT ⬆️";
    const navigate = useNavigate();
    const { products, setProducts } = useContext(DataContext);
    const { id } = useParams();
    const product = products.find((product) => product.id === id);
    
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [brand, setBrand] = useState("");
    const [price, setPrice] = useState();
    const [category, setCategory] = useState("Apparel and Fashion");
    const [subCategory, setSubCategory] = useState("Accessories");
    const [discount, setDiscount] = useState();
    const [discountType, setDiscountType] = useState("percentage");
    const [photo, setPhoto] = useState("");

    const [ nameError, setNameError ] = useState('');
    const [ descriptionError, setDescriptionError ] = useState('');
    const [ brandError, setBrandError ] = useState('');
    const [ priceError, setPriceError ] = useState('');
    const [ discountError, setDiscountError ] = useState('');
    const [ photoError, setPhotoError ] = useState('');
    
    useEffect(() => {
        setName(product.name);
        setDescription(product.description);
        setBrand(product.brand);
        setPrice(product.price);
        setCategory(product.category);
        setSubCategory(product.subCategory);
        setDiscount(product.discount);
        setDiscountType(product.discountType);
        setPhoto(product.photo);
    }, []);

    const handleInputChange = (id, value) => {
        switch (id) {
          case "name":
            setName(value);
            setNameError('');
            break;
          case "description":
            setDescription(value);
            setDescriptionError('');
            break;
          case "brand":
            setBrand(value);
            setBrandError('');
            break;
          case "price":
            if(value === ""){
              setPrice("0");
            }
            else {
              setPrice(value);
            }
            setPriceError('');
            break;
          case "discount":
            if(value === ""){
              setDiscount("0");
            }
            else {
              setDiscount(value);
            }
            setDiscountError('');
            break;
          default:
            break;
        }
    };

    const convertToBase64 = (e) => {
        const file = e.target.files[0];
        const maxSizeInBytes = 1 * 1024 * 1024; // 1 MB
        if (file && file.size <= maxSizeInBytes) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                setPhoto(reader.result); // base64encoded string
                setPhotoError('');
            }
            reader.onerror = (error) => {
                console.error(error);
            }
        }
        else {
            alert('Please select an image smaller than 1 MB.');
            // Clear the input value to allow the user to select another file
            e.target.value = null;
            setPhotoError('required*');
        }
    }
    
    const removePhoto = () => {
        setPhoto("");
        setPhotoError('required*');
    }
    
    const handleUpdateProduct = async () => {
    
        // validate
        if (name.length === 0) {
            setNameError('required*');
            return;
        }
        if (description.length === 0) {
            setDescriptionError('required*');
            return;
        }
        if (brand.length === 0) {
            setBrandError('required*');
            return;
        }
        if (price === "0") {
            setPriceError('more than 0');
            return;
        }
        if (price.length === 0) {
            setPriceError('required*');
            return;
        }
        if (discount.length === 0) {
            setDescriptionError('required*');
            return;
        }
        if(photo.length === 0){
            setPhotoError('required*');
            return;
        }

        const data = {id, name, description, brand, price, category, subCategory, discount, discountType, photo};
      
        try {
            const response = await axios.put(`${URL}/product/update`, data);
            if (response.data.status === "data missing"){
                alert("Some data is missing. Please add all required data and try again.");
            }
            else if(response.data.status === "updated") {
                alert("Your profile has been updated");        
                const updatedProductIndex = products.findIndex(product => product.id === id);
                const updatedProducts = [...products];
                updatedProducts[updatedProductIndex] = data;
                setProducts(updatedProducts);
                navigate(`/home/products/${id}`);
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
        navigate(`/home/products/${id}`);
    }

    return (
        <div>
            <Header headerLine={headerLine}/>

            <div className="px-6 mt-6 font-poppins">

                <Link  to={`/home/products/${id}`}>
                    <p className="flex"> &larr; &nbsp;
                        <p className="mb-7 hover:underline focus:underline text-lg">Back</p>        
                    </p>
                </Link>


                {/* get all info  */}
                <form id="updateProduct" action="POST" onSubmit={(e) => e.preventDefault()}>
                    <div>
                        {/* name  */}
                        <div className="flex flex-col mb-4">
                            <div className="flex items-end mb-2">
                                <label htmlFor="name" className="font-semibold">Product Name:</label>
                                {nameError !== "" && <p className="ml-1 text-red-500 text-sm">{nameError}</p> }
                            </div>
                            <input 
                                id="name"
                                type="text" 
                                required
                                maxLength={200}
                                value={name}
                                onChange={(e) => handleInputChange("name", e.target.value)}
                                className="border border-black rounded-md p-3 min-h-5"
                            />
                        </div>

                        {/* description */}
                        <div className="flex flex-col mb-4">
                            <div className="flex items-end mb-2">
                                <label htmlFor="description" className="font-semibold">Description:</label>
                                {descriptionError !== "" && <p className="ml-1 text-red-500 text-sm">{descriptionError}</p> }
                            </div>
                            <textarea 
                                id="description"
                                required
                                value={description}
                                onChange={(e) => handleInputChange("description", e.target.value)}
                                className="border border-black rounded-md p-3 min-h-96 resize-none"
                            ></textarea>
                        </div>

                        {/* brand */}
                        <div className="flex flex-col pr-2 sm:pr-0 xs:pr-0 mb-4">
                            <div className="flex items-end mb-2">
                                <label htmlFor="brand" className="font-semibold">Brand:</label>
                                {brandError !== "" && <p className="ml-1 text-red-500 text-sm">{brandError}</p> }
                            </div>
                            <input 
                                id="brand"
                                type="text"
                                required
                                maxLength={100}
                                value={brand}
                                onChange={(e) => handleInputChange("brand", e.target.value)}
                                className="border border-black rounded-md p-2"
                            />
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
                        <div className="grid grid-cols-3 sm:grid-cols-1 xs:grid-cols-1 mb-4 sm:space-y-4 xs:space-y-4 space-x-4 sm:space-x-0 xs:space-x-0">
                            {/* price */}
                            <div className="flex flex-col sm:pr-0 xs:pr-0">
                                <div className="flex items-end mb-2">
                                    <label htmlFor="price" className="font-semibold text-nowrap">Price (₹):</label>
                                    {priceError !== '' && <p className="ml-1 text-red-500 text-sm">{priceError}</p> }
                                </div>
                                <input 
                                    id="price"
                                    type="number"
                                    required
                                    value={price}
                                    onChange={(e) => handleInputChange("price", e.target.value)}
                                    className="border border-black rounded-md p-2"
                                />
                            </div>
                            {/* discount */}
                            <div className="flex flex-col sm:pr-0 xs:pr-0">
                                <div className="flex items-end mb-2">
                                    <label htmlFor="discount" className="font-semibold text-nowrap">Discount (%):</label>
                                    {discountError !== '' && <p className="ml-1 text-red-500 text-sm">{discountError}</p> }
                                </div>
                                <input 
                                    id="discount"
                                    type="number"
                                    min="0"
                                    max="100"
                                    required
                                    value={discount}
                                    onChange={(e) => handleInputChange("discount", e.target.value)}
                                    className="border border-black rounded-md p-2"
                                />
                            </div>
                            {/* final price */}
                            <div className="flex flex-col sm:pl-0 xs:pl-0">
                                <label htmlFor="discount" className="mb-2 font-semibold">Final Price (₹):</label>
                                <p className="h-full sm:h-10 xs:h-10 border border-black rounded-md p-2">
                                    {discount === "0" ? price : price - (price * discount / 100)}
                                </p>
                            </div>
                        </div>

                        {/* discount type - hidden */}
                        <div className="flex flex-col pl-2 sm:pl-0 xs:pl-0 hidden">
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
                        
                        {/* photo */}
                        <div className="flex flex-col">
                        <div className="flex items-end mb-2">
                            <label htmlFor="photo" className="font-semibold">Photo:</label>
                            {photoError !== "" && <p className="ml-1 text-red-500 text-sm">{photoError}</p> }
                        </div>
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
                            onClick={handleUpdateProduct}
                        >
                            SAVE
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
        </div>
    )
}

export default EditProduct

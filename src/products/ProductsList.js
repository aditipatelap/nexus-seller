import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import DataContext from '../context/DataContext';

const ProductsList = () => {
    const navigate = useNavigate();
    const { productsList, products } = useContext(DataContext);
    console.log(productsList);
    console.log(products);

    const handleNewProduct = () => {
        navigate("/home/products/new")
    }
    
    return (
        <div>
            {/* button for add new product */}
            <div className="text-center my-7">
                <button 
                    className="px-20 py-3 md:px-14 md:py-2 sm:px-14 sm:py-2 xs:px-14 xs:py-2 rounded-lg shadow-lg font-podkova font-semibold bg-sky-900 text-white text-xl lg:text-lg md:text-base sm:text-sm xs:text-xs"
                    onClick={handleNewProduct}
                >
                    ADD NEW PRODUCT
                </button>
            </div>
            {/* list of all products */}
            <div className="my-7">
                {productsList.length === 0 && 
                    <div className="flex justify-center items-center min-h-[55vh]">
                        <p className="font-poppins font-semibold text-xl  text-orange-600 text-center">
                            You have not added any Product Yet. Let's add them & grow your business. 🎉🍾
                        </p>
                    </div>
                }

                {(productsList.length !== 0 && products.length === 0) && (
                    <div className="flex justify-center items-center min-h-[55vh]">
                        <p className="font-poppins font-semibold text-xl  text-orange-600 text-center">
                            😊😊 Loading... Please Wait ... 😊😊
                        </p>
                     </div>
                )}

                {productsList &&
                    <div>
                        {products.map((product) => (
                            <div key={product.id}>
                                <div className="grid grid-cols-5 w-full border border-black rounded-md mb-5 p-7">
                                    <div className="col-span-1 h-full w-full flex justify-center items-center">
                                        <div className="h-40 w-40">
                                            <img src={product.photo} alt="product" className="h-full w-full object-contain"/>
                                        </div>
                                    </div>
                                    <div className="col-span-3 flex flex-col">
                                        <p className="font-balsamiq-sans font-semibold text-2xl mb-3">ITEM ID: {product.id}</p>
                                        <p className="font-poppins text-lg">{product.name}</p>
                                    </div>
                                    {/* for more details */}
                                    <div className="col-span-1 flex justify-center items-center">
                                        <Link to={`/home/products/${product.id}`}>
                                            <button className="px-20 py-3 md:px-14 md:py-2 sm:px-14 sm:py-2 xs:px-14 xs:py-2 rounded-lg font-podkova font-semibold bg-sky-900 text-white text-xl lg:text-lg md:text-base sm:text-sm xs:text-xs">
                                                SHOW
                                            </button>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                }
            </div>
        </div>
    )
}

export default ProductsList

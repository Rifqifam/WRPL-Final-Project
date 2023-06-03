import React, { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import ProductBlockAdmin from "../../Components/productBlock_admin/productBlock";

const AdminPageContent = () => {
   const [currPageAdmin, setCurrentPageAdmin] = useState("add");
   const API_URL = "http://localhost:4000/wrpl-database/";
   const { user } = useUser();
   const [productData, setProductData] = useState({
      name: "",
      price: 0.0,
      desc: "",
      category: "",
      size: "",
      sellerid: "",
   });

   const handlecurrPageAdmin = (page) => {
      setCurrentPageAdmin(page);
   };

   const handleChange = (e) => {
      setProductData({
         ...productData,
         [e.target.name]: e.target.value,
      });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      try {
         const productdata = { productData };
         const body = productdata.productData;
         await fetch(`${API_URL}admin/product/add`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
         });
         //  console.log(body.sellerid);
         console.log("Product created successfully");

         setProductData({
            name: "",
            price: 0.0,
            desc: "",
            category: "",
            size: "",
         });
      } catch (e) {
         console.error(e);
      }
   };
   const [products, setProducts] = useState([]);
   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await fetch(
               `${API_URL}/products?sellerid=${user.id}`
            );
            const data = await response.json();
            setProducts(data.data);
         } catch (error) {
            console.error("Error 'fetchData':", error);
         }
      };
      fetchData();
   }, []);

   return (
      <div className='adminpage_content'>
         <div className='adminpage_content_tab'>
            <ul>
               <li onClick={() => handlecurrPageAdmin("add")}>Add Product</li>
               <li onClick={() => handlecurrPageAdmin("delete")}>
                  Delete Product
               </li>
            </ul>
         </div>
         <div className='adminpage_content_tabcontent'>
            {currPageAdmin === "add" && (
               <>
                  <form
                     onSubmit={handleSubmit}
                     className='adminpage_content_tabcontent_addform'
                  >
                     <label>
                        Product Name:
                        <input
                           type='text'
                           name='name'
                           value={productData.name}
                           onChange={handleChange}
                           required
                        />
                     </label>
                     <label>
                        Price:
                        <input
                           type='number'
                           name='price'
                           value={productData.price}
                           onChange={handleChange}
                           required
                        />
                     </label>
                     <label>
                        Description:
                        <input
                           type='text'
                           name='desc'
                           value={productData.desc}
                           onChange={handleChange}
                           required
                        />
                     </label>
                     <label>
                        Category:
                        <input
                           type='text'
                           name='category'
                           value={productData.category}
                           onChange={handleChange}
                           required
                        />
                     </label>
                     <label>
                        Size:
                        <input
                           type='text'
                           name='size'
                           value={productData.size}
                           onChange={handleChange}
                           required
                        />
                     </label>
                     <label>
                        Seller ID:
                        <input
                           type='text'
                           name='sellerid'
                           value={(productData.sellerid = user.id)}
                           onChange={handleChange}
                           disabled
                        />
                     </label>
                     <button type='submit'>Add Product</button>
                  </form>
               </>
            )}
            {currPageAdmin === "delete" && (
               <>
                  <div className='adminpage_content_tabcontent_delete'>
                     {products.map((product) => (
                        <ProductBlockAdmin
                           name={product.name}
                           image={product.images[0].url}
                           id={product._id}
                        />
                     ))}
                  </div>
               </>
            )}
         </div>
      </div>
   );
};

export default AdminPageContent;

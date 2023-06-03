import React, { useState, useEffect } from "react";
import "./cart.scss";
import { useParams } from "react-router-dom";
import CartItem from "../../Components/cartItem/cartItem"; // Adjust the file path accordingly

const Cart = () => {
  return (
    <div className="cart_wrapper">
      <div className="cart_wrapper_leftcol">
        <div className="cart_wrapper_leftcol_shoppingCartItem ">
          <h1>Shopping Cart</h1>
          <h1>T-Shirt</h1>
          <h1>T-Shirt</h1>
          <h1>T-Shirt</h1>
          <h1>T-Shirt</h1>
        </div>
        <div className="cart_wrapper_leftcol_price_qty">
          <h1>Price</h1>
          <h1>Rp.19.000</h1>
          <h1>Rp.19.000</h1>
          <h1>Rp.19.000</h1>
          <h1>Rp.19.000</h1>
        </div>
        <div className="cart_wrapper_leftcol_price_qty">
          <h1>Qty</h1>
        </div>
      </div>
      <div className="cart_wrapper_rightcol">
        <div className="cart_wrapper_rightcol_box_my_cart">
          <h1 className="boxTitle">My Cart</h1>
          <div className="cart_wrapper_rightcol_box_my_cart_items">
            <h1>T-Shirt</h1>
            <h1>T-Shirt</h1>
            <h1>T-Shirt</h1>
            <h1>T-Shirt</h1>
          </div>
          <div className="cart_wrapper_rightcol_box_my_cart_total">
            <div className="line"></div>
            <p className="title_total">Total:</p>
            <h1 className="price_total">Rp.19.000</h1>
            <div className="cart_wrapper_rightcol_box_my_cart_total_checkoutBtn">
              {" "}
              <button className="btn">Checkout</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

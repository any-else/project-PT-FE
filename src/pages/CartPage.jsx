import React from "react";
import Header from "../components/header/Header";
import axios from "axios";
import Cookies from "js-cookie";

const CartPage = () => {
  const [cartProduct, setCartProduct] = React.useState([]);
  const userCookie = Cookies.get("user");

  const handleCallCart = async () => {
    const res = await axios.get("http://localhost:8080/api/v1/cart-items", {
      withCredentials: true,
    });
    setCartProduct(res.data.cartData);
  };

  React.useEffect(() => {
    handleCallCart();
  }, []);

  const handleIncrement = async (id) => {
    await axios.post("http://localhost:8080/api/v1/cart-increment", {
      cart_id: JSON.parse(localStorage.getItem("cart_id")),
      product_id: id,
    });
    handleCallCart();
  };

  const handleDecrement = async (id) => {
    await axios.post("http://localhost:8080/api/v1/cart-decrement", {
      cart_id: JSON.parse(localStorage.getItem("cart_id")),
      product_id: id,
    });
    handleCallCart();
  };

  return (
    <div>
      <Header />

      <table style={{ border: "1px solid black", width: "100%" }}>
        <thead>
          <tr>
            <th style={{ border: "1px solid black", padding: "8px" }}>name</th>

            <th style={{ border: "1px solid black", padding: "8px" }}>
              quantity
            </th>
            <th style={{ border: "1px solid black", padding: "8px" }}>price</th>
          </tr>
        </thead>
        <tbody>
          {cartProduct &&
            cartProduct.map((item) => {
              return (
                <tr key={item.product_id}>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {item.product_name}
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    <button onClick={() => handleIncrement(item.product_id)}>
                      +
                    </button>{" "}
                    {item.quanity}{" "}
                    <button onClick={() => handleDecrement(item.product_id)}>
                      -
                    </button>
                  </td>
                  <td style={{ border: "1px solid black", padding: "8px" }}>
                    {item.quanity * item.price}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>

      <div>
        {" "}
        <span>
          {" "}
          Tổng thanh toán:{" "}
          {cartProduct.reduce((prev, current, index) => {
            return prev + current.quanity * current.price;
          }, 0)}
        </span>{" "}
        <button> Thanh toán</button>
      </div>
    </div>
  );
};

export default CartPage;

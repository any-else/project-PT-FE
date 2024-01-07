import axios from "axios";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const DetailPage = () => {
  const param = useParams();
  const navigate = useNavigate();
  const [product, setProducts] = React.useState({});
  const [quantity, setQuantity] = React.useState(0);

  const callProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/products/${param.id}`
      );
      setProducts(response.data.product);
    } catch (error) {
      return error;
    }
  };

  React.useEffect(() => {
    callProduct();
  }, []);

  const handleAddToCart = async () => {
    try {
      // kiểm tra xem tài khoản đã đăng nhập hay chưa
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user) {
        navigate("/auth/sign-in");
      }
      // gọi API => đưa sản phẩm này vào cart-item
      // đi tìm id của product thứ 2 id của cart_id,
      const dataCart = {
        product_id: param.id,
        cart_id: JSON.parse(localStorage.getItem("cart_id")),
        quantity: 1,
        user_id: user.user_id,
      };

      const res = await axios.post(
        "http://localhost:8080/api/v1/cart-item",
        dataCart
      );
      setQuantity(res.data.quantityCart);
      console.log("res", res);
      toast(res.data.message);
    } catch (error) {
      return error;
    }
  };
  console.log("quantity header", quantity);

  return (
    <>
      <ToastContainer />
      <Header quantity_props={quantity} />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <img src={product.image} style={{ width: "800px", height: "700px" }} />

        <div>
          <h3>{product.product_name}</h3>
          <p>{product.price}</p>
          <p>{product.description_product}</p>

          <button onClick={handleAddToCart} style={{ cursor: "pointer" }}>
            Thêm vào giỏ hàng{" "}
          </button>
        </div>
      </div>
    </>
  );
};

export default DetailPage;

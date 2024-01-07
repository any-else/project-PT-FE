import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../components/header/Header";
import Cookies from "js-cookie";

const HomePage = () => {
  const [products, setProducts] = React.useState([]);
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  //lấy user từ cookie
  const userCookie = Cookies.get("user");
  //call API
  const callProduct = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/products");
      console.log("data trả về =========>", response);
      setProducts(response.data.product);
      // nếu như có user tạo mới cart
      if (user) {
        await axios.post(
          "http://localhost:8080/api/v1/cart",
          {
            userCookie,
          },
          {
            withCredentials: true,
          }
        );
      }
    } catch (error) {
      return error;
    }
  };

  React.useEffect(() => {
    callProduct();
  }, []);

  const handleClickDetail = (id) => {
    navigate(`/product/${id}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Header />
      <main>
        <div style={{ display: "flex", gap: "20px" }}>
          {products?.map((product) => {
            return (
              <div
                key={product.product_id}
                style={{
                  border: "1px solid black",
                  height: "400px",
                  display: "flex",
                  gap: "20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
                onClick={() => handleClickDetail(product.product_id)}
              >
                <img src={product.image} />
                <div>
                  <div>{product.product_name}</div>
                  <div>{product.price}</div>

                  <div>{product.description}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
      <footer
        style={{
          position: "absolute",
          bottom: 0,
        }}
      >
        Đây là footer
      </footer>
    </div>
  );
};

export default HomePage;

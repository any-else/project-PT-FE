import axios from "axios";
import React from "react";
import { useNavigate } from "react-router-dom";

const Header = ({ quantity_props }) => {
  const [quantity, setQuantity] = React.useState(0);
  const navigate = useNavigate();

  //cALL API cart Để lấy ra quantity
  const callCart = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/v1/cart");
      console.log("response", response);
      setQuantity(response.data.quantity);
      localStorage.setItem("cart_id", JSON.stringify(response.data.cart_id));
    } catch (error) {
      return error;
    }
  };

  React.useEffect(() => {
    callCart();
  }, []);

  const handleToCart = () => {
    navigate("/cart");
  };
  console.log(quantity_props);

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        gap: "100px",
      }}
    >
      đây là header
      <div style={{ cursor: "pointer" }} onClick={handleToCart}>
        {" "}
        giỏ hàng: {quantity_props ? quantity_props : quantity}{" "}
      </div>
    </header>
  );
};

export default Header;

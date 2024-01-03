import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Signup = () => {
  const [inputValue, setInputValue] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const handleOnChange = (e) => {
    setInputValue((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  console.log("thông tin của người dùng", inputValue);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/signup",
        inputValue
      );
      if (res) {
        toast("đăng ký thành công");
        setTimeout(() => {
          navigate("/auth/sign-in");
        }, 1500);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        onSubmit={handleSubmit}
      >
        <label>username</label>
        <input
          value={inputValue.username}
          name="username"
          onChange={handleOnChange}
        />
        <label>email</label>
        <input
          type="email"
          value={inputValue.email}
          name="email"
          onChange={handleOnChange}
        />
        <label>password</label>
        <input
          value={inputValue.password}
          name="password"
          onChange={handleOnChange}
          type="password"
        />
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Signup;

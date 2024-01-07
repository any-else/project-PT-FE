import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const [inputValue, setInputValue] = useState({
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        inputValue,
        {
          withCredentials: true,
        }
      );
      localStorage.setItem("user", JSON.stringify(res.data.user));
      navigate("/");
    } catch (error) {
      toast(error.response.data.message);
    }
  };

  return (
    <div>
      <ToastContainer />
      <form
        style={{ display: "flex", flexDirection: "column", gap: "10px" }}
        onSubmit={handleSubmit}
      >
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

export default SignIn;

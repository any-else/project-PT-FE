import { useState } from "react";

import "./App.css";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Signup from "./components/singup/Signup";
import SignIn from "./components/singin/SignIn";
import HomePage from "./pages/HomePage";
import DetailPage from "./pages/DetailPage";
import CartPage from "./pages/CartPage";

function App() {
  return (
    <Routes>
      <Route path="/auth" element={<AuthPage />}>
        <Route path="signup" element={<Signup />} />
        <Route path="sign-in" element={<SignIn />} />
      </Route>
      <Route path="/" element={<HomePage />}></Route>
      <Route path="/product/:id" element={<DetailPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/shared/Layout";
import Dashboard from "./component/Dashboard";
import Product from "./component/Product";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import UserList from "./component/UserList";
import Order from "./component/Order";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Product />} />
          <Route path="products/add-product" element={<AddProduct />} />
          <Route path="products/edit-product/:productId" element={<EditProduct />} />
          <Route path="users" element={<UserList/>} />
          <Route path="orders" element={<Order/>} />
        </Route>
      </Routes>
    </Router>
  );
}

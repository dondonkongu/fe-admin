import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./component/shared/Layout";
import Dashboard from "./component/Dashboard";
import Product from "./component/Product";
import AddProduct from "./pages/AddProduct";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<Product />} />
          <Route path="add-product" element={<AddProduct />} />
 
        </Route>
      </Routes>
    </Router>
  );
}

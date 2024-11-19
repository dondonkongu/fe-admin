import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../api";
import { notification } from "antd";
import { Button, Modal } from 'antd';

export default function Product() {
  const [products, setProducts] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProductDelete, setIdProductDelete] = useState(null);

  const showModal = (id) => {
    setIdProductDelete(id);
    setIsModalOpen(true);

  };

  const handleOk = () => {
    handleDelete(idProductDelete);
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await BASE_URL.get("dt-store/products");
      const data = await response.data.result;
      setProducts(data);
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async(id) => {
    await BASE_URL.delete(`dt-store/products/${id}`)
    .then((response) => {
      notification.success({
        message: response.data.message||"Xóa sản phẩm thành công",
      });
    })
    .catch((error) => {
      console.log(error);
      
      notification.error({
        message: "Xóa sản phẩm thất bại",
      });
    });
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      <Link
        to="/products/add-product"
        className="bg-blue-500 text-white py-2 px-4 rounded mb-4 inline-block"
      >
        Thêm sản phẩm mới
      </Link>

      <table className="min-w-full table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border border-gray-300 px-4 py-2">Tên sản phẩm</th>
            <th className="border border-gray-300 px-4 py-2">Mã sản phẩm</th>
            <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
            <th className="border border-gray-300 px-4 py-2">Giá</th>
            <th className="border border-gray-300 px-4 py-2">Số lượng</th>
            <th className="border border-gray-300 px-4 py-2">Đã bán</th>
            <th className="border border-gray-300 px-4 py-2">Giảm giá</th>
            <th className="border border-gray-300 px-4 py-2">Hành động</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={index} className="hover:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">
                {product.name}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.code}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.images.find((image) => image.isMain) && (
                  <img
                    src={product.images.find((image) => image.isMain).url}
                    alt="Main product image"
                    className="w-12 h-12 object-cover"
                  />
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.price.toLocaleString()} VND
              </td>

            {/* lay tong so luong tu image */}
              <td className="border border-gray-300 px-4 py-2">
                {product.images
                  .flatMap((image) => image.sizes)
                  .reduce((total, size) => total + size.quantity, 0)}
              </td>
              {/* lay tong so luong da ban image */}
              <td className="border border-gray-300 px-4 py-2">
                {product.images
                  .flatMap((image) => image.sizes)
                  .reduce((total, size) => total + size.sold, 0)}
              </td>

              <td className="border border-gray-300 px-4 py-2">
                {(product.discount * 100).toFixed(0)}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to={`/products/edit-product/${product.id}`}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Sửa
                </Link>
                <Button type="primary" onClick={()=>showModal(product.id)} danger>
               Xóa
              </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Modal title="Thông báo" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Bạn chắc chắn muốn xóa sản phẩm này ?</p>
        
      </Modal>
    </div>
  );
}

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../api";
import { notification } from "antd";
import { Button, Modal,Pagination } from "antd";
import { set } from "date-fns";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [variants, setVariants] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idProductDelete, setIdProductDelete] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

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
    fetchProducts(currentPage,pageSize);
  }, [currentPage]);

  const fetchProducts = async (page,size) => {
    try {
      const response = await BASE_URL.get(`dt-store/products?page=${page}&size=${size}`);
      const result = response.data.result;
      setProducts(result.data);
      setCurrentPage(result.currentPage);
      setTotalPages(result.totalPages);
      setTotalElements(result.totalElements);   
      setPageSize(result.pageSizes);
      console.log(result);
      
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Lỗi tải danh sách sản phẩm",
        description: "Không thể lấy dữ liệu sản phẩm. Vui lòng thử lại sau.",
      });
    }
  };

  const handleDelete = async (id) => {
    try {
      const res = await BASE_URL.delete(`dt-store/products/${id}`);
      notification.success({
        message: res.data.message||"Xóa sản phẩm thành công",
      });
      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Xóa sản phẩm thất bại",
        description: "Không thể xóa sản phẩm. Vui lòng thử lại sau.",
      });
    }
  };

  const fetchVariants = async (id) => {
    try {
      const response = await BASE_URL.get(`dt-store/variants/product/${id}`);
      setVariants(response.data.result);
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Lỗi tải biến thể",
        description: "Không thể tải danh sách biến thể. Vui lòng thử lại sau.",
      });
    }
  };

  const handleProductClick = (productId) => {
    setSelectedProduct(productId);
    fetchVariants(productId);
  };
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <h2 className="text-xl font-semibold mb-2">Sản phẩm</h2>
          <table className="min-w-full table-auto border-collapse border shadow-sm border-gray-300">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Tên sản phẩm</th>
                <th className="border border-gray-300 px-4 py-2">Mã sản phẩm</th>
                <th className="border border-gray-300 px-4 py-2">Hình ảnh</th>
                <th className="border border-gray-300 px-4 py-2">Đã bán</th>
                <th className="border border-gray-300 px-4 py-2">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`cursor-pointer ${
                    selectedProduct === product.id ? "bg-blue-100" : ""
                  } hover:bg-gray-100`}
                >
                  <td className="border border-gray-300 px-4 py-2">
                    {product.name}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.code}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <img
                      src={product.images.filter((image) => image.isMain===true)}
                      alt={product.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {product.totalSold || 0}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    <Button
                      type="link"
                      onClick={() => handleProductClick(product.id)}
                    >
                      Xem chi tiết
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => showModal(product.id)}
                    >
                      Xóa
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <Pagination align="center"  total={totalElements} pageSize={pageSize} current={currentPage} onChange={handlePaginationChange} />
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-2">Chi tiết</h2>
          {selectedProduct ? (
            <ul className="border border-gray-300 rounded-lg p-2">
              {variants.map((variant) => (
                <li key={variant.id} className="p-2 border-b">
                  <p>Màu sắc: {variant.color}</p>
                  <p>Kích cỡ: {variant.size}</p>
                  <p>Giá: {variant.price} VNĐ</p>
                  <p>Tồn kho: {variant.stock}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p>Chọn sản phẩm để xem chi tiết.</p>
          )}
        </div>
      </div>
      <Modal
        title="Xác nhận xóa sản phẩm"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="Xóa"
        cancelText="Hủy"
      >
        <p>Bạn có chắc chắn muốn xóa sản phẩm này không?</p>
      </Modal>
    </div>
  );
}

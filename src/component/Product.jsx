import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BASE_URL from "../api";
import { notification } from "antd";
import { Button, Modal, Pagination,Input } from "antd";

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

  const [isVariantModalOpen, setIsVariantModalOpen] = useState(false);
  const [currentVariant, setCurrentVariant] = useState({
    productId: "",
    color: "",
    size: "",
    price: "",
    stock: ""
  });
  
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
  const handleVariantModalCancel = () => {
    setIsVariantModalOpen(false);
  };

  useEffect(() => {
    fetchProducts(currentPage, pageSize);
  }, [currentPage]);

  const fetchProducts = async (page, size) => {
    try {
      const response = await BASE_URL.get(
        `dt-store/products?page=${page}&size=${size}`
      );
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
        message: res.data.message || "Xóa sản phẩm thành công",
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
  const handleDeleteVariant = async (id) => {
    try {
      const res = await BASE_URL.delete(`dt-store/variants/${id}`);
      notification.success({
        message: res.data.message || "Xóa mẫu thành công",
      });
      setVariants(variants.filter((variant) => variant.id !== id));
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Xóa mẫu thất bại",
        description: "Không thể xóa mẫu. Vui lòng thử lại sau.",

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
    setCurrentVariant({ ...currentVariant,productId: productId });
    fetchVariants(productId);
  };
  const handlePaginationChange = (page) => {
    setCurrentPage(page);
  };

  const showVariantModal = () => {
    setIsVariantModalOpen(true);
  }


  const handleAddVariant = async (id) => {
    try {
      const res = await BASE_URL.post("dt-store/variants", currentVariant);
      notification.success({ message: "Thêm mẫu thành công" });
      setVariants([...variants, res.data.result]);
      setCurrentVariant({productId:"", color: "", size: "", price: "", stock: "" }); 
      setIsVariantModalOpen(false); 
    } catch (error) {
      notification.error({ message: "Thêm mẫu thất bại" });
    }
  };
  

  return (
    <div className="container mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
      <div className="flex justify-end mb-6">
        <Link to="add-product">
          <Button type="primary"> + Thêm sản phẩm</Button>
        </Link>
      </div>
      <h1 className="text-3xl font-extrabold mb-6 text-center text-gray-700">
        Quản lý sản phẩm
      </h1>
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">Sản phẩm</h2>
          <table className="min-w-full table-auto border-collapse border shadow-sm rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-gradient-to-r from-blue-500 to-blue-400 text-white">
                <th className="border border-gray-200 px-6 py-3">Tên sản phẩm</th>
                <th className="border border-gray-200 px-6 py-3">Mã sản phẩm</th>
                <th className="border border-gray-200 px-6 py-3">Hình ảnh</th>
                <th className="border border-gray-200 px-6 py-3">Đã bán</th>
                <th className="border border-gray-200 px-6 py-3">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className={`cursor-pointer ${
                    selectedProduct === product.id ? "bg-blue-100" : ""
                  } hover:bg-gray-50 transition-all`}
                >
                  <td className="border border-gray-200 text-gray-700">
                    {product.name}
                  </td>
                  <td className="border border-gray-200 text-gray-700">
                    {product.code}
                  </td>
                  <td className="border border-gray-200 ">
                    <div className="flex overflow-x-auto max-w-[150px]">
                      {product.images.map((image) => (
                        <img
                          key={image.id}
                          src={image.url}
                          alt={product.name}
                          className="w-14 h-14 object-cover rounded shadow-sm"
                        />
                      ))}
                    </div>
                  </td>
                  <td className="border border-gray-200 text-gray-700">
                    {product.totalSold || 0}
                  </td>
                  <td className="border border-gray-200 ">
                    <div className="flex items-center justify-start space-x-3 h-full">
                      <Button
                        type="link"
                        onClick={() => handleProductClick(product.id)}
                        className="text-blue-500 hover:underline"
                      >
                        Xem chi tiết
                      </Button>
                      <Button
                        type="default"
                        onClick={() => showModal(product.id)}
                        className="bg-red-500 hover:bg-red-600 text-white"
                      >
                        Xóa
                      </Button>
                      <Link to={`edit-product/${product.id}`}>
                        <Button
                          type="default"
                          className="bg-yellow-500 hover:bg-yellow-600 text-white"
                        >
                          Sửa
                        </Button>
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
  
          <div className="flex justify-center mt-4">
            <Pagination
              total={totalElements}
              pageSize={pageSize}
              current={currentPage}
              onChange={handlePaginationChange}
              className="rounded-lg"
            />
          </div>
        </div>
  
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-gray-600">
            Chi tiết
          </h2>
  
          {selectedProduct ? (
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full table-auto border-collapse">
                <thead>
                  <tr>
                    <th className="px-4 py-2 border-b text-left">Màu sắc</th>
                    <th className="px-4 py-2 border-b text-left">Kích cỡ</th>
                    <th className="px-4 py-2 border-b text-left">Giá</th>
                    <th className="px-4 py-2 border-b text-left">Tồn kho</th>
                    <th className="px-4 py-2 border-b text-left">Đã bán</th>
                    <th className="px-4 py-2 border-b text-left">Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {variants.map((variant) => (
                    <tr key={variant.id} className="hover:bg-gray-100">
                      <td className="px-4 py-2 border-b">{variant.color}</td>
                      <td className="px-4 py-2 border-b">{variant.size}</td>
                      <td className="px-4 py-2 border-b">{variant.price} VNĐ</td>
                      <td className="px-4 py-2 border-b">{variant.stock}</td>
                      <td className="px-4 py-2 border-b">{variant.sold}</td>
                      <td className="px-4 py-2 border-b flex gap-2">
                        <button
                          className="px-4 py-2 text-white bg-blue-500 hover:bg-blue-600 rounded-lg"
                          onClick={() => handleEditVariant(variant.id)}
                        >
                          Sửa
                        </button>
                        <button
                          className="px-4 py-2 text-white bg-red-500 hover:bg-red-600 rounded-lg"
                          onClick={() => handleDeleteVariant(variant.id)}
                        >
                          Xóa
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {/* Thêm mẫu - nút Thêm */}
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => showVariantModal()}
                  className="px-4 py-2 text-white bg-green-500 hover:bg-green-600 rounded-lg"
                >
                  + Thêm mẫu
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-500 italic">
              Chọn sản phẩm để xem chi tiết.
            </p>
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
        className="rounded-lg"
      >
        <p className="text-red-500">
          Bạn có chắc chắn muốn xóa sản phẩm này không?
        </p>
      </Modal>
      <Modal
        title= "Thêm mẫu"
        open={isVariantModalOpen}
        onOk={handleAddVariant}
        onCancel={handleVariantModalCancel}
        okText= "Thêm"
        cancelText="Hủy"
      >
        <div>
          <Input
            value={currentVariant.color}
            onChange={(e) => setCurrentVariant({ ...currentVariant, color: e.target.value })}
            placeholder="Màu sắc"
            className="mb-4"
          />
          <Input
            value={currentVariant.size}
            onChange={(e) => setCurrentVariant({ ...currentVariant, size: e.target.value })}
            placeholder="Kích cỡ"
            className="mb-4"
          />
          <Input
            value={currentVariant.price}
            onChange={(e) => setCurrentVariant({ ...currentVariant, price: e.target.value })}
            placeholder="Giá"
            className="mb-4"
          />
          <Input
            value={currentVariant.stock}
            onChange={(e) => setCurrentVariant({ ...currentVariant, stock: e.target.value })}
            placeholder="Tồn kho"
            className="mb-4"
          />
        </div>
      </Modal>
    </div>
  );
  
}

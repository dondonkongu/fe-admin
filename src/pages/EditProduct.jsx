import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { notification, Button, Spin, Input, Upload, Checkbox, Popconfirm } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import BASE_URL from '../api';

export default function EditProduct() {
  const { productId } = useParams(); 
  console.log(productId);


  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryId, setCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchCategories();
    fetchProductDetails();
  }, []);

 
  const fetchCategories = async () => {
    try {
      const response = await BASE_URL.get('dt-store/categories');
      setCategories(response.data.result);
    } catch (error) {
      console.error(error);
      notification.error({
        message: 'Lỗi tải danh mục',
        description: 'Không thể tải danh mục sản phẩm.',
      });
    }
  };

  // Lấy thông tin sản phẩm từ API
  const fetchProductDetails = async () => {
    setLoading(true);
    try {
      const response = await BASE_URL.get(`/dt-store/products/${productId}`);
      
      console.log(response.data);
      
      const productData = response.data.result;
      setProduct(productData);
      setName(productData.name);
      setDescription(productData.description);
      setCategoryId(productData.categoryId);
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Không thể tải dữ liệu sản phẩm.',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProduct = async () => {
    if (!name || !description || !categoryId) {
      notification.error({
        message: 'Lỗi',
        description: 'Tên, mô tả và danh mục không được để trống.',
      });
      return;
    }

    const formData = new FormData();
    formData.append('name', name);
    formData.append('description', description);
    formData.append('categoryId', categoryId);


    try {
      setLoading(true);
      const response = await BASE_URL.put(`/dt-store/products/${productId}`, formData);
      notification.success({
        message: 'Cập nhật thành công',
        description: 'Sản phẩm đã được cập nhật.',
      });
      navigate('/products'); 
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra khi cập nhật sản phẩm.',
      });
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Chỉnh sửa sản phẩm</h1>

      {loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div className="space-y-4">
            {/* Tên sản phẩm */}
            <div>
              <label className="block font-medium">Tên sản phẩm:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Nhập tên sản phẩm"
              />
            </div>

            {/* Mô tả */}
            <div>
              <label className="block font-medium">Mô tả:</label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Nhập mô tả sản phẩm"
              />
            </div>

            {/* Danh mục */}
            <div>
              <label className="block font-medium">Danh mục:</label>
              <select
                value={categoryId}
                onChange={(e) => setCategoryId(e.target.value)}
                className="w-full px-4 py-2 border rounded"
              >
                <option value="">Chọn danh mục</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="flex justify-end mt-4">
              <Button
                type="primary"
                onClick={handleUpdateProduct}
                className="bg-blue-500 hover:bg-blue-600 text-white"
                disabled={loading}
              >
                {loading ? <Spin /> : 'Cập nhật sản phẩm'}
              </Button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

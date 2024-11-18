import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BASE_URL from '../api';
import { notification } from 'antd';

export default function AddProduct() {
  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    price: 0,
    material: '',
    origin: '',
    discount: 0,
    categoryId: '',
    images: [
      {
        url: '',
        color: '',
        isMain: false,
        sizes: [
          { name: '', quantity: 0, sold: 0 },
        ],
      },
    ],
  });

  const [category, setCategory] = useState([]);
  useEffect(() => {
    fetchCategories();
  }, []);

  // Lấy danh sách danh mục
  const fetchCategories = async () => {
    try {
      const response = await BASE_URL.get('/dt-store/categories');
      setCategory(response.data.result);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Hàm upload hình ảnh
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await BASE_URL.post('/dt-store/images/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      console.log(response.data.result);
      return response.data.result;
      
      
      // URL trả về từ server
    } catch (error) {
      console.error('Error uploading image:', error);
      throw new Error('Image upload failed');
    }
  };

  // Thay đổi thông tin chung của form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Thay đổi thông tin hình ảnh
  const handleImageChange = (index, field, value) => {
    const newImages = [...formData.images];
    newImages[index][field] = value;
    setFormData({ ...formData, images: newImages });
  };

  // Upload file và cập nhật URL vào image
  const handleFileChange = async (index, e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const uploadedUrl = await uploadImage(file);
        const newImages = [...formData.images];
        newImages[index].url = uploadedUrl;
        setFormData({ ...formData, images: newImages });
      } catch (error) {
        console.error('Failed to upload image:', error);
      }
    }
  };

  // Thay đổi thông tin size
  const handleSizeChange = (imageIndex, sizeIndex, field, value) => {
    const newImages = [...formData.images];
    newImages[imageIndex].sizes[sizeIndex][field] = value;
    setFormData({ ...formData, images: newImages });
  };

  // Thêm hình ảnh mới
  const addImage = () => {
    setFormData({
      ...formData,
      images: [
        ...formData.images,
        { url: '', color: '', isMain: false, sizes: [{ name: '', quantity: 0, sold: 0 }] },
      ],
    });
  };

  // Xóa hình ảnh
  const removeImage = (index) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    setFormData({ ...formData, images: newImages });
  };

  // Thêm kích thước mới
  const addSize = (index) => {
    const newImages = [...formData.images];
    newImages[index].sizes.push({ name: '', quantity: 0, sold: 0 });
    setFormData({ ...formData, images: newImages });
  };

  // Xóa kích thước
  const removeSize = (imageIndex, sizeIndex) => {
    const newImages = [...formData.images];
    newImages[imageIndex].sizes = newImages[imageIndex].sizes.filter((_, i) => i !== sizeIndex);
    setFormData({ ...formData, images: newImages });
  };

  // Gửi form len sẻver
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form data:', formData);
    try {
      const response = await BASE_URL.post('/dt-store/products', formData);
      console.log('Product added:', response.data);
      notification.success({
        message: 'Thêm sản phẩm thành công',
        description: 'Sản phẩm đã được thêm vào hệ thống',  
      });
    } catch (error) {
      console.error('Error adding product:', error);
      notification.error({
        message: 'Thêm sản phẩm thất bại',
        description: 'Vui lòng thử lại sau',
      });
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 rounded shadow-lg">
      <h1 className="text-3xl font-bold text-gray-700 mb-6">Thêm sản phẩm mới</h1>
      <form onSubmit={handleSubmit}>
        {/* Tên sản phẩm */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Tên sản phẩm</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Tên sản phẩm"
            required
            className="w-full p-3 border rounded"
          />
        </div>
        {/* Mã sản phẩm */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Mã sản phẩm</label>
          <input
            type="text"
            name="code"
            value={formData.code}
            onChange={handleInputChange}
            placeholder="Mã sản phẩm"
            required
            className="w-full p-3 border rounded"
          />
        </div>
          {/* Danh mục */}
          <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Danh mục</label>
          <select
            name="categoryId"
            value={formData.categoryId}
            onChange={handleInputChange}
            required
            className="w-full p-3 border rounded"
          >
            <option value="">Chọn danh mục</option>
            {category.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        {/* Mô tả */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            placeholder="Mô tả"
            required
            className="w-full p-3 border rounded"
          />
        </div>
         {/* Giá */}
         <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Giá</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleInputChange}
            placeholder="Giá"
            required
            className="w-full p-3 border rounded"
          />
        </div>
        {/* Chất liệu */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Chất liệu</label>
          <input
            type="text"
            name="material"
            value={formData.material}
            onChange={handleInputChange}
            placeholder="Chất liệu"
            required
            className="w-full p-3 border rounded"
          />
        </div>
        {/* Xuất xứ */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Xuất xứ</label>
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleInputChange}
            placeholder="Xuất xứ"
            required
            className="w-full p-3 border rounded"
          />
        </div>
        {/* Giảm giá */}
        <div className="mb-4">
          <label className="block text-gray-700 font-semibold">Giảm giá</label>
          <input
            type="number"
            name="discount"
            value={formData.discount}
            onChange={handleInputChange}
            placeholder="Giảm giá"
            required
            className="w-full p-3 border rounded"
          />
        </div>
      

       

        {/* Hình ảnh và kích thước */}
        {formData.images.map((image, index) => (
          <div key={index} className="border p-4 mb-4 rounded bg-white">
            <h3 className="text-lg font-semibold text-gray-700">Hình ảnh {index + 1}</h3>
            <div className="mb-2">
              <label className="block text-gray-700">Upload hình ảnh</label>
              <input
                type="file"
                onChange={(e) => handleFileChange(index, e)}
                className="w-full p-3 border rounded"
              />
              {image.url && (
                <img src={image.url} alt={`Uploaded ${index}`} className="mt-2 max-h-40" />
              )}
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Tên màu</label>
              <input
                type="text"
                value={image.color}
                onChange={(e) => handleImageChange(index, 'color', e.target.value)}
                placeholder="Tên màu"
                className="w-full p-3 border rounded"
              />
            </div>
            <div className="mb-2 flex items-center">
              <label className="block text-gray-700 mr-2">Ảnh chính</label>
              <input
                type="checkbox"
                checked={image.isMain}
                onChange={(e) => handleImageChange(index, 'isMain', e.target.checked)}
              />
            </div>

            <div className="mt-4">
              <h4 className="font-semibold text-gray-700">Kích thước</h4>
              {image.sizes.map((size, sizeIndex) => (
                <div key={sizeIndex} className="flex space-x-4 items-center mb-2">
                  <input
                    type="text"
                    value={size.name}
                    onChange={(e) => handleSizeChange(index, sizeIndex, 'name', e.target.value)}
                    placeholder="Tên kích thước"
                    className="p-2 border rounded w-1/3"
                  />
                  <input
                    type="number"
                    value={size.quantity}
                    onChange={(e) => handleSizeChange(index, sizeIndex, 'quantity', e.target.value)}
                    placeholder="Số lượng"
                    className="p-2 border rounded w-1/3"
                  />
                  <input
                    type="number"
                    value={size.sold}
                    onChange={(e) => handleSizeChange(index, sizeIndex, 'sold', e.target.value)}
                    placeholder="Đã bán"
                    className="p-2 border rounded w-1/3"
                  />
                  <button
                    type="button"
                    onClick={() => removeSize(index, sizeIndex)}
                    className="bg-red-500 text-white px-3 py-1 rounded"
                  >
                    Xóa
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => addSize(index)}
                className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
              >
                Thêm kích thước
              </button>
            </div>

            <button
              type="button"
              onClick={() => removeImage(index)}
              className="bg-red-500 text-white px-3 py-1 rounded mt-4"
            >
              Xóa hình ảnh
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addImage}
          className="bg-green-500 text-white px-4 py-2 rounded mb-6"
        >
          Thêm hình ảnh
        </button>

        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Thêm sản phẩm
        </button>
      </form>
    </div>
  );
}

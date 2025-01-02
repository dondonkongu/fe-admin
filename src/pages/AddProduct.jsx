import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { notification, Upload, Button, Spin, Checkbox } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import BASE_URL from "../api";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState(0);
  const [material, setMaterial] = useState("");
  const [images, setImages] = useState([]);
  const [totalSold, setTotalSold] = useState(0);
  const [categoryId, setCategoryId] = useState("");
  const [categories, setCategories] = useState([]);
  const [subcategoryId, setSubcategoryId] = useState("");
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories();
    fetchSubcategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await BASE_URL.get("dt-store/categories");
      setCategories(response.data.result);
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Lỗi tải danh mục",
        description: "Không thể lấy dữ liệu danh mục. Vui lòng thử lại sau.",
      });
    }
  };
  const fetchSubcategories = async () => {
    try {
      const response = await BASE_URL.get(`dt-store/subcategories`);
      setSubcategories(response.data.result);
    } catch (error) {
      console.error(error);
      notification.error({
        message: "Lỗi tải danh mục con",
        description: "Không thể lấy dữ liệu danh mục con. Vui lòng thử lại sau.",
      });
    }
  };


  // Hàm tải ảnh lên Cloudinary
  const handleUploadToCloudinary = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file);
    try {
      const response = await BASE_URL.post(
        "/dt-store/images/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      const data = response.data;
      const newImage = {
        url: data.result,
        isMain: images.length === 0, 
        file: file.originFileObj,
      };

      setImages((prevImages) => [...prevImages, newImage]);

      notification.success({
        message: "Upload thành công",
        description: "Ảnh đã được tải lên Cloudinary.",
      });
    } catch (error) {
      notification.error({
        message: "Lỗi tải ảnh",
        description: "Có lỗi xảy ra khi tải ảnh lên Cloudinary.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSelectMainImage = (index) => {
    setImages((prevImages) =>
      prevImages.map((image, i) =>
        i === index ? { ...image, isMain: true } : { ...image, isMain: false }
      )
    );
  };

  const handleSubmit = async () => {
    if (!name || !code || !categoryId) {
      notification.error({
        message: "Lỗi",
        description: "Tên, mã sản phẩm và danh mục không được để trống.",
      });
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("code", code);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("material", material);
    formData.append("categoryId", categoryId);
    formData.append("subcategoryId", subcategoryId);
    formData.append("totalSold", totalSold);

    images.forEach((image, index) => {
      formData.append(`images[${index}].url`, image.url);
      formData.append(`images[${index}].isMain`, image.isMain);
    });

    try {
      const response = await BASE_URL.post("dt-store/products", formData);
      notification.success({
        message: "Thành công",
        description: "Sản phẩm đã được thêm thành công.",
      });
      navigate("/products");
    } catch (error) {
      notification.error({
        message: error.data.message || "Lỗi",
        description: "Có lỗi xảy ra khi thêm sản phẩm. Vui lòng thử lại.",
      });
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-3xl font-bold mb-6 text-center">Thêm sản phẩm mới</h1>
      <div className="space-y-4">
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

        <div>
          <label className="block font-medium">Mã sản phẩm:</label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Nhập mã sản phẩm"
          />
        </div>

        <div>
          <label className="block font-medium">Mô tả:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Nhập mô tả sản phẩm"
          />
        </div>
        <div>
          <label className="block font-medium">Giá:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Nhập giá sản phẩm"
          />
        </div>
        <div>
          <label className="block font-medium">Chất liệu:</label>
          <input
            type="text"
            value={material}
            onChange={(e) => setMaterial(e.target.value)}
            className="w-full px-4 py-2 border rounded"
            placeholder="Nhập chất liệu sản phẩm"
          />
        </div>

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
        <div>
          <label className="block font-medium">Danh mục con:</label>
          <select
            value={subcategoryId}
            onChange={(e) => setSubcategoryId(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          >
            <option value="">Chọn danh mục con</option>
            {subcategories.map((subcategory) => (
              <option key={subcategory.id} value={subcategory.id}>
                {subcategory.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium">Hình ảnh:</label>
          <Upload
            listType="picture"
            multiple
            beforeUpload={(file) => {
              handleUploadToCloudinary(file);
              return false; 
            }}
          >
            <Button icon={<UploadOutlined />}>Chọn ảnh</Button>
          </Upload>
        </div>

        {images.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold">Danh sách ảnh đã upload</h2>
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => {
             
                return (
                  <div key={index} className="relative">
                    <img
                      src={image.url} 
                      alt={`Ảnh ${index + 1}`}
                      className="w-full h-auto rounded-lg"
                    />
                    <div className="absolute top-0 right-0 bg-white px-2 py-1 rounded-l-lg shadow-md">
                      <Checkbox
                        checked={image.isMain}
                        onChange={() => handleSelectMainImage(index)}
                      >
                        Chính
                      </Checkbox>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        <div className="flex justify-end mt-4">
          <Button
            type="primary"
            onClick={handleSubmit}
            className="bg-blue-500 hover:bg-blue-600 text-white"
            disabled={loading || images.length === 0}
          >
            {loading ? <Spin /> : "Thêm sản phẩm"}
          </Button>
        </div>
      </div>
    </div>
  );
}

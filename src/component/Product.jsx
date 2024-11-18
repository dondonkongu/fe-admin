import React, { useState } from "react";
import { Link } from "react-router-dom";

export default function Product() {
  const [products, setProducts] = useState([
    {
      id: 2,
      name: "Áo sơ mi nam Classic",
      productCode: "ASM001",
      description:
        "Áo sơ mi nam chất liệu cotton thoáng mát, phong cách thanh lịch",
      price: 299000.0,
      quantity: 150,
      subcategory: {
        id: 1,
        name: "áo sơ mi",
        description: "áo sơ mi danh cho nam gioi",
      },
      material: "Cotton 100%",
      sizes: [
        {
          name: "M",
          description: "size M",
        },
        {
          name: "S",
          description: "size S",
        },
      ],
      soldQuantity: 100,
      category: {
        id: 1,
        name: "áo nam",
        description: "áo danh cho nam giới",
        subcategories: [
          {
            id: 1,
            name: "áo sơ mi",
            description: "áo sơ mi dành cho nam giới",
          },
          {
            id: 2,
            name: "áo polo",
            description: "áo polo dành cho nam giới",
          },
        ],
      },
      productImages: [
        {
          imageId: 1,
          imageUrl: "https://res.cloudinary.com/dsqnuw08w/image/upload/v1728705827/bz2qslnkthj4or6ssera.jpg",
          color: {
            name: "Đỏ",
            description: "màu đỏ",
          },
          isMain: true,
        },
        {
          imageId: 2,
          imageUrl: "ododo.uur",
          color: {
            name: "Xanh lá",
            description: "màu xanh lá",
          },
          isMain: false,
        },
      ],
      origin: "Việt Nam",
      discount: 0.15,
    },
    {
      id: 2,
      name: "Áo sơ mi nam Classic",
      productCode: "ASM001",
      description:
        "Áo sơ mi nam chất liệu cotton thoáng mát, phong cách thanh lịch",
      price: 299000.0,
      quantity: 150,
      subcategory: {
        id: 1,
        name: "áo sơ mi",
        description: "áo sơ mi danh cho nam gioi",
      },
      material: "Cotton 100%",
      sizes: [
        {
          name: "M",
          description: "size M",
        },
        {
          name: "S",
          description: "size S",
        },
      ],
      soldQuantity: 100,
      category: {
        id: 1,
        name: "áo nam",
        description: "áo danh cho nam giới",
        subcategories: [
          {
            id: 1,
            name: "áo sơ mi",
            description: "áo sơ mi dành cho nam giới",
          },
          {
            id: 2,
            name: "áo polo",
            description: "áo polo dành cho nam giới",
          },
        ],
      },
      productImages: [
        {
          imageId: 1,
          imageUrl: "https://res.cloudinary.com/dsqnuw08w/image/upload/v1728705827/bz2qslnkthj4or6ssera.jpg",
          color: {
            name: "Đỏ",
            description: "màu đỏ",
          },
          isMain: true,
        },
        {
          imageId: 2,
          imageUrl: "ododo.uur",
          color: {
            name: "Xanh lá",
            description: "màu xanh lá",
          },
          isMain: false,
        },
      ],
      origin: "Việt Nam",
      discount: 0.15,
    },
    {
      id: 2,
      name: "Áo sơ mi nam Classic",
      productCode: "ASM001",
      description:
        "Áo sơ mi nam chất liệu cotton thoáng mát, phong cách thanh lịch",
      price: 299000.0,
      quantity: 150,
      subcategory: {
        id: 1,
        name: "áo sơ mi",
        description: "áo sơ mi danh cho nam gioi",
      },
      material: "Cotton 100%",
      sizes: [
        {
          name: "M",
          description: "size M",
        },
        {
          name: "S",
          description: "size S",
        },
      ],
      soldQuantity: 100,
      category: {
        id: 1,
        name: "áo nam",
        description: "áo danh cho nam giới",
        subcategories: [
          {
            id: 1,
            name: "áo sơ mi",
            description: "áo sơ mi dành cho nam giới",
          },
          {
            id: 2,
            name: "áo polo",
            description: "áo polo dành cho nam giới",
          },
        ],
      },
      productImages: [
        {
          imageId: 1,
          imageUrl: "https://res.cloudinary.com/dsqnuw08w/image/upload/v1728705827/bz2qslnkthj4or6ssera.jpg",
          color: {
            name: "Đỏ",
            description: "màu đỏ",
          },
          isMain: true,
        },
        {
          imageId: 2,
          imageUrl: "ododo.uur",
          color: {
            name: "Xanh lá",
            description: "màu xanh lá",
          },
          isMain: false,
        },
      ],
      origin: "Việt Nam",
      discount: 0.15,
    },
    {
      id: 2,
      name: "Áo sơ mi nam Classic",
      productCode: "ASM001",
      description:
        "Áo sơ mi nam chất liệu cotton thoáng mát, phong cách thanh lịch",
      price: 299000.0,
      quantity: 150,
      subcategory: {
        id: 1,
        name: "áo sơ mi",
        description: "áo sơ mi danh cho nam gioi",
      },
      material: "Cotton 100%",
      sizes: [
        {
          name: "M",
          description: "size M",
        },
        {
          name: "S",
          description: "size S",
        },
      ],
      soldQuantity: 100,
      category: {
        id: 1,
        name: "áo nam",
        description: "áo danh cho nam giới",
        subcategories: [
          {
            id: 1,
            name: "áo sơ mi",
            description: "áo sơ mi dành cho nam giới",
          },
          {
            id: 2,
            name: "áo polo",
            description: "áo polo dành cho nam giới",
          },
        ],
      },
      productImages: [
        {
          imageId: 1,
          imageUrl: "https://res.cloudinary.com/dsqnuw08w/image/upload/v1728705827/bz2qslnkthj4or6ssera.jpg",
          color: {
            name: "Đỏ",
            description: "màu đỏ",
          },
          isMain: true,
        },
        {
          imageId: 2,
          imageUrl: "ododo.uur",
          color: {
            name: "Xanh lá",
            description: "màu xanh lá",
          },
          isMain: false,
        },
      ],
      origin: "Việt Nam",
      discount: 0.15,
    },
    {
      id: 2,
      name: "Áo sơ mi nam Classic",
      productCode: "ASM001",
      description:
        "Áo sơ mi nam chất liệu cotton thoáng mát, phong cách thanh lịch",
      price: 299000.0,
      quantity: 150,
      subcategory: {
        id: 1,
        name: "áo sơ mi",
        description: "áo sơ mi danh cho nam gioi",
      },
      material: "Cotton 100%",
      sizes: [
        {
          name: "M",
          description: "size M",
        },
        {
          name: "S",
          description: "size S",
        },
      ],
      soldQuantity: 100,
      category: {
        id: 1,
        name: "áo nam",
        description: "áo danh cho nam giới",
        subcategories: [
          {
            id: 1,
            name: "áo sơ mi",
            description: "áo sơ mi dành cho nam giới",
          },
          {
            id: 2,
            name: "áo polo",
            description: "áo polo dành cho nam giới",
          },
        ],
      },
      productImages: [
        {
          imageId: 1,
          imageUrl: "https://res.cloudinary.com/dsqnuw08w/image/upload/v1728705827/bz2qslnkthj4or6ssera.jpg",
          color: {
            name: "Đỏ",
            description: "màu đỏ",
          },
          isMain: true,
        },
        {
          imageId: 2,
          imageUrl: "ododo.uur",
          color: {
            name: "Xanh lá",
            description: "màu xanh lá",
          },
          isMain: false,
        },
      ],
      origin: "Việt Nam",
      discount: 0.15,
    },
    {
      id: 2,
      name: "Áo sơ mi nam Classic",
      productCode: "ASM001",
      description:
        "Áo sơ mi nam chất liệu cotton thoáng mát, phong cách thanh lịch",
      price: 299000.0,
      quantity: 150,
      subcategory: {
        id: 1,
        name: "áo sơ mi",
        description: "áo sơ mi danh cho nam gioi",
      },
      material: "Cotton 100%",
      sizes: [
        {
          name: "M",
          description: "size M",
        },
        {
          name: "S",
          description: "size S",
        },
      ],
      soldQuantity: 100,
      category: {
        id: 1,
        name: "áo nam",
        description: "áo danh cho nam giới",
        subcategories: [
          {
            id: 1,
            name: "áo sơ mi",
            description: "áo sơ mi dành cho nam giới",
          },
          {
            id: 2,
            name: "áo polo",
            description: "áo polo dành cho nam giới",
          },
        ],
      },
      productImages: [
        {
          imageId: 1,
          imageUrl: "https://res.cloudinary.com/dsqnuw08w/image/upload/v1728705827/bz2qslnkthj4or6ssera.jpg",
          color: {
            name: "Đỏ",
            description: "màu đỏ",
          },
          isMain: true,
        },
        {
          imageId: 2,
          imageUrl: "ododo.uur",
          color: {
            name: "Xanh lá",
            description: "màu xanh lá",
          },
          isMain: false,
        },
      ],
      origin: "Việt Nam",
      discount: 0.15,
    },
  ]);

  const handleDelete = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  return (
    <div className="p-5">
      <h1 className="text-2xl font-bold mb-4">Quản lý sản phẩm</h1>

      <Link
        to="/add-product"
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
                {product.productCode}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.productImages.find((image) => image.isMain) &&
                (
                  <img
                  src={product.productImages.find((image) => image.isMain).imageUrl}
                  alt="Main product image"
                  className="w-12 h-12 object-cover"    
                  
                  />
                  
                )
                }
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.price.toLocaleString()} VND
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.quantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {product.soldQuantity}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                {(product.discount * 100).toFixed(0)}%
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Link
                  to={`/admin/edit-product/${product.productCode}`}
                  className="text-blue-500 hover:underline mr-4"
                >
                  Sửa
                </Link>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="text-red-500 hover:underline"
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

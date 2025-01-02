import React, { useEffect, useState } from "react";
import BASE_URL from "../api";

const Order = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState(null);

  const fetchOrders = async () => {
    try {
      const response = await BASE_URL.get("/order/");
      if (response.data.code === 1000) {
        setOrders(response.data.result);
      } else {
        setError("Failed to fetch orders");
      }
    } catch (err) {
      console.error("Error fetching orders:", err);
      setError(err.message);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      const response = await BASE_URL.patch(`/order/${orderId}`, { status: newStatus });
      if (response.data.code === 1000) {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.orderId === orderId ? { ...order, status: newStatus } : order
          )
        );
        alert("Order status updated successfully!");
      } else {
        alert("Failed to update order status");
      }
    } catch (err) {
      console.error("Error updating order status:", err);
      alert("Error updating order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // Hàm để xác định màu sắc cho trạng thái
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "text-orange-500"; // Màu cam cho Pending
      case "APPROVED":
        return "text-green-500"; // Màu xanh lá cho Approved
      case "REJECTED":
        return "text-red-500"; // Màu đỏ cho Rejected
      default:
        return "text-black"; // Mặc định nếu không có trạng thái
    }
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Order Management</h1>
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead className="bg-gray-200">
              <tr>
                <th className="border border-gray-300 px-4 py-2">Order ID</th>
                <th className="border border-gray-300 px-4 py-2">User ID</th>
                <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                <th className="border border-gray-300 px-4 py-2">Shipping Address</th>
                <th className="border border-gray-300 px-4 py-2">Items</th>
                <th className="border border-gray-300 px-4 py-2">Total Price</th>
                <th className="border border-gray-300 px-4 py-2">Note</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.orderId} className="text-center odd:bg-white even:bg-gray-50">
                  <td className="border border-gray-300 px-4 py-2">{order.orderId}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.userId || "N/A"}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.phoneNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">{order.shippingAddress}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.items.map((item, index) => (
                      <div key={index}>
                        Variant ID: {item.variantId}, Quantity: {item.quantity}
                      </div>
                    ))}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.totalPrice.toLocaleString("vi-VN")} VND
                  </td>
                  <td className="border border-gray-300 px-4 py-2">{order.note || "N/A"}</td>
                  <td className={`border border-gray-300 px-4 py-2 ${getStatusColor(order.status)}`}>
                    {order.status}
                  </td>
                  <td className="border border-gray-300 px-4 py-2">
                    {order.status !== "APPROVED" && order.status !== "REJECTED" && (
                      <>
                        <button
                          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                          onClick={() => updateOrderStatus(order.orderId, "APPROVED")}
                        >
                          Approve
                        </button>
                        <button
                          className="bg-red-500 text-white px-4 py-2 rounded"
                          onClick={() => updateOrderStatus(order.orderId, "REJECTED")}
                        >
                          Reject
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Order;

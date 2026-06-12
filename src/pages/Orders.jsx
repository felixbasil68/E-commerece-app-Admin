import React, { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaTruck, FaBox, FaClipboardCheck, FaEye } from 'react-icons/fa';
import { getAllUserProductAPI, userStatusUpdateAPI } from '../services/allAPIs';

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingOrderId, setUpdatingOrderId] = useState(null); 

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const reqHeader = {
        token: token
      }
      const response = await getAllUserProductAPI(reqHeader);
      console.log(response.data);
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        alert(`Something went wrong`);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  // Update order status 
  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      setUpdatingOrderId(orderId); 
      
      const reqHeader = { token }; 
      const statusData = { orderId, status: newStatus }; 
      
      const response = await userStatusUpdateAPI(statusData, reqHeader);
      
      if (response.data.success) {
      
        setOrders(orders.map(order =>
          order._id === orderId ? { ...order, status: newStatus } : order
        ));
        alert("Order status updated successfully!");
      } else {
        alert("Failed to update order status");
      }
    } catch (error) {
      console.log(error);
      alert("Error updating order status");
    } finally {
      setUpdatingOrderId(null); 
    }
  };

  const statusOptions = ["Order Placed", "Processing", "Shipped", "Delivered", "Cancelled"];

  const getStatusColor = (status) => {
    switch (status) {
      case "Order Placed": return "bg-blue-100 text-blue-800";
      case "Processing": return "bg-yellow-100 text-yellow-800";
      case "Shipped": return "bg-purple-100 text-purple-800";
      case "Delivered": return "bg-green-100 text-green-800";
      case "Cancelled": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Order Placed": return <FaClipboardCheck />;
      case "Processing": return <FaBox />;
      case "Shipped": return <FaTruck />;
      case "Delivered": return <FaCheckCircle />;
      case "Cancelled": return <FaTimesCircle />;
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Order Management</h1>
          <p className="text-gray-600 mt-2">Manage customer orders and track their status</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Total Orders</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">{orders.length}</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Pending</p>
            <p className="text-3xl font-bold text-blue-600 mt-2">
              {orders.filter(o => o.status === "Order Placed").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Processing</p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {orders.filter(o => o.status === "Processing").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Shipped</p>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {orders.filter(o => o.status === "Shipped").length}
            </p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <p className="text-gray-500 text-sm">Delivered</p>
            <p className="text-3xl font-bold text-green-600 mt-2">
              {orders.filter(o => o.status === "Delivered").length}
            </p>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">Order #{order._id.slice(-8)}</h3>
                    <p className="text-sm text-gray-500">Placed on {new Date(order.date).toLocaleDateString()}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {getStatusIcon(order.status)}
                      {order.status}
                    </span>
                  </div>
                </div>
              </div>

              {/* Order Details */}
              <div className="p-6">
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Order Items</h4>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="font-medium text-gray-900">{order.items[0]?.title || 'Product'}</p>
                    <p className="text-sm text-gray-600 mt-1">{order.items.map(item => item.title).join(', ')}</p>
                    <div className="mt-2 text-sm text-gray-500">
                      {order.items?.map((item, index) => (
                        <div key={index}> {item.title} Qty: {item.quantity}</div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Customer Info */}
                <div className="mb-6">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Customer Information</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">Customer</p>
                      <p className="font-medium">{order.address.firstName} {order.address.lastName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Phone</p>
                      <p className="font-medium">{order.address.phone || "Not provided"}</p>
                    </div>
                    <div className="col-span-2">
                      <p className="text-xs text-gray-500">Address</p>
                      <p className="font-medium text-sm">
                        {order.address.street}, {order.address.city}, {order.address.state} - {order.address.zipCode}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div className="border-t border-gray-200 pt-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <p className="text-sm text-gray-600">Payment Method</p>
                      <p className="font-semibold">{order.paymentMethod}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Payment Status</p>
                      <p className={`font-semibold ${!order.payment ? "text-yellow-600" : "text-green-600"}`}>
                        {order.payment ? "Completed" : "Pending"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-600">Total Amount</p>
                      <p className="text-xl font-bold text-gray-900">${order.amount.toFixed(2)}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="px-4 py-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors flex items-center gap-2"
                  >
                    <FaEye />
                    View Details
                  </button>

                  <div className="flex items-center gap-3">
                    <span className="text-sm text-gray-600">Update Status:</span>
                    <select
                      value={order.status}
                      onChange={(e) => updateOrderStatus(order._id, e.target.value)}
                      disabled={updatingOrderId === order._id}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>{status}</option>
                      ))}
                    </select>
                    {updatingOrderId === order._id && (
                      <span className="text-sm text-blue-600">Updating...</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Details Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">Order Details - #{selectedOrder._id.slice(-8)}</h3>
                    <p className="text-gray-500">Placed on {new Date(selectedOrder.date).toLocaleDateString()}</p>
                  </div>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="text-gray-400 hover:text-gray-600"
                  >
                    ✕
                  </button>
                </div>

                <div className="space-y-6">
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Customer Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Name</p>
                        <p className="font-medium">{selectedOrder.address.firstName} {selectedOrder.address.lastName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Phone</p>
                        <p className="font-medium">{selectedOrder.address.phone || "Not provided"}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="text-sm text-gray-500">Address</p>
                        <p className="font-medium">
                          {selectedOrder.address.street}, {selectedOrder.address.city}, {selectedOrder.address.state} - {selectedOrder.address.zipCode}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Order Items</h4>
                    <div className="space-y-3">
                      {selectedOrder.items?.map((item, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gray-200 rounded-lg"></div>
                            <div>
                              <p className="font-medium">{item.title}</p>
                              <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                            </div>
                          </div>
                          <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <p className="text-gray-600">Subtotal</p>
                        <p className="font-medium">${selectedOrder.amount.toFixed(2)}</p>
                      </div>
                      <div className="flex justify-between">
                        <p className="text-gray-600">Shipping</p>
                        <p className="font-medium">$0.00</p>
                      </div>
                      <div className="flex justify-between border-t border-gray-200 pt-3">
                        <p className="text-lg font-semibold">Total</p>
                        <p className="text-2xl font-bold text-gray-900">${selectedOrder.amount.toFixed(2)}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">Payment Information</h4>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Payment Method</p>
                        <p className="font-medium">{selectedOrder.paymentMethod}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Payment Status</p>
                        <p className={`font-medium ${!selectedOrder.payment ? "text-yellow-600" : "text-green-600"}`}>
                          {selectedOrder.payment ? "Completed" : "Pending"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-xl hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
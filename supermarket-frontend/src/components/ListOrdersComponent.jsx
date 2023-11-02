import React, { useState, useEffect } from "react";
import OrderService from "../services/OrderService";
import {Link} from "react-router-dom";

export const ListOrdersComponent = () => {
  const [orders, setOrders] = useState([]); // initial state empty array
  const [currentPage, setCurrentPage] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(2);
  const [totalPages, setTotalPages] = useState();

  useEffect(() => {
    loadPaginatedOrders(itemsPerPage, currentPage);
  }, [itemsPerPage, currentPage]);

  const loadPaginatedOrders = async (items, page) => {
    try {
      const response = await OrderService.getPaginatedOrders(page, items);
      setTotalPages(response.data.totalPages);
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error loading paginated orders: ", error);
      alert("Error loading paginated orders: " + error.message);
    }
  };

  const handleItemsPerPageChange = (e) => {
    const newItemsPerPage = parseInt(e.target.value, 10); // Pars to int base 10
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(0); // set current page to 0 when new items per page
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container">
      <h2 className="text-center">Order List</h2>
      {/* Items per page selector */}
      <div className="form-group">
        <label htmlFor="itemsPerPage" className="label-text">
          Items per Page:
        </label>
        <select
          id="itemsPerPage"
          onChange={handleItemsPerPageChange}
          value={itemsPerPage}
        >
          <option value="2"> 2 </option>
          <option value="10"> 10 </option>
          <option value="20"> 20 </option>
          <option value="30"> 30 </option>
        </select>

        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              {/* <th>: table header cell */}
              <th> Creation date </th>
              <th> Total value </th>
              <th> Fruit list </th>
            </tr>
          </thead>
          <tbody>
            {/* map over the orders array and display each order individually */}
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.createdAt}</td>
                <td>{order.totalPrice}</td>
                <td>{order.listOfFruits}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <nav>
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 0}
          >
            Previous
          </button>
          <button
            className="btn btn-primary"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages - 1}
          >
            Next
          </button>
        </nav>
      </div>

      <div style={{ marginBottom: "10px" }}></div>

      <Link to="/new-order" className="btn btn-primary mb-2">
        Add New Order
      </Link>
    </div>
  );
};

export default ListOrdersComponent;

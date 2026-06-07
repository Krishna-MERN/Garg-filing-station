import { useEffect, useState } from "react";
import "../styles/salesReport.css";
import ProfitReport from "../components/ProfitReport";

function SalesReport() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [editId, setEditId] = useState(null);
  const [editPaid, setEditPaid] = useState("");
  const [editComment, setEditComment] = useState("");
  const [editOtpStatus, setEditOtpStatus] = useState("");
const [editDeliveryStatus, setEditDeliveryStatus] = useState("");

  const fetchSales = async () => {
    try {
      const res = await fetch(
        "https://garg-filing-station.onrender.com/api/sales"
      );

      const data = await res.json();

      setSales(data);
    } catch (err) {
      console.log("Fetch Error:", err);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  const deleteSale = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this sale?\n\nThis action cannot be undone."
    );

    if (!confirmDelete) return;

    try {
      await fetch(
        `https://garg-filing-station.onrender.com/api/sales/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchSales();
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

const startEdit = (sale) => {
  setEditId(sale._id);
  setEditPaid(sale.paidAmount);
  setEditComment(sale.comment || "");
  setEditOtpStatus(sale.otpStatus || "Not Verified");
  setEditDeliveryStatus(sale.deliveryStatus || "Not Delivered");
};

  const saveEdit = async (sale) => {
    try {
      
      const res = await fetch(
        `https://garg-filing-station.onrender.com/api/sales/${sale._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            paidAmount: Number(editPaid),
            comment: editComment,
            otpStatus: editOtpStatus,
            deliveryStatus: editDeliveryStatus,
          }),
        }
      );

      const data = await res.json();

      console.log("Update Response:", data);

      setEditId(null);
      setEditPaid("");
      setEditComment("");

      fetchSales();
    } catch (err) {
      console.log("Update Error:", err);
    }
  };

  /* SEARCH + FILTER */

  const filteredSales = sales.filter((sale) => {
    const matchSearch =
      sale.name?.toLowerCase().includes(search.toLowerCase()) ||
      sale.mobile?.includes(search) ||
      sale.passbookNo?.includes(search);

    if (filter === "unpaid") {
      return matchSearch && sale.unpaidAmount > 0;
    }

    return matchSearch;
  });

  return (
    <div className="salesPage">
      <h1>Sales Report</h1>

      <div className="topBar">
        <input
          className="search"
          placeholder="Search by Name / Mobile / Passbook"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All Sales</option>
          <option value="unpaid">Unpaid Customers</option>
        </select>
      </div>

      <div className="tableWrapper">
        <table className="salesTable">
          <thead>
            <tr>
              <th>Sr.No</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Passbook</th>
              <th>Branch</th>
              <th>OTP</th>
              <th>OTP Status</th>
              <th>In</th>
              <th>Out</th>
              <th>Delivery Status</th>
              <th>Price</th>
              <th>Paid</th>
              <th>Unpaid</th>
              <th>Method</th>
              <th>Date</th>
              <th>Comment</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {filteredSales.map((sale, i) => (
              <tr key={sale._id}>
                <td>{i + 1}</td>

                <td>{sale.name}</td>

                <td>{sale.mobile}</td>

                <td>{sale.passbookNo}</td>
                <td>{sale.branch}</td>

                <td>{sale.otp}</td>

         <td>
  {editId === sale._id ? (
    <select
      value={editOtpStatus}
      onChange={(e) => setEditOtpStatus(e.target.value)}
    >
      <option>Verified</option>
      <option>Not Verified</option>
    </select>
  ) : (
    sale.otpStatus
  )}
</td>
                
                <td>{sale.incomingCylinder}</td>

                <td>{sale.outgoingCylinder}</td>
                <td>
  {editId === sale._id ? (
    <select
      value={editDeliveryStatus}
      onChange={(e) => setEditDeliveryStatus(e.target.value)}
    >
      <option>Delivered</option>
      <option>Not Delivered</option>
    </select>
  ) : (
    sale.deliveryStatus
  )}
</td>

                <td>₹{sale.price}</td>

                <td>
                  {editId === sale._id ? (
                    <input
                      type="number"
                      value={editPaid}
                      onChange={(e) => setEditPaid(e.target.value)}
                      style={{ width: "90px" }}
                    />
                  ) : (
                    `₹${sale.paidAmount}`
                  )}
                </td>

                <td className="unpaid">
                  ₹
                  {editId === sale._id
                    ? Number(sale.price) - Number(editPaid || 0)
                    : sale.unpaidAmount}
                </td>

                <td>{sale.paymentType}</td>

                <td>
                  {sale.date
                    ? new Date(sale.date).toLocaleDateString()
                    : ""}
                </td>

                <td>
                  {editId === sale._id ? (
                    <input
                      type="text"
                      value={editComment}
                      onChange={(e) => setEditComment(e.target.value)}
                      placeholder="Enter comment"
                      style={{ width: "150px" }}
                    />
                  ) : (
                    sale.comment || "-"
                  )}
                </td>

                <td>
                  {editId === sale._id ? (
                    <button
                      className="save"
                      onClick={() => saveEdit(sale)}
                    >
                      Save
                    </button>
                  ) : (
                    <button
                      className="edit"
                      onClick={() => startEdit(sale)}
                    >
                      Edit
                    </button>
                  )}

                  <button
                    className="delete"
                    onClick={() => deleteSale(sale._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ProfitReport />
    </div>
  );
}

export default SalesReport;
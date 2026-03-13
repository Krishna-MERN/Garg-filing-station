import { useEffect, useState } from "react";
import "../styles/salesReport.css";
import ProfitReport from "../components/ProfitReport";

function SalesReport() {
  const [sales, setSales] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  const [editId, setEditId] = useState(null);
  const [editPaid, setEditPaid] = useState("");

  const fetchSales = async () => {
    const res = await fetch("https://garg-filing-station.onrender.com/api/sales");
    const data = await res.json();

    setSales(data);
  };

  useEffect(() => {
    fetchSales();
  }, []);

const deleteSale = async(id)=>{

const confirmDelete = window.confirm(
"Delete this sale?\n\nThis action cannot be undone."
)

if(!confirmDelete) return

await fetch(`https://garg-filing-station.onrender.com/api/sales/${id}`,{
method:"DELETE"
})

fetchSales()

}

  const startEdit = (sale) => {
    setEditId(sale._id);
    setEditPaid(sale.paidAmount);
  };

  const saveEdit = async (sale) => {
    const res = await fetch(`https://garg-filing-station.onrender.com/api/sales/${sale._id}`, {
      method: "PUT",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        paidAmount: Number(editPaid),
      }),
    });

    const data = await res.json();

    console.log("update response:", data);

    setEditId(null);

    fetchSales();
  };

  /* SEARCH + FILTER */

  const filteredSales = sales.filter((sale) => {
    const matchSearch =
      sale.name.toLowerCase().includes(search.toLowerCase()) ||
      sale.mobile.includes(search) ||
      sale.passbookNo.includes(search);

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
          placeholder="Search name / mobile / passbook"
          onChange={(e) => setSearch(e.target.value)}
        />

        <select className="filter" onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Sales</option>
          <option value="unpaid">Unpaid Customers</option>
        </select>
      </div>

      <table className="salesTable">
        <thead>
          <tr>
            <th>Sr.No</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Passbook</th>
            <th>Incoming</th>
            <th>Outgoing</th>
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
          {filteredSales.map((sale,i) => (
            <tr key={sale._id}>
              <td>{i+1}</td>

              <td>{sale.name}</td>

              <td>{sale.mobile}</td>

              <td>{sale.passbookNo}</td>

              <td>{sale.incomingCylinder}</td>

              <td>{sale.outgoingCylinder}</td>

              <td>₹{sale.price}</td>

              <td>
                {editId === sale._id ? (
                  <input
                    type="number"
                    value={editPaid}
                    onChange={(e) => setEditPaid(e.target.value)}
                  />
                ) : (
                  `₹${sale.paidAmount}`
                )}
              </td>

              <td className="unpaid">
                ₹
                {editId === sale._id
                  ? sale.price - editPaid
                  : sale.unpaidAmount}
              </td>

              <td>{sale.paymentType}</td>
              <td>{new Date(sale.date).toLocaleDateString()}</td>
              <td>{sale.comment}</td>

              <td>
                {editId === sale._id ? (
                  <button className="save" onClick={() => saveEdit(sale)}>
                    Save
                  </button>
                ) : (
                  <button className="edit" onClick={() => startEdit(sale)}>
                    Edit
                  </button>
                )}

                <button className="delete" onClick={() => deleteSale(sale._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ProfitReport/>
    </div>
  );
}

export default SalesReport;

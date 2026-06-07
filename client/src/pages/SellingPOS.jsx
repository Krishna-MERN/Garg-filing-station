
import { useEffect, useState } from "react";
import "../styles/sellingPOS.css";

function SellingPOS() {
  const [stock, setStock] = useState(null);

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    passbookNo: "",
    branch: "Baldirai",
    otp: "",
    otpStatus: "Not Verified",
    incomingCylinder: "HP",
    outgoingCylinder: "HP",
    deliveryStatus: "Not Delivered",
    paidAmount: "",
    paymentType: "Cash",
    comment: "",
  });

  const [unpaid, setUnpaid] = useState(0);
  const [bill, setBill] = useState(null);

  useEffect(() => {
    fetch("https://garg-filing-station.onrender.com/api/cylinders")
      .then((res) => res.json())
      .then((data) => setStock(data))
      .catch((err) => console.log(err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (!stock) return;

    const price = stock[form.outgoingCylinder]?.price || 0;
    const paid = Number(form.paidAmount || 0);

    setUnpaid(price - paid);
  }, [form.paidAmount, form.outgoingCylinder, stock]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const confirmSale = window.confirm(
      `Confirm Sale?

Customer: ${form.name || "N/A"}
Branch: ${form.branch}

Outgoing Cylinder: ${form.outgoingCylinder}
Incoming Cylinder: ${form.incomingCylinder}

OTP Status: ${form.otpStatus}
Delivery Status: ${form.deliveryStatus}

Paid Amount: ₹${form.paidAmount || 0}
Unpaid Amount: ₹${unpaid}`
    );

    if (!confirmSale) return;

    try {
      const res = await fetch(
        "https://garg-filing-station.onrender.com/api/sales/sell",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name,
            mobile: form.mobile,
            passbookNo: form.passbookNo,
            branch: form.branch,
            otp: form.otp,
            otpStatus: form.otpStatus,
            incomingCylinder: form.incomingCylinder,
            outgoingCylinder: form.outgoingCylinder,
            deliveryStatus: form.deliveryStatus,
            paidAmount: Number(form.paidAmount),
            paymentType: form.paymentType,
            comment: form.comment,
          }),
        }
      );

      const data = await res.json();

      console.log("FULL RESPONSE:", data);

      if (!data.success) {
        alert(data.message);
        return;
      }

      setBill(data.sale);

      setForm({
        name: "",
        mobile: "",
        passbookNo: "",
        branch: "Baldirai",
        otp: "",
        otpStatus: "Not Verified",
        incomingCylinder: "HP",
        outgoingCylinder: "HP",
        deliveryStatus: "Not Delivered",
        paidAmount: "",
        paymentType: "Cash",
        comment: "",
      });
    } catch (err) {
      console.log("SALE ERROR:", err);
      alert("Failed to create sale");
    }
  };

  return (
    <div className="pos">
      <h1>Gas Distribution POS</h1>

      <div className="pos-layout">
        <form className="pos-form" onSubmit={handleSubmit}>
          <input
            name="name"
            value={form.name}
            placeholder="Customer Name"
            onChange={handleChange}
          />

          <input
            name="mobile"
            value={form.mobile}
            placeholder="Mobile Number"
            onChange={handleChange}
          />

          <input
            name="passbookNo"
            value={form.passbookNo}
            placeholder="Passbook No"
            onChange={handleChange}
          />

          <label>Branch</label>
          <select
            name="branch"
            value={form.branch}
            onChange={handleChange}
          >
            <option value="Baldirai">Baldirai</option>
            <option value="Dehli">Dehli</option>
          </select>

          <input
            name="otp"
            value={form.otp}
            placeholder="OTP"
            onChange={handleChange}
          />

          <label>OTP Status</label>
          <select
            name="otpStatus"
            value={form.otpStatus}
            onChange={handleChange}
          >
            <option value="Verified">Verified</option>
            <option value="Not Verified">Not Verified</option>
          </select>

          <label>Incoming Cylinder</label>
          <select
            name="incomingCylinder"
            value={form.incomingCylinder}
            onChange={handleChange}
          >
            <option value="HP">HP</option>
            <option value="Indane">Indane</option>
            <option value="Bharat">Bharat</option>
            <option value="None">None</option>
          </select>

          <label>Outgoing Cylinder</label>
          <select
            name="outgoingCylinder"
            value={form.outgoingCylinder}
            onChange={handleChange}
          >
            <option value="HP">HP</option>
            <option value="Indane">Indane</option>
            <option value="Bharat">Bharat</option>
          </select>

          <label>Delivery Status</label>
          <select
            name="deliveryStatus"
            value={form.deliveryStatus}
            onChange={handleChange}
          >
            <option value="Delivered">Delivered</option>
            <option value="Not Delivered">Not Delivered</option>
          </select>

          <input
            name="paidAmount"
            value={form.paidAmount}
            type="number"
            placeholder="Paid Amount"
            onChange={handleChange}
          />

          <div className="unpaidBox">
            <span>Unpaid Amount</span>
            <strong>₹ {unpaid}</strong>
          </div>

          <select
            name="paymentType"
            value={form.paymentType}
            onChange={handleChange}
          >
            <option value="Cash">Cash</option>
            <option value="Online">Online</option>
          </select>

          <textarea
            name="comment"
            value={form.comment}
            placeholder="Comment"
            onChange={handleChange}
          />

          <button type="submit">Sale</button>
        </form>

        {bill && (
          <div className="bill">
            <h2>Sale Bill</h2>

            <p>Name: {bill.name}</p>
            <p>Mobile: {bill.mobile}</p>
            <p>Passbook: {bill.passbookNo}</p>

            <p>Branch: {bill.branch || "-"}</p>
            <p>OTP: {bill.otp}</p>
            <p>OTP Status: {bill.otpStatus || "-"}</p>

            <p>Incoming Cylinder: {bill.incomingCylinder}</p>
            <p>Outgoing Cylinder: {bill.outgoingCylinder}</p>

            <p>Delivery Status: {bill.deliveryStatus || "-"}</p>

            <p>Price: ₹{bill.price}</p>
            <p>Paid: ₹{bill.paidAmount}</p>

            <p style={{ color: "red" }}>
              Unpaid: ₹{bill.unpaidAmount}
            </p>

            <p>Payment: {bill.paymentType}</p>

            <p>Comment: {bill.comment}</p>

            <p>
              Date:{" "}
              {bill.date
                ? new Date(bill.date).toLocaleString()
                : ""}
            </p>

            <button onClick={() => window.print()}>
              Print Bill
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellingPOS;

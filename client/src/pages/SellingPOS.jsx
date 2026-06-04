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
      .then((data) => setStock(data));
  }, []);

  // const handleChange = (e) => {
  //   setForm({ ...form, [e.target.name]: e.target.value });
  // };


  const handleChange = (e) => {
  const { name, value } = e.target;

  setForm((prev) => ({
    ...prev,
    [name]: value,
  }));
};


  /* AUTO CALCULATE UNPAID */

  useEffect(() => {
    if (!stock) return;

    const price = stock[form.outgoingCylinder].price;

    const paid = Number(form.paidAmount || 0);

    setUnpaid(price - paid);
  }, [form.paidAmount, form.outgoingCylinder, stock]);

 const handleSubmit = async (e) => {
  e.preventDefault();

  const confirmSale = window.confirm(
    `Confirm Sale?

Customer: ${form.name || "N/A"}
Outgoing Cylinder: ${form.outgoingCylinder}
Incoming Cylinder: ${form.incomingCylinder}

Paid Amount: ₹${form.paidAmount || 0}
Unpaid Amount: ₹${unpaid}`
  );

  if (!confirmSale) return;
 //alert(JSON.stringify(form, null, 2)); // to check frontend working or not



  const res = await fetch("https://garg-filing-station.onrender.com/api/sales/sell", {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify({
      ...form,
      paidAmount: Number(form.paidAmount),
    }),



  });


  const data = await res.json();

  console.log("FULL RESPONSE", data); // test

  if (!data.success) {
    alert(data.message);
    return;
  }

  setBill(data.sale);
};

  return (
    <div className="pos">
      <h1>Gas Distribution POS</h1>

      <div className="pos-layout">
        {/* FORM */}

        <form className="pos-form" onSubmit={handleSubmit}>
          <input
            name="name"
            placeholder="Customer Name"
            onChange={handleChange}
          />

          <input
            name="mobile"
            placeholder="Mobile Number"
            onChange={handleChange}
          />

          <input
            name="passbookNo"
            placeholder="Passbook No"
            onChange={handleChange}
          />
<select
  name="branch"
  value={form.branch}
  onChange={handleChange}
>
  <option value="Baldirai">Baldirai</option>
  <option value="Delhi">Delhi</option>
</select>

          <input name="otp" placeholder="OTP" onChange={handleChange} />

<select
  name="otpStatus"
  value={form.otpStatus}
  onChange={handleChange}
>
  <option value="Verified">Verified</option>
  <option value="Not Verified">Not Verified</option>
</select>
          <label>Incoming Cylinder</label>

          <select name="incomingCylinder" onChange={handleChange}>
            <option>HP</option>
            <option>Indane</option>
            <option>Bharat</option>
            <option>None</option>
          </select>

          <label>Outgoing Cylinder</label>

          <select name="outgoingCylinder" onChange={handleChange}>
            <option>HP</option>
            <option>Indane</option>
            <option>Bharat</option>
          </select>


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
            type="number"
            placeholder="Paid Amount"
            onChange={handleChange}
          />

          <div className="unpaidBox">
            <span>Unpaid Amount</span>

            <strong>₹ {unpaid}</strong>
          </div>

          <select name="paymentType" onChange={handleChange}>
            <option>Cash</option>
            <option>Online</option>
          </select>

          <textarea
            name="comment"
            placeholder="Comment"
            onChange={handleChange}
          />

          <button>Sale</button>
        </form>

        {/* BILL */}

        {bill && (
          <div className="bill">
            <h2>Sale Bill</h2>

            <p>Name: {bill.name}</p>

            <p>Mobile: {bill.mobile}</p>

            <p>Branch: {bill.branch}</p>

            <p>Incoming Cylinder: {bill.incomingCylinder}</p>
            
            <p>Outgoing Cylinder: {bill.outgoingCylinder}</p>

            <p>Delivery Status: {bill.deliveryStatus}</p>

            <p>Price: ₹{bill.price}</p>

            <p>Paid: ₹{bill.paidAmount}</p>

            <p style={{ color: "red" }}>Unpaid: ₹{bill.unpaidAmount}</p>

            <p>Payment: {bill.paymentType}</p>

            <p>Date: {new Date(bill.date).toLocaleString()}</p>

            <button onClick={() => window.print()}>Print Bill</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default SellingPOS;

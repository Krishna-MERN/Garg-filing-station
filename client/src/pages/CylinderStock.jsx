import { useEffect, useState } from "react";
import StockDisplay from "../components/StockDisplay";
import "../styles/cylinder.css";
import PriceSettings from "../components/PriceSettings";

function CylinderStock() {

  const [stock, setStock] = useState(null);

  const [form, setForm] = useState({
    brand: "HP",
    type: "filled",
    quantity: ""
  });

  const fetchStock = async () => {
    const res = await fetch("http://localhost:5000/api/cylinders");
    const data = await res.json();
    setStock(data);
  };

  useEffect(() => {
    fetchStock();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const updateStock = async (e) => {
    e.preventDefault();

    const updated = { ...stock };

    updated[form.brand][form.type] =
      Number(updated[form.brand][form.type]) +
      Number(form.quantity);

    await fetch("http://localhost:5000/api/cylinders/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updated)
    });

    fetchStock();
  };

  return (
    <div className="dashboard">

      <h1>Cylinder Stock Dashboard</h1>

      <StockDisplay stock={stock} />

      <form className="update-form" onSubmit={updateStock}>

        <h2>Update Cylinder Stock</h2>

        <select name="brand" onChange={handleChange}>
          <option value="HP">HP</option>
          <option value="Indane">Indane</option>
          <option value="Bharat">Bharat</option>
        </select>

        <select name="type" onChange={handleChange}>
          <option value="filled">Filled</option>
          <option value="empty">Empty</option>
        </select>

        <input
          type="number"
          name="quantity"
          placeholder="Quantity"
          onChange={handleChange}
        />

        <button type="submit">
          Update Stock
        </button>

      </form>
      <PriceSettings/>

    </div>
  );
}

export default CylinderStock;
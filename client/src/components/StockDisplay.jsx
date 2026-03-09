function StockDisplay({ stock }) {

  if (!stock) return <p>Loading stock...</p>;

  const brands = ["HP", "Indane", "Bharat"];

  return (
    <div className="stock-grid">

      {brands.map((brand) => (
        <div className="stock-card" key={brand}>

          <h3>{brand}</h3>

          <div className="stock-row">
            <span>Filled</span>
            <span className="filled">
              {stock[brand]?.filled || 0}
            </span>
          </div>

          <div className="stock-row">
            <span>Empty</span>
            <span className="empty">
              {stock[brand]?.empty || 0}
            </span>
          </div>

        </div>
      ))}

    </div>
  );
}

export default StockDisplay;
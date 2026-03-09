import { useNavigate } from "react-router-dom";
import "../styles/home.css";

function Home(){

const navigate = useNavigate();

return(

<div className="home">

<h1 className="home-title">
Garg Filing Station Management
</h1>

<p className="home-sub">
Control your cylinder business easily
</p>

<div className="home-grid">

<button className="home-card"
onClick={()=>navigate("/stock")}>
<h2>📦 Manage Stock</h2>
<p>Update filled and empty cylinders</p>
</button>

<button className="home-card"
onClick={()=>navigate("/selling")}>
<h2>💰 Selling POS</h2>
<p>Sell cylinders and update stock</p>
</button>

<button className="home-card"
onClick={()=>navigate("/profit")}>
<h2>📊 Profit Report</h2>
<p>View daily and monthly profit</p>
</button>

</div>

</div>

)

}

export default Home
import { useEffect, useState } from "react"
import "../styles/profitReport.css"

function ProfitReport(){

const [data,setData] = useState(null)

const [from,setFrom] = useState("")
const [to,setTo] = useState("")

const fetchReport = async()=>{

let url = "http://localhost:5000/api/sales/report"

if(from && to){

url += `?from=${from}&to=${to}`

}

const res = await fetch(url)

const result = await res.json()

setData(result)

}

useEffect(()=>{
fetchReport()
},[])

return(

<div className="profitPage">

<h1>Sales Summary</h1>

<div className="filterBar">

<input
type="date"
onChange={(e)=>setFrom(e.target.value)}
/>

<input
type="date"
onChange={(e)=>setTo(e.target.value)}
/>

<button onClick={fetchReport}>
Filter
</button>

</div>


{data && (

<div className="stats">

<div className="card">
<h3>Total Cylinder Cost</h3>
<p>₹{data.totalCost}</p>
</div>

<div className="card">
<h3>Total Paid Amount</h3>
<p className="paid">₹{data.totalPaid}</p>
</div>

<div className="card">
<h3>Total Unpaid Amount</h3>
<p className="unpaid">₹{data.totalUnpaid}</p>
</div>

</div>

)}

</div>

)

}

export default ProfitReport
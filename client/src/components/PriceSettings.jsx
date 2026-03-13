import { useEffect, useState } from "react"
import "../styles/priceSettings.css"

function PriceSettings(){

const [stock,setStock] = useState(null)

useEffect(()=>{

fetch("https://garg-filing-station.onrender.com/api/cylinders")
.then(res=>res.json())
.then(data=>setStock(data))

},[])


const updatePrice = async(brand)=>{

await fetch("https://garg-filing-station.onrender.com/api/cylinders/price",{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({
brand,
price:stock[brand].price,
cost:stock[brand].cost
})

})

alert("Price Updated")

}


const handleChange = (brand,field,value)=>{

setStock({
...stock,
[brand]:{
...stock[brand],
[field]:value
}
})

}


if(!stock) return <p>Loading...</p>


return(

<div className="pricePage">


{["HP","Indane","Bharat"].map((brand)=>(

<div key={brand} className="priceCard">

<h2>{brand}</h2>

<label>Selling Price</label>

<input
type="number"
value={stock[brand].price}
onChange={(e)=>handleChange(brand,"price",e.target.value)}
/>


<label>Cost Price</label>

<input
type="number"
value={stock[brand].cost}
onChange={(e)=>handleChange(brand,"cost",e.target.value)}
/>

<button onClick={()=>updatePrice(brand)}>
Update
</button>

</div>

))}

</div>

)

}

export default PriceSettings
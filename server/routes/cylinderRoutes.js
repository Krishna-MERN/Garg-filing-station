const express = require("express")
const router = express.Router()

const Cylinder = require("../models/Cylinder")

router.get("/", async(req,res)=>{

let stock = await Cylinder.findOne()

if(!stock){

stock = new Cylinder({
HP:{filled:0, empty:0},
Indane:{filled:0, empty:0},
Bharat:{filled:0, empty:0}
})

await stock.save()

}

res.json(stock)

})

router.post("/update", async(req,res)=>{

let stock = await Cylinder.findOne()

stock.HP = req.body.HP
stock.Indane = req.body.Indane
stock.Bharat = req.body.Bharat

await stock.save()

res.json({message:"Stock Updated"})

})


router.put("/price", async(req,res)=>{

try{

const {brand, price, cost} = req.body

let stock = await Cylinder.findOne()

if(!stock){
return res.status(404).json({message:"Stock not found"})
}

stock[brand].price = Number(price)
stock[brand].cost = Number(cost)

await stock.save()

res.json({
message:"Price Updated",
stock
})

}
catch(err){

res.status(500).json(err)

}

})


module.exports = router
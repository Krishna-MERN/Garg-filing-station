const mongoose = require("mongoose")

const cylinderSchema = new mongoose.Schema({

HP:{
filled:{type:Number, default:0},
empty:{type:Number, default:0},
price:{type:Number, default:1020},
cost:{type:Number, default:1020}
},

Indane:{
filled:{type:Number, default:0},
empty:{type:Number, default:0},
price:{type:Number, default:1050},
cost:{type:Number, default:1020}
},

Bharat:{
filled:{type:Number, default:0},
empty:{type:Number, default:0},
price:{type:Number, default:1040},
cost:{type:Number, default:1020}
}

})

module.exports = mongoose.model("Cylinder", cylinderSchema)
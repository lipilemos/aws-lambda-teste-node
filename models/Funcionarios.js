const mongoose = require("mongoose");
const {Schema} = mongoose;

const funcionarioSchema = new Schema(
    {
        name:String,        
        cargo:String,
        idade:String
    },
    {
        timestamps:true
    }
)

const Funcionarios = mongoose.model("Funcionarios", funcionarioSchema);

module.exports = Funcionarios;
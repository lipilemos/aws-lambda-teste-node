'use strict';

require("./config/db.js");
const Funcionarios = require("../models/Funcionarios")
const mongoose = require("mongoose")
const Promise = require('bluebird');
mongoose.Promise = Promise;

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;

const mongoString = `mongodb+srv://${user}:${pass}@clustertramposfloripa.4hhozte.mongodb.net/Funcionarios?retryWrites=true&w=majority`;

//get all funcionarios
const getAllFunc = async () => {
    try {        
        const func = await dbConnectAndExecute(mongoString, async () => (Funcionarios.find({}).sort([["createdAt", -1]]))); 

        return { statusCode: 200, body: JSON.stringify(func) }
    } catch (error) {
        console.log(error)
        return { statusCode: 404, body: JSON.stringify({ errors: ["Funcionarios nao encontrados"] }) }
    }
}
//insert new funcionario
const createFunc = async (req) => {
    //const { name, cargo, idade } = req.body
    try {
        console.log(JSON.parse(req.body))
        const { name, cargo, idade } = JSON.parse(req.body)
        console.log(name)
        const func = await Funcionarios.findOne({ name }).sort([["createdAt", -1]]).exec()
        if (func)
            return { statusCode: 402, body: JSON.stringify({ errors: ["Já existe um funcionario com esse nome"] }) }

        //create a Funcionario
        const newFunc = await Funcionarios.create({
            name,
            cargo,
            idade
        })
        //if sucess
        if (!newFunc)
            return { statusCode: 422, body: JSON.stringify({ errors: ["Erro ao criar Funcionario"] }) }

        return { statusCode: 200, body: JSON.stringify(newFunc) }
    } catch (error) {
        console.log(error)
        return { statusCode: 404, body: JSON.stringify({ errors: ["Erro ao criar Funcionario"] }) }
    }

}

//delete a func by ID
const deleteFunc = async (id) => {
    try {
        const func = await Funcionarios.findById(new mongoose.Types.ObjectId(id))

        if (!func)
            return { statusCode: 422, body: JSON.stringify({ errors: ["Erro ao deletar Funcionario"] }) }

        await Funcionarios.findByIdAndDelete(func._id)

        return { statusCode: 200, body: JSON.stringify({ id: func._id, message: "Funcionario excluído com sucesso" }) }

    } catch (error) {
        console.log(error)
        return { statusCode: 404, body: JSON.stringify({ errors: ["Funcionario nao encontrado"] }) }
    }
}
//get plans by id
const getFuncById = async (id) => {
    try {
        const func = await Funcionarios.findById(new mongoose.Types.ObjectId(id))

        if (!func)
            return { statusCode: 404, body: JSON.stringify({ errors: ["Funcionario nao encontrado"] }) }

        return {
            statusCode: 200,
            body: JSON.stringify(func)
        }
    } catch (error) {
        console.log(error)
        return { statusCode: 404, body: JSON.stringify({ errors: ["Erro ao buscar Funcionario"] }) }
    }
}
//update a funcionario
const updateFunc = async (id, data) => {
    try {
        const { name, cargo, idade } = data.body

        const func = await Funcionarios.findById(id)
        if (!func)
            return { statusCode: 404, body: JSON.stringify({ errors: ["Funcionario nao encontrado"] }) }
        if (name)
            func.name = name
        if (cargo)
            func.cargo = cargo
        if (idade)
            func.idade = idade

        await func.save()

        return {
            statusCode: 200,
            body: JSON.stringify({ func, message: "Funcionario atualizado com sucesso!" })
        }
    } catch (error) {
        console.log(error)
        return { statusCode: 404, body: JSON.stringify({ errors: ["Erro ao atualizar Funcionario"] }) }
    }
}
module.exports = {
    createFunc, deleteFunc, getAllFunc, getFuncById, updateFunc
}
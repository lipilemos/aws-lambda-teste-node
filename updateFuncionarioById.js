'use strict';
const Funcionarios = require("./models/Funcionarios")
const mongoose = require("mongoose")
const Promise = require('bluebird');
mongoose.Promise = Promise;

const user = process.env.MONGO_USER;
const pass = process.env.MONGO_PASS;

const mongoString = `mongodb+srv://${user}:${pass}@clustertramposfloripa.4hhozte.mongodb.net/Funcionarios?retryWrites=true&w=majority`;

const dbExecute = (db, fn) => db.then(fn);

const dbConnectAndExecute = async (dbUrl, fn) => {
    return dbExecute(mongoose.connect(dbUrl), fn);
}

module.exports.handler = async (event, context, callback) => {
    const { name, idade, cargo } = JSON.parse(event.body)
    const { id } = event.pathParameters
    try {
        const func = await dbConnectAndExecute(mongoString, async () => (Funcionarios.findById(new mongoose.Types.ObjectId(id)).select()));

        if (name)
            func.name = name

        if (cargo)
            func.cargo = cargo

        if (idade)
            func.idade = idade

        await func.save()

        return {
            statusCode: 200,
            body: JSON.stringify({ func, message: "FUNCIONARIO ATUALIZADO COM SUCESSO" })
        };
    }
    catch (e) {
        console.log(e)
        return {
            statusCode: 404,
            body: JSON.stringify({ erros: ["ERRO AO ATUALIZAR FUNCIONARIO"] })
        };
    }
}
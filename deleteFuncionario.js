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
  return dbExecute(mongoose.connect(dbUrl),fn);}

module.exports.handler = async (event, context, callback) => {
    const { id } = event.pathParameters
    try{
      const func = await dbConnectAndExecute(mongoString, async () => (Funcionarios.findByIdAndDelete(id)));   
      if (!func)
        return {
          statusCode: 404,
          body: JSON.stringify({ erros: ["FUNCIONARIO NAO ENCONTRADO"] })
        };
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({func, message: "FUNCIONARIO DELETADO COM SUCESSO"})
      };
    }
    catch (e) {
      return {
        statusCode: 404,
        body: JSON.stringify({ erros: ["ERRO AO DELETAR FUNCIONARIO"] })
      };
    }  
  };
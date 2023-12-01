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
  return dbExecute(mongoose.connect(dbUrl),fn);
}

module.exports.handler = async (event, context) => {
    try {
      const func = await dbConnectAndExecute(mongoString, async () => (Funcionarios.find({}).sort([["createdAt", -1]]))); 
       
      if (!func)
        return {
          statusCode: 404,
          body: JSON.stringify({ erros: ["Funcionarios não encontrados"] })
        };
      return {
        statusCode: 200,
        headers: {
          "Content-Type": "application/json",
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify(func)
      };
    }
    catch (e) {
      console.log(e)
      return {
        statusCode: 404,
        body: JSON.stringify({ erros: ["Funcionarios não encontrados"] })
      };
    }
  };  
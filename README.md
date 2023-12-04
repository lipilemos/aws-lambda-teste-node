# aws-lambda-teste-node
teste em nodejs e aws lambda
este projeto se encontra online. endpoints na descrição.

para iniciar crie um clone e instale as dependencias com o comando: ```npm install ```
esse projeto foi desenvolvido com o framework serverless, portanto precisa estar instalado na maquina ```npm install -g serverless```
depois de tudo pronto só rodar o comando: ```serverless deploy``` para fazer o deploy automatico das funções lambda na aws 

em anexo do projeto esta a pasta 'TESTES' com a collection da API no POSTMAN

o banco de dados usado para esse teste foi ```MongoDB```

# endpoints:
  ## GET - https://q6z05iv90g.execute-api.us-east-1.amazonaws.com/dev/
  ## GET - https://q6z05iv90g.execute-api.us-east-1.amazonaws.com/dev/funcionarios
  ## POST - https://q6z05iv90g.execute-api.us-east-1.amazonaws.com/dev/funcionarios
  ## GET - https://q6z05iv90g.execute-api.us-east-1.amazonaws.com/dev/funcionarios/{id}
  ## DELETE - https://q6z05iv90g.execute-api.us-east-1.amazonaws.com/dev/funcionarios/{id}
  ## PUT - https://q6z05iv90g.execute-api.us-east-1.amazonaws.com/dev/funcionarios/{id}
# functions:
  ## - test: project-dev-test 
  ## - getAllFuncionarios: project-dev-getAllFunc 
  ## - createFuncionario: project-dev-createFunc 
  ## - getFuncionarioById: project-dev-getFuncById
  ## - deleteFuncionario: project-dev-deleteFunc
  ## - updateFuncionario: project-dev-updateFunc

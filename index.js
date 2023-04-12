const express = require("express");
// config do app
const app = express();
app.use(express.json()); 
// rotas
app.get("/alunos", (res, req) => {
    
})









// escuta das requisições
app.listen(3000, () => {
    console.log("Servidos rodando em http://localhost:3000/");
});
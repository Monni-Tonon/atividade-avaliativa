const express = require("express");
const jsonfile = require('jsonfile');// chamando o pacote jsonfile instalado
const ALUNOS_DB_PATH = './db.json';  // const para deleção de dado
const morgan = require("morgan");   // morgan line
const alunos = require("./alunos");

// config do app
const app = express();

app.use(express.json()); 
app.use(morgan('dev'));         // morgan line

// Crie uma rota GET para “/alunos” que lista todos os alunos. Deve conter query opcional para filtrar por nome e por média. Ou seja, a rota pode ter este formato: “/alunos?nome=pedro”, “/alunos?media=7.5” ou esse “/alunos”. Esta rota deve utilizar as funções exportadas pelo módulo alunos.js;
app.get("/alunos", (req, res) => {
    let name = req.query.name
    let media = req.query.media
    console.log(name, media)
    if(name) {
        if(media) {
            let list = alunos.listAlunos(name, media);
            res.json(list); 
        }
    } else{
        let list = alunos.listAlunos()
        res.json(list); 
    }
});

// Crie uma rota POST para “/alunos/novo” e o corpo da requisição deve conter (nome, matrícula e média). Valide os campos passados e caso contrário indique um erro (400)
app.post("/alunos/new", (req, res) => {
    const {matric, name, media} = req.body;
    //checagem
    if(!matric || !name || !media) {
        return res.status(400).send("Não encontrado.");
    } 
    console.log(name, media, matric)
    //add aluno
    alunos.addAlunos(matric, name, media)

// escrevendo no arquivo JSON
jsonfile.writeFile('./db.json', alunos, (err) => {
    if (err) console.error(err);
    console.log('Dados gravados com sucesso em db.json!');
  });

    return res.status(200).send("Aluno adicionado.");
});

//Crie uma rota POST para “/alunos/deletar/:index” que indica qual aluno remover do array de dados (index). Trate a chamada se o aluno não existir (404);
app.delete("/alunos/:matric", (req, res) => {
    const matric = req.params.matric;
    
    alunos.delAlunos(matric)

// Escreve o array de alunos no arquivo db.json
jsonfile.writeFile(ALUNOS_DB_PATH, alunos.delAlunos(), (err) => {
    if (err) {
        console.error(err);
        return res.status(500).send("Erro ao escrever no arquivo db.json.");
    }

    return res.status(200).send("Aluno deletado.");
});
});

//Crie uma rota POST para /alunos/atualizar/:index, que no corpo da requisição recebe um objeto (nome, média) e atualiza os dados do aluno naquela posição. Trate a chamada se o aluno não existir (404);
app.put("/alunos/:matric", (req, res) => {
    const {name, media} = req.body; // enviando param para alteracao
    const matric = req.params.matric;
    //console.log(name, media, matric)
    // verificacao de informacao
    if(!matric || !name || !media) {
        return res.status(400).send("Não encontrado.");
    } 
    //altera aluno
    alunos.updateAlunos(matric, name, media);

    // escrever arquivo JSON
  jsonfile.writeFileSync('./db.json', alunos.updateAlunos());
  return res.status(200).send("Aluno atualizado.");
});


app.get("/alunos/:name", (req, res) => {
    const list = alunos.listAlunos();    
    res.json(list); 
});

// escuta das requisições
app.listen(3000, () => {
    console.log("Servidos rodando em http://localhost:3000/");
});



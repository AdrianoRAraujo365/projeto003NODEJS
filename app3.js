let express = require('express')
let app = express()
app.set('view engine', 'ejs')
let bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({extended:true}))

let mysql = require('mysql2')
let connection = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password: 'senac',
    database:'qikbyte',
    port:3307

})

app.get('/curso', function(req,res){
    connection.query('select * from curso;',function(error, resultado){
        res.render('./cursos1',{dados : resultado})
    })    
});

app.post('/cursos/salvar', function(req,res){
    let dados = req.body  
    connection.query('insert into curso SET ?',dados,function(error,resultado){
        res.redirect('/curso')
    })
})

app.get('/editar/:id', function(req,res){
    connection.query('select * from curso where id =' + req.params.id,function(errpr, linha){
        res.render('editar',{
            id: linha[0].ID,
            descricao: linha[0].DESCRICAO,
            carga_horaria: linha[0].CARGA_HORARIA,
        })
    })
})

app.post('/atualizar/:id', function(req,res){
    let dados = req.body
    connection.query('update curso set ? where id =' + req.params.id,dados, function(error, resultado){
        res.redirect("/curso")
    })
})

app.get('/curso/deletar/:id',function(req,res){
    let id = req.params.id
    connection.query('delete from curso where id =' + id,function(error, resultado){
        res.redirect('/curso')
    })
})
app.listen(3000)
console.log("Servidor subiu") 


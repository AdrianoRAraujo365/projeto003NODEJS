let express = require('express')
let app = express()

app.get('/curso', function(req,res){
    let mysql = require('mysql2')
    let connection = mysql.createConnection({
        host: 'localhost',
        user:'root',
        password: 'senac',
        database:'qikbyte',
        port:3307

    })
    connection.query('select descricao from curso;',function(error, resultado){
        res.send(resultado)
    })
});

app.listen(3001)
console.log("Servidor subiu")

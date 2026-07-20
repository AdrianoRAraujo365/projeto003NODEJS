const express = require('express');
const app = express();

// Middleware essencial para analisar requisições com corpo no formato EJS
app.set('view engine', 'ejs');


app.get('/cursos', function (req, res) {

    var mysql = require('mysql2');
    //Credenciais para acessar o banco de dados MySQL
    var connection = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "senac",
        database: "qikbyte",
        port:3307
    });
    //comando SQL que vai devolver todos os campos da tabela curso
    connection.query("SELECT descricao FROM curso;", function (error, result) {
        res.render('./cursos1', {dados: result});
    });
});

app.post('/livros', async (req, res) => {
    try {
        const { titulo, autor, ano_publicacao, disponivel = true } = req.body;
        const sql = 'INSERT INTO livros (titulo, autor, ano_publicacao, disponivel) VALUES (?, ?, ?, ?)';
        const [resultado] = await db.execute(sql, [titulo, autor, ano_publicacao, disponivel]);
        // Utilização de Query Parametrizada (?) contra ataques de Injeção SQL
        res.status(201).json({
            mensagem: 'Livro cadastrado com sucesso!',
            id: resultado.insertId
        });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao cadastrar livro', detalhes: erro.message });
    }
});

app.get('/livros/disponiveis', async (req, res) => {
    try {
        const sql = 'SELECT * FROM livros WHERE disponivel = true';
        const [livros] = await db.execute(sql);
        res.status(200).json(livros);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar livros', detalhes: erro.message });
    }
});

app.get('/livros', async (req, res) => {
    try {
        const sql = 'SELECT * FROM livros';
        const [livros] = await db.execute(sql);
        res.status(200).json(livros);
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao buscar livros', detalhes: erro.message });
    }
});

app.put('/livros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, ano_publicacao, disponivel } = req.body;

        const sql = 'UPDATE livros SET titulo = ?, autor = ?, ano_publicacao = ?, disponivel = ? WHERE id = ?';
        const [resultado] = await db.execute(sql, [titulo, autor, ano_publicacao, disponivel, id]);
        // Validação caso o ID fornecido não exista no sistema
        if (resultado.affectedRows === 0) {

            return res.status(404).json({ mensagem: 'Livro não encontrado para atualização.' });
        }
        res.status(200).json({ mensagem: 'Livro atualizado com sucesso!' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao atualizar livro', detalhes: erro.message });
    }
});

app.delete('/livros/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const sql = 'DELETE FROM livros WHERE id = ?';
        const [resultado] = await db.execute(sql, [id]);
        if (resultado.affectedRows === 0) {
            return res.status(404).json({ mensagem: 'Livro não encontrado para exclusão.' });
        }
        res.status(200).json({ mensagem: 'Livro deletado com sucesso!' });
    } catch (erro) {
        res.status(500).json({ erro: 'Erro ao deletar livro', detalhes: erro.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando e escutando na porta ${PORT}`)
});


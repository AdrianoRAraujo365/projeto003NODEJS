<!DOCTYPE html>
<html lang="pt-br">
  <head>
    <meta charset="utf-8" />
    <title>QiKbyte - Programação e Banco de Dados</title>
    <!-- <link
      rel="stylesheet"  href="//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css"
    /> -->
    <style>
      table {
        border-collapse: separate;
        border-spacing: 8px;
      }
    </style>
  </head>
  <body class="container">
    <h1 style="text-align: center;">=== Cursos ===</h1>
    <table class="table">
      <tr>
        <th style="width: 200px">DESCRIÇÃO</th>
        <th>CARGA HORÁRIA</th>
      </tr>
      <% for(i=0; i < dados.length; i++){ %>
      <tr>
        <td><%= dados[i].DESCRICAO %></td>
        <td><%= dados[i].CARGA_HORARIA %></td>
        <td>
          <a class="btn btn-success edit" href="/editar/<%=dados[i].ID%>"
            >Edit</a
          >
          <a
            class="btn btn-danger delete"
            onclick="return confirm('Deseja Excluir?')"
            href="/curso/Deletar/<%=dados[i].ID%>"
            >Delete</a
          >
        </td>
      </tr>

      <% } %>
    </table>

    <form action="/cursos/salvar" method="post">
      <input type="text" name="DESCRICAO" />
      <input
        type="hidden"
        name="CARGA_HORARIA"
        value="40"
        readonly="readonly"
      />
      <input type="submit" value="Adicionar" class="btn btn-primary" />
    </form>

    

  </body>

  

</html>

module.exports = {
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'admin',
    password: 'admin',
    database: 'dev-burguer-db',
    define: {
        timestamps: true,
        underscored: true,
        underscoredAll: true,
    },
}

/* 
A pasta database é onde ficam as configurações do banco de dados, como o nome do banco, usuário, senha, host e porta.

-timestamp: é uma configuração que adiciona automaticamente os campos created_at e updated_at nas tabelas do banco de 
dados, para registrar quando um registro foi criado ou atualizado.

-underscored: é uma configuração que define que os nomes das colunas do banco de dados serão escritos com underline, 
em vez de camelCase. Por exemplo, o campo createdAt seria criado como created_at no banco de dados.

-underscoredAll: é uma configuração que define que todas as tabelas do banco de dados terão os nomes das colunas 
escritos com underline, em vez de camelCase. Por exemplo, o campo createdAt seria criado como created_at em todas as 
tabelas do banco de dados.
*/
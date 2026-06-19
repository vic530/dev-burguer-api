import express from 'express';
import fileRoutesConfig from './config/fileRoutes.cjs';
import routes from './routes.js';   


const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/product-file', fileRoutesConfig);
app.use('/category-file', fileRoutesConfig);

app.use(routes);

export default app;

/*
app é o arquivo principal da aplicação, que é responsável por configurar o servidor Express, importar as rotas e 
iniciar a aplicação. Ele importa o Express, as rotas definidas na pasta routes e o arquivo de configuração do 
banco de dados, 
e usa o método use para configurar o middleware do Express e as rotas da aplicação. Ele também exporta a instância 
do Express para que possa ser usada em outras partes da aplicação, como o arquivo server.js, que é responsável por 
iniciar o servidor.
*/

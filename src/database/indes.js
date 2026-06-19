import mongoose from "mongoose";
import { Sequelize } from "sequelize";
import Category from "../app/models/Category.js";
import Product from "../app/models/Product.js";
import User from "../app/models/User.js";
import databaseConfig from "../config/database.cjs";


const models = [User, Product, Category];

class Database {
    constructor() {
        this.init();
        this.mongo();
    }

    init() {
        this.connection = new Sequelize(databaseConfig);
        models.map((model) => model.init(this.connection))
        .map( model => model.associate && model.associate(this.connection.models))
    }

    mongo() {
        this.mongoConnection = mongoose.connect('mongodb://localhost:27017/devburguerdb');
    }
}



export default new Database();


/*
database é onde fica o arquivo de configuração do banco de dados, que é usado para estabelecer a conexão com o 
banco de dados e inicializar os modelos. Ele importa os modelos definidos na pasta models e os inicializa usando 
a conexão estabelecida com o banco de dados.

-index.js é o arquivo principal da pasta database, que é responsável por importar e inicializar os modelos do banco 
de dados, bem como estabelecer a conexão com o banco de dados usando as configurações definidas no arquivo 
database.cjs. Ele exporta uma instância da classe Database, que pode ser usada em outras partes da aplicação 
para acessar a conexão com o banco de dados e os modelos.
*/
import Sequelize, { Model } from "sequelize";

class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password_hash: Sequelize.STRING,
        admin: Sequelize.BOOLEAN,
      },
      {
        sequelize,
        tableName: 'users',
      },
    );   
    
    return this;
  }
}

export default User;

/*
models é onde ficam os arquivos de modelo do banco de dados, que são usados para definir as tabelas e colunas do banco de dados, 
bem como as relações entre elas. Cada arquivo de modelo define uma classe que estende a classe Model do Sequelize, e tem um método 
init que é usado para definir os campos da tabela e suas propriedades.
*/

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        primaryKey: true,
        allowNull: false,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      }, 
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      password_hash: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false
      }

    });
  },

  async down(queryInterface) {
   
    await queryInterface.dropTable('users');
     
  },
};

/*
A pasta migrations é onde ficam os arquivos de migração do banco de dados, que são usados para criar, alterar
 ou excluir tabelas e colunas no banco de dados. Cada arquivo de migração tem um nome que indica a data e hora
  em que foi criado, seguido de uma descrição do que a migração faz.
*/

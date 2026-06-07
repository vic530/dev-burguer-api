import bcrypt from 'bcrypt'; 
import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/User.js';

class UserController {
  async store(req, res) {

    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    })

    try {
      schema.validateSync(req.body, { abortEarly: false, strict: true });

    } catch (err) {
      
      return res.status(400).json({ error: err.message });
    }

   
    
    const { name, email, password, admin } = req.body;
    
    const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'User already exists' });
      }

    const password_hash = await bcrypt.hash(password, 10);

    const user = await User.create({
      id: v4(),
      name,
      email,
      password_hash,
      admin,
    });

   return res.status(201).json({
    id: user.id,
    name: user.name,
    email: user.email,
    admin: user.admin,
   });
  }
}


export default new UserController();

/**
-controller é o arquivo responsável por definir a lógica de negócios relacionada aos usuários. Ele contém métodos que
são usados para criar, listar, exibir, atualizar e excluir usuários. Esses métodos são chamados pelas rotas definidas 
na pasta routes,
 */

/*
-store: é o método responsável por criar um novo usuário no banco de dados. Ele recebe os dados do usuário através do 
corpo da requisição (req.body) e utiliza o modelo User para criar um novo registro no banco de dados. O resultado da 
criação do usuário é retornado como resposta da requisição.
-index: é o método responsável por listar todos os usuários cadastrados no banco de dados. Ele utiliza o modelo 
User para buscar todos os registros de usuários e retorna o resultado como resposta da requisição.
-show: é o método responsável por exibir os detalhes de um usuário específico. Ele recebe o ID do usuário através dos
parâmetros da requisição (req.params) e utiliza o modelo User para buscar o registro correspondente no banco de dados.
 O resultado da busca é retornado como resposta da requisição.  
-update: é o método responsável por atualizar os dados de um usuário específico. Ele recebe o ID do usuário através dos 
parâmetros da requisição (req.params) e os novos dados do usuário através do corpo da requisição (req.body). O método 
utiliza o modelo User para buscar o registro correspondente no banco de dados, atualiza os dados do usuário e retorna 
o resultado como resposta da requisição.
-delete: é o método responsável por excluir um usuário específico do banco de dados. Ele recebe o ID do usuário através 
dos parâmetros da requisição (req.params) e utiliza o modelo User para buscar o registro correspondente no banco de 
dados. O método então exclui o registro do usuário e retorna uma resposta indicando que a exclusão foi bem-sucedida.        
*/

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';
import authConfig from './../../config/auth.js';
import User from '../models/User.js';



class SessionController {
  async store(req, res) {
    const schema = Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
    });

    const emalOrPasswordIsInvalid =  () => {
        return res.status(400).json({ error: 'Email or password is invalid' });
    };

    const isValid = await schema.isValid(req.body, { strict: true });
    if (!isValid) {
      return emalOrPasswordIsInvalid();
    }

    const { email, password } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (!existingUser) {
      return emalOrPasswordIsInvalid();
    }

    const isPassworCorrect = await bcrypt.compare(password, existingUser.password_hash);
    if (!isPassworCorrect) {
      return emalOrPasswordIsInvalid();
    }

    const token = jwt.sign({
      id: existingUser.id, 
      admin: existingUser.admin, 
      name: existingUser.name
      }, 
      authConfig.secret,
      {
        expiresIn: authConfig.expiresIn,
      });

    return res.status(200).json({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        admin: existingUser.admin,
        token,
    });
  }    
}

export default new SessionController();

/*
- session é o arquivo responsável por definir a lógica de negócios relacionada às sessões de autenticação. 
Ele contém métodos que são usados para criar, listar, exibir, atualizar e excluir sessões. Esses métodos são 
chamados pelas rotas definidas na pasta routes, e geralmente envolvem a verificação das credenciais do usuário, 
a geração de tokens de autenticação e a manipulação de cookies ou cabeçalhos de autorização.
*/

import jwt from 'jsonwebtoken';
import authConfig from './../config/auth.js';

const authMiddleware = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if(!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const token = authHeader.split(' ')[1];

    try {
      jwt.verify(token, authConfig.secret, (error, decoded) => {
        if (error) {
            throw Error();
        }

        req.userId = decoded.id;
        req.userIdAdmin = decoded.admin;
      });
     
    } 
    catch (_error) {
        return res.status(401).json({ error: 'Token is invalid' });
    }      

    return next();

}

export default authMiddleware;


/*
-authMiddleware é um middleware de autenticação que é usado para proteger as rotas da aplicação. Ele verifica se o 
token de autenticação está presente no cabeçalho da requisição e se é válido. Se o token estiver ausente ou inválido, 
ele retorna uma resposta de erro com status 401 (Unauthorized). Se o token for válido, ele decodifica o token para 
obter o ID do usuário e o adiciona ao objeto req para que possa ser acessado nas rotas protegidas. Por fim, ele chama 
a função next() para passar o controle para a próxima função de middleware ou rota.
*/
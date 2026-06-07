const multer = require('multer');
const { resolve } = require('node:path');
const { v4 } = require('uuid');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (_req, file, callback) => {
        const uniqueName = v4().concat(`-${file.originalname}`);
        return callback(null, uniqueName);
    },
  }),
};



/*
-multer é um middleware para lidar com uploads de arquivos em aplicações Node.js. Ele é usado para processar 
arquivos enviados em formulários multipart/form-data.

-diskStorage é um método de armazenamento fornecido pelo multer que permite configurar onde os arquivos enviados 
serão armazenados no sistema de arquivos do servidor.
*/
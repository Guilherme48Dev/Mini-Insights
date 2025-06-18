const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    
    const authHeader = req.headers.authorization;

    // Se o token não for enviado, retorna erro de não autorizado
    if (!authHeader) {
        return res.status(401).json({ error: 'Token não fornecido!' });
    }

    // Divide o valor do cabeçalho em duas partes: "Bearer" e o token em si
    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({ error: 'Token mal formatado!' });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded.userId; // Salva o ID do usuário no objeto da requisição 
     
        return next();
    } catch (err) {
        return res.status(401).json({ error: 'Token inválido!' });
    }
};

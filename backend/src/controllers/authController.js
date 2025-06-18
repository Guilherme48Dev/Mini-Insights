const { db } = require('../database/connection');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../services/tokenService');

// Função para registrar um novo usuário
const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Verifica se já existe um usuário com o mesmo e-mail
        const userExists = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email=?', [email], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });

        if (userExists) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        // Criptografa a senha antes de salvar no banco
        const hashedPassword = await hashPassword(password);

        // Salva o novo usuário no banco de dados
        await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO users (name,email,password) VALUES (?,?,?)',
                [name, email, hashedPassword],
                function (err) {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });

        return res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    } catch (error) {
        next(error); 
    }
};

// Função de login
const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Busca o usuário pelo e-mail
        const user = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email = ?', [email], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });

        if (!user) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos!' });
        }

        // Compara a senha informada com a senha criptografada no banco
        const match = await comparePassword(password, user.password);
        if (!match) {
            return res.status(401).json({ message: 'E-mail ou senha inválidos!' });
        }

        // Gera o token JWT com o ID do usuário
        const token = generateToken({ userId: user.id });

        return res.status(200).json({ token });
    } catch (error) {
        next(error);
    }
};

module.exports = { register, login };

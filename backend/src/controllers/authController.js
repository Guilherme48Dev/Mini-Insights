const { db } = require('../database/connection');
const { hashPassword, comparePassword } = require('../utils/hash');
const { generateToken } = require('../services/tokenService');

const register = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        const userExists = await new Promise((resolve, reject) => {
            db.get('SELECT * FROM users WHERE email=?', [email], (err, row) => {
                if (err) return reject(err);
                resolve(row);
            });
        });
        if (userExists) {
            return res.status(400).json({ message: 'E-mail já cadastrado' });
        }

        const hashedPassword = await hashPassword(password);

        await new Promise((resolve, reject) => {
            db.run(
                'INSERT INTO users (name,email,password) VALUES (?,?,?)', [name, email, hashedPassword],
                function (err) {
                    if (err) return reject(err);
                    resolve();
                }
            );
        });
        return res.status(201).json({ message: 'Usúario registrado com sucesso!' });
    } catch (error) {
        next(error);
    }
};

const login = async (req,res,next)=>{
    try{
        const {email, password}= req.body;

        const user = await new Promise((resolve, reject)=>{
            db.get('SELECT * FROM users WHERE email = ?', [email],(err,row)=>{
                if(err) return reject(err);
                resolve(row);
            });
        });

        if(!user){
            return res.status(401).json({message: 'E-mail ou senha inválidos!'});
        }

        const match = await comparePassword(password, user.password);
        if(!match){
            return res.status(401).json({ message : 'E-mail ou senha inválidos!'});
        }

        // Gerando o token
        const token = generateToken({ userId: user.id });

        return res.status(200).json({ token });
    }catch (error){
        next(error);
    }
};

module.exports = { register, login };
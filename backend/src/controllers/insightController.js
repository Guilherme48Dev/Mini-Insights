const { db } = require('../database/connection');

const createInsight = async (req, res, next) => {
    try{
        const { title, content ,tag } = req.body;
        const userId = req.user;

        if (!title || !content) {
            return res.status(400).json({ error: 'O título desse conteúdo é obrigatório!'});
        }

        await new Promise((resolve, reject)=>{
            db.run(
                'INSERT INTO insights (title, content, tag, user_id) VALUES (?, ?, ?, ?)',
                [title, content, tag || null, userId],
                function (err){
                    if(err) return reject(err);
                    resolve();
                }
            );
        });

        return res.status(201).json({ message : 'Insight criado com sucesso!'});
    }catch (error){
        next(error);
    }
};

const listInsights = async (req, res, next) => {
  try {
    const userId = req.user;

    const insights = await new Promise((resolve, reject) => {
      db.all(
        'SELECT id, title, content, tag, created_at FROM insights WHERE user_id = ? ORDER BY created_at DESC',
        [userId],
        (err, rows) => {
          if (err) return reject(err);
          resolve(rows);
        }
      );
    });

    return res.status(200).json({ insights });
  } catch (error) {
    next(error);
  }
};

module.exports = { createInsight, listInsights };
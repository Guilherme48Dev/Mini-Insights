const { db } = require('../database/connection');

// Cria um novo insight
const createInsight = async (req, res, next) => {
  try {
    const { title, content, tags } = req.body;
    const userId = req.user; // ID do usuário logado, vindo do token

    if (!title || !content) {
      return res.status(400).json({ error: 'O título e conteúdo são obrigatórios!' });
    }

    // Converte as tags para um array de strings (caso venham em string separada por vírgulas)
    const tagsArray = Array.isArray(tags)
      ? tags
      : String(tags || '')
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean); // Remove espaços e valores vazios

    const tagsString = JSON.stringify(tagsArray); // Converte array para string JSON

    // Insere insight no banco de dados
    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO insights (title, content, tags, user_id) VALUES (?, ?, ?, ?)',
        [title, content, tagsString, userId],
        function (err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    return res.status(201).json({ message: 'Insight criado com sucesso!' });
  } catch (error) {
    next(error);
  }
};

// Lista todos os insights do usuário com paginação e filtro por tag
const listInsights = async (req, res, next) => {
  try {
    const userId = req.user;
    const { page = 1, limit = 10, tag } = req.query;
    const offset = (page - 1) * limit;

    // Query base
    let query = 'SELECT id, title, content, tags, created_at, updated_at FROM insights WHERE user_id = ?';
    const params = [userId];

    // Aplica filtro por tag, se informado
    if (tag) {
      query += ' AND tags LIKE ?';
      params.push(`%"${tag}"%`);
    }

    // Ordena do mais recente para o mais antigo, com paginação
    query += ' ORDER BY created_at DESC LIMIT ? OFFSET ?';
    params.push(Number(limit), Number(offset));

    // Busca no banco
    const insights = await new Promise((resolve, reject) => {
      db.all(query, params, (err, rows) => {
        if (err) return reject(err);
        // Converte tags de string para array
        rows.forEach(row => {
          row.tags = JSON.parse(row.tags || '[]');
        });
        resolve(rows);
      });
    });

    return res.status(200).json({ insights });
  } catch (error) {
    next(error);
  }
};

// Retorna um insight específico do usuário logado
const getInsightById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    const insight = await new Promise((resolve, reject) => {
      db.get(
        'SELECT id, title, content, tags, created_at, updated_at FROM insights WHERE id = ? AND user_id = ?',
        [id, userId],
        (err, row) => {
          if (err) return reject(err);
          resolve(row);
        }
      );
    });

    if (!insight) {
      return res.status(404).json({ error: 'Insight não encontrado!' });
    }

    insight.tags = JSON.parse(insight.tags || '[]');

    return res.status(200).json({ insight });
  } catch (error) {
    next(error);
  }
};

// Atualiza um insight existente
const updateInsight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { title, content, tags } = req.body;
    const userId = req.user;

    if (!title || !content) {
      return res.status(400).json({ error: 'Título e conteúdo são obrigatórios!' });
    }

    const tagsArray = Array.isArray(tags)
      ? tags
      : String(tags || '')
          .split(',')
          .map(tag => tag.trim())
          .filter(Boolean);

    const tagsString = JSON.stringify(tagsArray);

    await new Promise((resolve, reject) => {
      db.run(
        'UPDATE insights SET title = ?, content = ?, tags = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ? AND user_id = ?',
        [title, content, tagsString, id, userId],
        function (err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    return res.status(200).json({ message: 'Insight atualizado com sucesso!' });
  } catch (error) {
    next(error);
  }
};

// Deleta um insight
const deleteInsight = async (req, res, next) => {
  try {
    const { id } = req.params;
    const userId = req.user;

    await new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM insights WHERE id = ? AND user_id = ?',
        [id, userId],
        function (err) {
          if (err) return reject(err);
          resolve();
        }
      );
    });

    return res.status(200).json({ message: 'Insight deletado com sucesso!' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createInsight,
  listInsights,
  getInsightById,
  updateInsight,
  deleteInsight
};

const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { createInsight, listInsights } = require('../controllers/insightController');

// Protege todas as rotas abaixo
router.use(authMiddleware);

// Rotas do CRUD de insight
router.post('/', createInsight);
router.get('/', listInsights); 

// users
router.get('/', (req, res) => {
  res.json({ message: `Usuário autenticado com ID ${req.user}` });
});

module.exports = router;

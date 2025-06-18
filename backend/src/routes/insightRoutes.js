const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const { createInsight } = require ('../controllers/insightController');

// Protege todas as rotas abaixo
router.use(authMiddleware);

router.post('/', createInsight);

// users
router.get('/', (req, res) => {
  res.json({ message: `Usuário autenticado com ID ${req.user}` });
});

module.exports = router;

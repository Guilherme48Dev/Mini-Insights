const express = require('express');
const authMiddleware = require('../middlewares/authMiddleware');
const router = express.Router();
const {
  createInsight,
  listInsights,
  updateInsight,
  deleteInsight,
  getInsightById
} = require('../controllers/insightController');

// Protege todas as rotas abaixo
router.use(authMiddleware);

router.post('/', createInsight);
router.get('/', listInsights); 
router.put('/:id', updateInsight);
router.delete('/:id', deleteInsight);
router.get('/:id', getInsightById);


// // users
// router.get('/', (req, res) => {
//   res.json({ message: `Usuário autenticado com ID ${req.user}` });
// });

module.exports = router;

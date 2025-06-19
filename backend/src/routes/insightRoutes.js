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

// Protege todas as rotas
router.use(authMiddleware);

router.get('/', listInsights);
router.post('/', createInsight);
router.get('/:id', getInsightById);
router.put('/:id', updateInsight);
router.delete('/:id', deleteInsight);

module.exports = router;

const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/goals:
 *   get:
 *     summary: Hedefleri getir
 *     tags: [Goals]
 *     responses:
 *       200:
 *         description: Hedefler başarıyla listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hedefler listelenecek
 *   post:
 *     summary: Hedefleri güncelle
 *     tags: [Goals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               calories:
 *                 type: number
 *                 example: 2000
 *               water:
 *                 type: number
 *                 example: 2000
 *     responses:
 *       200:
 *         description: Hedef başarıyla güncellendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Hedef güncellendi
 */
router.get('/goals', async (req, res) => {
  // Burada hedefleri DB'den çekme işlemi olacak
  res.json({ message: 'Hedefler listelenecek' });
});

// /api/goals POST - Hedefleri güncelle
router.post('/goals', async (req, res) => {
  // Burada hedef güncelleme işlemi olacak
  res.json({ message: 'Hedef güncellendi' });
});

module.exports = router; 
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/meals:
 *   get:
 *     summary: Öğünleri getir
 *     tags: [Meals]
 *     responses:
 *       200:
 *         description: Öğünler başarıyla listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Öğünler listelenecek
 *   post:
 *     summary: Öğün ekle
 *     tags: [Meals]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Kahvaltı
 *               calories:
 *                 type: number
 *                 example: 350
 *     responses:
 *       201:
 *         description: Öğün başarıyla eklendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Öğün eklendi
 *
 * /api/meals/{mealId}:
 *   delete:
 *     summary: Öğün sil
 *     tags: [Meals]
 *     parameters:
 *       - in: path
 *         name: mealId
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek öğünün ID'si
 *     responses:
 *       200:
 *         description: Öğün başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Öğün silindi
 */
router.get('/meals', async (req, res) => {
  // Burada öğünleri DB'den çekme işlemi olacak
  res.json({ message: 'Öğünler listelenecek' });
});

// /api/meals POST - Öğün ekle
router.post('/meals', async (req, res) => {
  // Burada yeni öğün ekleme işlemi olacak
  res.status(201).json({ message: 'Öğün eklendi' });
});

// /api/meals/:mealId DELETE - Öğün sil
router.delete('/meals/:mealId', async (req, res) => {
  // Burada öğün silme işlemi olacak
  res.json({ message: 'Öğün silindi' });
});

module.exports = router; 
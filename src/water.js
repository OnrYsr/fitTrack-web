const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/water:
 *   get:
 *     summary: Su kayıtlarını getir
 *     tags: [Water]
 *     responses:
 *       200:
 *         description: Su kayıtları başarıyla listelendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Su kayıtları listelenecek
 *   post:
 *     summary: Su ekle
 *     tags: [Water]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               amount:
 *                 type: number
 *                 example: 250
 *     responses:
 *       201:
 *         description: Su kaydı başarıyla eklendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Su kaydı eklendi
 *
 * /api/water/{waterId}:
 *   delete:
 *     summary: Su kaydını sil
 *     tags: [Water]
 *     parameters:
 *       - in: path
 *         name: waterId
 *         required: true
 *         schema:
 *           type: string
 *         description: Silinecek su kaydının ID'si
 *     responses:
 *       200:
 *         description: Su kaydı başarıyla silindi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Su kaydı silindi
 */
router.get('/water', async (req, res) => {
  // Burada su kayıtlarını DB'den çekme işlemi olacak
  res.json({ message: 'Su kayıtları listelenecek' });
});

// /api/water POST - Su ekle
router.post('/water', async (req, res) => {
  // Burada yeni su kaydı ekleme işlemi olacak
  res.status(201).json({ message: 'Su kaydı eklendi' });
});

// /api/water/:waterId DELETE - Su kaydını sil
router.delete('/water/:waterId', async (req, res) => {
  // Burada su kaydı silme işlemi olacak
  res.json({ message: 'Su kaydı silindi' });
});

module.exports = router; 
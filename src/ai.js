const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/ai/analyze-meal:
 *   post:
 *     summary: AI ile öğün analizi
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               meal:
 *                 type: string
 *                 example: "2 yumurta, 1 dilim ekmek, 1 domates"
 *     responses:
 *       200:
 *         description: AI ile öğün analizi yapıldı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: AI ile öğün analizi yapıldı
 *
 * /api/ai/summary:
 *   post:
 *     summary: AI ile günlük özet/yorum
 *     tags: [AI]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 example: "2024-06-13"
 *     responses:
 *       200:
 *         description: AI ile günlük özet oluşturuldu
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: AI ile günlük özet oluşturuldu
 */
router.post('/analyze-meal', async (req, res) => {
  // Burada AI ile öğün analizi işlemi olacak
  res.json({ message: 'AI ile öğün analizi yapıldı' });
});

// /api/ai/summary POST - AI ile günlük özet/yorum
router.post('/summary', async (req, res) => {
  // Burada AI ile günlük özet işlemi olacak
  res.json({ message: 'AI ile günlük özet oluşturuldu' });
});

module.exports = router; 
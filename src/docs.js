const express = require('express');
const router = express.Router();

// Mock veri (ileride DB'ye taşınacak)
let docs = [
  { id: 1, type: 'help', title: 'Kullanım Kılavuzu', content: 'Uygulama kullanımı hakkında bilgiler...' },
  { id: 2, type: 'faq', title: 'Sıkça Sorulan Sorular', content: 'En çok sorulan sorular ve yanıtları...' },
];

/**
 * @swagger
 * /api/docs:
 *   get:
 *     summary: Get all documents
 *     tags: [Docs]
 *     responses:
 *       200:
 *         description: Documents listed
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doc'
 *   post:
 *     summary: Yeni döküman ekle
 *     tags: [Docs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - type
 *               - title
 *               - content
 *             properties:
 *               type:
 *                 type: string
 *                 example: help
 *               title:
 *                 type: string
 *                 example: Yeni Döküman
 *               content:
 *                 type: string
 *                 example: Döküman içeriği...
 *     responses:
 *       201:
 *         description: Döküman başarıyla eklendi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Döküman eklendi
 *                 doc:
 *                   $ref: '#/components/schemas/Doc'
 *
 * /api/docs/{type}:
 *   get:
 *     summary: Tipine göre dökümanları getir
 *     tags: [Docs]
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Döküman tipi (ör: help, faq)
 *     responses:
 *       200:
 *         description: Filtrelenmiş dökümanlar
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Doc'
 */
router.get('/docs', (req, res) => {
  res.json(docs);
});

router.post('/docs', (req, res) => {
  const { type, title, content } = req.body;
  const newDoc = { id: docs.length + 1, type, title, content };
  docs.push(newDoc);
  res.status(201).json({ message: 'Döküman eklendi', doc: newDoc });
});

router.get('/docs/:type', (req, res) => {
  const { type } = req.params;
  const filtered = docs.filter(doc => doc.type === type);
  res.json(filtered);
});

module.exports = router; 
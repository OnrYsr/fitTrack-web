const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Test endpointi
 *     tags: [Test]
 *     responses:
 *       200:
 *         description: Test başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Test başarılı!
 */
router.get('/test', (req, res) => {
  res.json({ message: 'Test başarılı!' });
});

module.exports = router;
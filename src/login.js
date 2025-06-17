const express = require('express');
const router = express.Router();
const User = require('./models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

/**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Kullanıcı kaydı
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *               - name
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *               name:
 *                 type: string
 *                 example: Test User
 *     responses:
 *       201:
 *         description: Kullanıcı başarıyla kaydedildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: User registered successfully
 *       400:
 *         description: Email already in use
 *       500:
 *         description: Server error
 */
router.post('/register', async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Email already in use' });
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, name });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Kullanıcı girişi ve token alma
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Başarılı giriş ve token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *                 user:
 *                   type: object
 *                   properties:
 *                     email:
 *                       type: string
 *                       example: test@example.com
 *                     name:
 *                       type: string
 *                       example: Test User
 *       400:
 *         description: Invalid credentials
 *       500:
 *         description: Server error
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { email: user.email, name: user.name } });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @swagger
 * /api/logout:
 *   post:
 *     summary: Kullanıcı çıkışı
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Çıkış başarılı
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Çıkış başarılı
 */
router.post('/logout', (req, res) => {
  // JWT token client tarafında silinir, backend'de genellikle işlem yapılmaz
  res.json({ message: 'Çıkış başarılı' });
});

/**
 * @swagger
 * /api/apple-login:
 *   post:
 *     summary: Apple ile giriş (mock)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Apple ile giriş başarılı (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Apple ile giriş başarılı (mock)
 */
router.post('/apple-login', async (req, res) => {
  // Apple ile login için örnek mock akış
  // Gerçek entegrasyon için Apple'dan gelen token doğrulanmalı
  res.json({ message: 'Apple ile giriş başarılı (mock)' });
});

/**
 * @swagger
 * /api/google-login:
 *   post:
 *     summary: Google ile giriş (mock)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Google ile giriş başarılı (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Google ile giriş başarılı (mock)
 */
router.post('/google-login', async (req, res) => {
  // Google ile login için örnek mock akış
  // Gerçek entegrasyon için Google'dan gelen token doğrulanmalı
  res.json({ message: 'Google ile giriş başarılı (mock)' });
});

/**
 * @swagger
 * /api/forgot-password:
 *   post:
 *     summary: Şifremi unuttum (mock)
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: test@example.com
 *     responses:
 *       200:
 *         description: Şifre sıfırlama e-postası gönderildi (mock)
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Şifre sıfırlama e-postası gönderildi (mock)
 */
router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  // Burada email'e şifre sıfırlama linki göndermek için işlem yapılır
  // Şimdilik mock response
  res.json({ message: 'Şifre sıfırlama e-postası gönderildi (mock)' });
});

// JWT doğrulama middleware
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token gerekli' });
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: 'Geçersiz token' });
    req.userId = decoded.userId;
    next();
  });
}

/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Kullanıcı profil bilgilerini getir (JWT ile korumalı)
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Kullanıcı profil bilgileri
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 email:
 *                   type: string
 *                   example: test@example.com
 *                 name:
 *                   type: string
 *                   example: Test User
 *       401:
 *         description: Token gerekli
 *       403:
 *         description: Geçersiz token
 */
router.get('/user', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    if (!user) return res.status(404).json({ message: 'Kullanıcı bulunamadı' });
    res.json({ email: user.email, name: user.name });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router; 
require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function updatePassword() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB\'ye bağlandı');

    // Kullanıcıyı bul
    const user = await User.findOne({ email: 'produser@fittrack.com' });
    
    if (!user) {
      console.log('❌ Kullanıcı bulunamadı!');
      return;
    }

    console.log('👤 Kullanıcı bulundu:', user.email);

    // Şifreyi hashle
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash('123456', saltRounds);

    // Şifreyi güncelle
    user.password = hashedPassword;
    await user.save();

    console.log('✅ Şifre başarıyla güncellendi!');
    console.log('📧 Email:', user.email);
    console.log('🔑 Yeni şifre: 123456');

  } catch (error) {
    console.error('❌ Hata:', error.message);
  } finally {
    // Bağlantıyı kapat
    await mongoose.connection.close();
    console.log('MongoDB bağlantısı kapatıldı');
  }
}

// Scripti çalıştır
updatePassword(); 
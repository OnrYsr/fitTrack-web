require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

async function createSampleUser() {
  try {
    // MongoDB'ye bağlan
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB\'ye bağlandı');

    // Örnek kullanıcı bilgileri
    const userData = {
      email: 'onurtest@fittrack.com',
      password: '123456',
      name: 'Onur Test'
    };

    // Şifreyi hashle
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userData.password, saltRounds);

    // Kullanıcıyı oluştur
    const user = new User({
      email: userData.email,
      password: hashedPassword,
      name: userData.name
    });

    // Kullanıcıyı kaydet
    await user.save();
    console.log('✅ onurtest kullanıcısı başarıyla oluşturuldu!');
    console.log('📧 Email:', userData.email);
    console.log('🔑 Şifre:', userData.password);
    console.log('👤 İsim:', userData.name);

  } catch (error) {
    if (error.code === 11000) {
      console.log('⚠️  Bu email zaten mevcut!');
    } else {
      console.error('❌ Hata:', error.message);
    }
  } finally {
    // Bağlantıyı kapat
    await mongoose.connection.close();
    console.log('MongoDB bağlantısı kapatıldı');
  }
}

// Scripti çalıştır
createSampleUser(); 
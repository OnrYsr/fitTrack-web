# FitTrack Backend

FitTrack, kullanıcıların sağlık ve egzersiz verilerini takip edebileceği, modern ve güvenli bir mobil uygulama ile entegre çalışan bir backend API sunar.

---

## Genel Bilgiler

- **Backend Framework:** Node.js (Express.js)
- **Veritabanı:** MongoDB (Mongoose ile)
- **API Dokümantasyonu:** Swagger (OpenAPI)
- **Kimlik Doğrulama:** JWT (JSON Web Token)
- **Geliştirme Ortamı:** Nodemon ile otomatik yeniden başlatma
- **CORS:** Açık (mobil ve web istemciler için)

---

## Klasör ve Kod Yapısı

```
fittrack-backend/
├── src/
│   ├── ai.js           # AI ile ilgili endpointler
│   ├── docs.js         # Uygulama içi döküman endpointleri
│   ├── goals.js        # Hedeflerle ilgili endpointler
│   ├── login.js        # Kayıt, giriş, şifre sıfırlama, sosyal login, profil
│   ├── meals.js        # Öğünlerle ilgili endpointler
│   ├── models/         # Mongoose modelleri (User, Meal, vb.)
│   ├── test.js         # Test endpointi (Swagger testi için)
│   ├── water.js        # Su kayıtları endpointleri
│   └── index.js        # Ana uygulama dosyası (Express app)
├── .env                # Ortam değişkenleri (PORT, MONGODB_URI, JWT_SECRET)
├── package.json
├── README.md
```

---

## Kurulum

1. **Projeyi klonla:**
   ```bash
   git clone <repo-url>
   cd fittrack-backend
   ```

2. **Bağımlılıkları yükle:**
   ```bash
   npm install
   ```

3. **.env dosyasını oluştur:**
   ```
   PORT=3000
   MONGODB_URI=mongodb+srv://onuryasar91:ADhH9XSsgXVutRi1@fittrackapp.b4lu7qh.mongodb.net/fittrackprod?retryWrites=true&w=majority&appName=FitTrackApp
   JWT_SECRET=your-super-secret-jwt-key
   ```

4. **MongoDB'yi başlat:**
   - Localde: `mongod` veya `brew services start mongodb-community`
   - Veya MongoDB Atlas bağlantısı kullanabilirsin.

5. **Sunucuyu başlat:**
   ```bash
   npm run dev
   ```

---

## API Dokümantasyonu (Swagger)

- Tüm endpointleri ve örnek istek/yanıtları görmek için:
  ```
  http://localhost:3000/api-docs
  ```
- Swagger/OpenAPI ile interaktif test ve dokümantasyon.

---

## Temel Endpointler

| Endpoint                | Yöntem | Açıklama                        |
|-------------------------|--------|---------------------------------|
| /api/register           | POST   | Kullanıcı kaydı                 |
| /api/login              | POST   | Giriş ve token                  |
| /api/logout             | POST   | Çıkış                           |
| /api/apple-login        | POST   | Apple ile giriş (mock)          |
| /api/google-login       | POST   | Google ile giriş (mock)         |
| /api/forgot-password    | POST   | Şifremi unuttum (mock)          |
| /api/user               | GET    | Kullanıcı profil bilgileri (JWT)|
| /api/meals              | GET    | Öğünleri getir                  |
| /api/meals              | POST   | Öğün ekle                       |
| /api/meals/{mealId}     | DELETE | Öğün sil                        |
| /api/water              | GET    | Su kayıtlarını getir            |
| /api/water              | POST   | Su ekle                         |
| /api/water/{waterId}    | DELETE | Su kaydını sil                  |
| /api/goals              | GET    | Hedefleri getir                 |
| /api/goals              | POST   | Hedefleri güncelle              |
| /api/ai/analyze-meal    | POST   | AI ile öğün analizi (mock)      |
| /api/ai/summary         | POST   | AI ile günlük özet (mock)       |
| /api/docs               | GET    | Tüm dökümanları getir           |
| /api/docs               | POST   | Yeni döküman ekle               |
| /api/docs/{type}        | GET    | Tipine göre dökümanları getir   |
| /api/test               | GET    | Test endpointi                  |

---

## Veritabanı Yapısı (Örnek)

- **User:** email, password (hash), name
- **Meal:** name, calories, userId, date, vs.
- **Water:** amount, userId, date, vs.
- **Goal:** calories, water, userId, vs.
- **Doc:** id, type, title, content

---

## Akış ve Gereklilikler

- Tüm kullanıcı işlemleri JWT ile güvenli.
- Swagger ile API dokümantasyonu ve test kolaylığı.
- MongoDB ile esnek ve ölçeklenebilir veri saklama.
- Her ana işlev için ayrı dosya (login, meals, water, goals, ai, docs).
- Geliştirme/test için mock endpointler mevcut.

---

## Geliştirme Notları

- Swagger endpointleri için JSDoc açıklamaları dosya başlarında.
- Test için `/api/test` endpointi eklenmiştir.
- Döküman endpointleri (docs.js) ile uygulama içi yardım/SSS gibi içerikler yönetilebilir.
- Kodun tamamı modüler ve genişletilebilir yapıdadır.

---

## Katkı ve Lisans

- Katkıda bulunmak için pull request gönderebilirsin.
- Lisans: MIT 

require('dotenv').config(); 

## Ortam Değişkenleri (.env)

Aşağıdaki satırı .env dosyanıza ekleyin:

```
MONGODB_URI=mongodb+srv://onuryasar91:ADhH9XSsgXVutRi1@fittrackapp.b4lu7qh.mongodb.net/fittrackprod?retryWrites=true&w=majority&appName=FitTrackApp
```

## Örnek Kullanıcı Bilgisi

Script ile eklenen örnek kullanıcı:
- **Email:** produser@fittrack.com
- **Şifre:** 123456

## Login Endpointi

POST `/api/login`

**Body:**
```json
{
  "email": "produser@fittrack.com",
  "password": "123456"
}
```

Başarılı girişte JWT token ve kullanıcı bilgisi döner.

## Ortamlar
- **Prod:** fittrackprod veritabanı (Atlas cluster)
- **Test:** test veritabanı (ayrı connection string ile kullanılabilir)

## Notlar
- Ortam değişkenlerini ve şifreleri kimseyle paylaşmayın.
- Compass ile bağlanmak için aynı connection string kullanılabilir.

---
Diğer kurallar ve mimari için CURSOR_RULES.md dosyasına bakabilirsiniz. 
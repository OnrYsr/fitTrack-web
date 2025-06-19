# FitTrack Backend

FitTrack, kullanıcıların sağlık ve egzersiz verilerini takip edebileceği, modern ve güvenli bir mobil uygulama ile entegre çalışan bir backend API sunar.

---

## Genel Bilgiler

- **Backend Framework:** Node.js (Express.js)
- **Veritabanı:** MongoDB (Mongoose ile)
- **API Dokümantasyonu:** Swagger (OpenAPI) + Detaylı Markdown
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
├── API_DOCUMENTATION.md    # Kapsamlı API dokümantasyonu
└── frontend-api-service.js # Frontend için API servis dosyası
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

## API Dokümantasyonu

### 📖 Kapsamlı API Dokümantasyonu
Detaylı API dokümantasyonu için: **[API_DOCUMENTATION.md](./API_DOCUMENTATION.md)**

### 🔧 Swagger UI
Interaktif API testi için: **http://localhost:3000/api-docs**

### 💻 Frontend API Service
Frontend geliştirme için hazır API servis dosyası: **[frontend-api-service.js](./frontend-api-service.js)**

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

## Hızlı Test

```bash
# Test endpointi
curl http://localhost:3000/api/test

# Kullanıcı kaydı
curl -X POST http://localhost:3000/api/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456","name":"Test User"}'

# Giriş
curl -X POST http://localhost:3000/api/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"123456"}'
```

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

## Frontend Geliştirme

Frontend projenizde kullanmak için:

1. **API Dokümantasyonu:** `API_DOCUMENTATION.md` dosyasını inceleyin
2. **API Service:** `frontend-api-service.js` dosyasını frontend projenize kopyalayın
3. **Base URL:** `http://localhost:3000/api`

---

## Katkı ve Lisans

- Katkıda bulunmak için pull request gönderebilirsin.
- Lisans: MIT 

---

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

# FitTrack Web (Next.js)

## Proje Tanımı

## Kurulum
- Next.js kurulumu
- Gerekli paketler

## Ortam Değişkenleri
- .env.local örneği

## Backend Entegrasyonu
- API adresi ve örnek istek

## Geliştirme
- npm run dev

## Deploy
- Vercel deploy adımları

## Kullanıcı Girişi
- Login endpointi ve örnek body

## Notlar
- Ortak backend, ortam ayrımı, vs. 